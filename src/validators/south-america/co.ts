import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Colombian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 3 (e.g., 300 123 4567)
 * - Landline: 7-8 digits with area codes (e.g., 1 234 5678 for Bogotá)
 * - Handles international format (+57 prefix) and 0057 prefix
 * - Mobile numbers always start with 3
 * - Landline area codes vary by city
 *
 * Major area codes:
 * - 1: Bogotá
 * - 2: Cali
 * - 4: Medellín
 * - 5: Barranquilla, Cartagena
 * - 6: Manizales, Pereira
 * - 7: Bucaramanga
 * - 8: Villavicencio
 *
 * Mobile prefixes: 300-399
 *
 * @example
 * validateCO("300 123 4567") // { isValid: true } - Mobile
 * validateCO("1 234 5678") // { isValid: true } - Landline Bogotá
 * validateCO("200 123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateCO: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0057") && digits.length >= 11) {
    digits = digits.slice(4);
  } else if (digits.startsWith("57") && digits.length >= 9) {
    digits = digits.slice(2);
  }

  // Check minimum length
  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "7-10",
        got: digits.length,
      }),
      details: { expected: "7-10", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "7-10",
        got: digits.length,
      }),
      details: { expected: "7-10", got: digits.length },
    };
  }

  const firstDigit = digits[0];

  // Check if it's a mobile number (starts with 3)
  if (firstDigit === "3") {
    // Mobile number validation - must be exactly 10 digits
    if (digits.length !== 10) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Colombia (mobile must be 10 digits)",
        }),
        details: { country: "Colombia (mobile must be 10 digits)" },
      };
    }

    // Check mobile prefix (300-399)
    const mobilePrefix = digits.slice(0, 3);
    const mobilePrefixNum = parseInt(mobilePrefix, 10);
    
    if (mobilePrefixNum < 300 || mobilePrefixNum > 399) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_PREFIX,
        message: getMessage(ErrorCodes.INVALID_PREFIX, {
          prefix: mobilePrefix,
          country: "Colombia (mobile prefix must be 300-399)",
        }),
        details: { prefix: mobilePrefix, country: "Colombia (mobile prefix must be 300-399)" },
      };
    }

    // Validate mobile format: 3XX XXX XXXX
    if (!/^3\d{9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Colombia (mobile)",
        }),
        details: { country: "Colombia (mobile)" },
      };
    }
  } else {
    // Landline number validation
    const validAreaCodes = ["1", "2", "4", "5", "6", "7", "8"];
    
    if (!firstDigit || !validAreaCodes.includes(firstDigit)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_AREA_CODE,
        message: getMessage(ErrorCodes.INVALID_AREA_CODE, {
          code: firstDigit || "unknown",
          reason: "invalid area code for Colombia",
        }),
        details: { code: firstDigit || "unknown", reason: "invalid area code for Colombia" },
      };
    }

    // Landline should be 7-8 digits
    if (digits.length < 7 || digits.length > 8) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Colombia (landline must be 7-8 digits)",
        }),
        details: { country: "Colombia (landline must be 7-8 digits)" },
      };
    }

    // Validate landline format
    if (!/^[1-8]\d{6,7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Colombia (landline)",
        }),
        details: { country: "Colombia (landline)" },
      };
    }
  }

  return { isValid: true };
};
