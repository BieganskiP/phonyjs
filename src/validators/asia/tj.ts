import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Tajikistan phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +992
 * - Mobile: 9 digits starting with 9 (e.g., 90, 91, 92, 93, 95, 98)
 * - Landline: 9 digits with area codes (e.g., 37-Dushanbe, 34-Khujand)
 * - Handles international format (+992 prefix) and 00992 prefix
 *
 * Mobile prefixes: 90, 91, 92, 93, 95, 98
 * Major area codes:
 * - 37: Dushanbe
 * - 34: Khujand
 * - 35: Kulob
 * - 32: Khorugh
 *
 * @example
 * validateTJ("90 123 45 67") // { isValid: true }
 * validateTJ("37 222 33 44") // { isValid: true } - Dushanbe
 * validateTJ("+992 90 123 45 67") // { isValid: true }
 */
export const validateTJ: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00992") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("992") && digits.length >= 12) {
    digits = digits.slice(3);
  }

  // Check length
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 9,
        got: digits.length,
      }),
      details: { expected: 9, got: digits.length },
    };
  }

  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 9,
        got: digits.length,
      }),
      details: { expected: 9, got: digits.length },
    };
  }

  // Mobile: starts with 9 (90, 91, 92, 93, 95, 98)
  if (digits.startsWith("9")) {
    if (!/^9[012358]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Tajikistan",
          type: "mobile",
        }),
        details: { country: "Tajikistan", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with 3-8 (area codes)
  if (/^[3-8]/.test(digits)) {
    if (!/^[3-8]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Tajikistan",
          type: "landline",
        }),
        details: { country: "Tajikistan", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["90-93, 95, 98 (mobile)", "3-8 (landline)"],
      country: "Tajikistan",
    }),
    details: {
      validPrefixes: ["90-93, 95, 98 (mobile)", "3-8 (landline)"],
      country: "Tajikistan",
    },
  };
};

