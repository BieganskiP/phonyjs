import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Libyan phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +218
 * - Mobile: 10 digits starting with 9 (e.g., 91, 92, 94)
 * - Landline: 9 digits with area codes (e.g., 21-Tripoli, 61-Benghazi)
 * - Handles international format (+218 prefix) and 00218 prefix
 *
 * Mobile prefixes: 91, 92, 94, 95
 * Major area codes:
 * - 21: Tripoli
 * - 61: Benghazi
 * - 51: Misrata
 *
 * @example
 * validateLY("91 234 5678") // { isValid: true }
 * validateLY("21 123 4567") // { isValid: true } - Tripoli
 * validateLY("+218 91 234 5678") // { isValid: true }
 */
export const validateLY: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00218") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("218") && digits.length >= 12) {
    digits = digits.slice(3);
  }

  // Remove leading 0 if present
  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  // Check length (9-10 digits)
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "9-10",
        got: digits.length,
      }),
      details: { expected: "9-10", got: digits.length },
    };
  }

  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "9-10",
        got: digits.length,
      }),
      details: { expected: "9-10", got: digits.length },
    };
  }

  // Mobile: 10 digits starting with 9
  if (digits.startsWith("9") && digits.length === 10) {
    if (!/^9[1245]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Libya",
          type: "mobile",
        }),
        details: { country: "Libya", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: 9 digits with area codes
  if (digits.length === 9) {
    if (!/^[2-6]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Libya",
          type: "landline",
        }),
        details: { country: "Libya", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["91, 92, 94, 95 (mobile)", "2-6 (landline)"],
      country: "Libya",
    }),
    details: {
      validPrefixes: ["91, 92, 94, 95 (mobile)", "2-6 (landline)"],
      country: "Libya",
    },
  };
};




