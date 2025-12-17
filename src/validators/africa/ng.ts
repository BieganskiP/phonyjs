import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Nigeria phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +234
 * - Mobile: 10 digits starting with 70X, 80X, 81X, 90X, 91X
 * - Landline: 10 digits starting with area codes (1-Lagos, 2-Ibadan, etc.)
 * - Handles international format (+234 prefix) and 00234 prefix
 *
 * @example
 * validateNG("803 123 4567") // { isValid: true }
 * validateNG("1 234 5678") // { isValid: true } - Lagos
 * validateNG("+234 803 123 4567") // { isValid: true }
 */
export const validateNG: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00234") && digits.length >= 15) {
    digits = digits.slice(5);
  } else if (digits.startsWith("234") && digits.length >= 13) {
    digits = digits.slice(3);
  }

  // Remove leading 0 if present
  if (digits.startsWith("0") && digits.length === 11) {
    digits = digits.slice(1);
  }

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

  // Mobile: starts with 70, 80, 81, 90, 91
  if (/^[789]/.test(digits)) {
    if (!/^[789][01]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Nigeria",
          type: "mobile",
        }),
        details: { country: "Nigeria", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with 1-5
  if (/^[1-5]/.test(digits)) {
    if (!/^[1-5]\d{9}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Nigeria",
          type: "landline",
        }),
        details: { country: "Nigeria", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["70, 80, 81, 90, 91 (mobile)", "1-5 (landline)"],
      country: "Nigeria",
    }),
    details: {
      validPrefixes: ["70, 80, 81, 90, 91 (mobile)", "1-5 (landline)"],
      country: "Nigeria",
    },
  };
};

