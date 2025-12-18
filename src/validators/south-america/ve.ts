import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Venezuelan phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 4 (e.g., 414 123 4567)
 * - Landline: 10 digits with area codes (e.g., 212 123 4567 for Caracas)
 * - Handles international format (+58 prefix) and 0058 prefix
 * - Mobile numbers always start with 4
 * - Landline area codes vary by region
 *
 * Major area codes:
 * - 212: Caracas
 * - 241: Valencia
 * - 261: Maracaibo
 * - 281: Barcelona/Puerto La Cruz
 * - 295: Barquisimeto
 *
 * Mobile prefixes: 414, 424, 416, 426
 *
 * @example
 * validateVE("414 123 4567") // { isValid: true } - Mobile
 * validateVE("212 123 4567") // { isValid: true } - Landline Caracas
 * validateVE("314 123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateVE: PhoneValidator = (phone: string): ValidationResult => {
  // Check for invalid characters first
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  // Handle international formats
  if (digits.startsWith("0058") && digits.length >= 14) {
    digits = digits.slice(4);
  } else if (digits.startsWith("58") && digits.length >= 12) {
    digits = digits.slice(2);
  }

  // Check length - Venezuelan numbers are 10 digits
  if (digits.length < 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  const firstDigit = digits[0];
  const areaCode = digits.slice(0, 3);

  // Check if it's a mobile number (starts with 4)
  if (firstDigit === "4") {
    // Mobile number validation
    const validMobilePrefixes = ["414", "424", "416", "426"];
    
    if (!validMobilePrefixes.includes(areaCode)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_PREFIX,
        message: getMessage(ErrorCodes.INVALID_PREFIX, {
          prefix: areaCode,
          country: "Venezuela (mobile prefix must be 414, 424, 416, or 426)",
        }),
        details: { prefix: areaCode, country: "Venezuela (mobile prefix must be 414, 424, 416, or 426)" },
      };
    }

    // Validate mobile format: 4XX XXX XXXX
    if (!/^4[12][46]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Venezuela (mobile)",
        }),
        details: { country: "Venezuela (mobile)" },
      };
    }
  } else {
    // Landline number validation
    const validLandlineAreaCodes = ["212", "241", "261", "281", "295"];
    
    if (!validLandlineAreaCodes.includes(areaCode)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_AREA_CODE,
        message: getMessage(ErrorCodes.INVALID_AREA_CODE, {
          code: areaCode,
          reason: "invalid area code for Venezuela",
        }),
        details: { code: areaCode, reason: "invalid area code for Venezuela" },
      };
    }

    // Validate landline format: XXX XXX XXXX
    if (!/^[2-3]\d{9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Venezuela (landline)",
        }),
        details: { country: "Venezuela (landline)" },
      };
    }
  }

  return { isValid: true };
};


