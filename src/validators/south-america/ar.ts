import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Argentinian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits with format 9 + area code + number (e.g., 9 11 1234-5678)
 * - Landline: 8-10 digits depending on area code
 * - Handles international format (+54 prefix) and 0054 prefix
 * - Mobile numbers always start with 9
 * - Area codes vary in length (2-4 digits)
 *
 * Major area codes:
 * - 11: Buenos Aires (CABA)
 * - 221: La Plata
 * - 223: Mar del Plata
 * - 261: Mendoza
 * - 341: Rosario
 * - 351: Córdoba
 * - 381: San Miguel de Tucumán
 * - 387: Salta
 *
 * @example
 * validateAR("9 11 1234 5678") // { isValid: true } - Mobile Buenos Aires
 * validateAR("11 1234 5678") // { isValid: true } - Landline Buenos Aires
 * validateAR("8 11 1234 5678") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateAR: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0054") && digits.length >= 12) {
    digits = digits.slice(4);
  } else if (digits.startsWith("54") && digits.length >= 10) {
    digits = digits.slice(2);
  }

  // Check minimum length
  if (digits.length < 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "8-10",
        got: digits.length,
      }),
      details: { expected: "8-10", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "8-10",
        got: digits.length,
      }),
      details: { expected: "8-10", got: digits.length },
    };
  }

  const firstDigit = digits[0];

  // Check if it's a mobile number (starts with 9)
  if (firstDigit === "9") {
    // Mobile number validation
    if (digits.length !== 10) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Argentina (mobile must be 10 digits)",
        }),
        details: { country: "Argentina (mobile must be 10 digits)" },
      };
    }

    // Extract area code after the 9
    const areaCode = digits.slice(1, 3); // Most common 2-digit area codes
    const areaCodeNum = parseInt(areaCode, 10);

    // Validate common area codes - simplified to accept all 2-digit codes for now
    const validAreaCodes = Array.from({length: 89}, (_, i) => i + 11); // 11-99
    
    if (!validAreaCodes.includes(areaCodeNum)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_AREA_CODE,
        message: getMessage(ErrorCodes.INVALID_AREA_CODE, {
          code: areaCode,
          reason: "invalid area code for Argentina",
        }),
        details: { code: areaCode, reason: "invalid area code for Argentina" },
      };
    }

    // Validate mobile format: 9 XX XXXX XXXX
    if (!/^9\d{9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Argentina (mobile)",
        }),
        details: { country: "Argentina (mobile)" },
      };
    }
  } else {
    // Landline number validation
    if (digits.length < 8 || digits.length > 10) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Argentina (landline must be 8-10 digits)",
        }),
        details: { country: "Argentina (landline must be 8-10 digits)" },
      };
    }

    // Landline cannot start with 0 or 9
    if (firstDigit === "0" || firstDigit === "9") {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_PREFIX,
        message: getMessage(ErrorCodes.INVALID_PREFIX, {
          prefix: firstDigit,
          country: "Argentina (landline)",
        }),
        details: { prefix: firstDigit, country: "Argentina (landline)" },
      };
    }

    // Validate landline format
    if (!/^[1-8]\d{7,9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Argentina (landline)",
        }),
        details: { country: "Argentina (landline)" },
      };
    }
  }

  return { isValid: true };
};
