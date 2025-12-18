import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Guinea phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +224
 * - Format: 9 digits
 * - Mobile: starts with 6
 * - Landline: starts with 3
 * - Handles international format (+224 prefix) and 00224 prefix
 *
 * @example
 * validateGN("621 12 34 56") // { isValid: true }
 * validateGN("302 12 34 56") // { isValid: true }
 * validateGN("+224 621 12 34 56") // { isValid: true }
 */
export const validateGN: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00224") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("224") && digits.length >= 12) {
    digits = digits.slice(3);
  }

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

  if (!/^[36]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["3 (landline)", "6 (mobile)"],
        country: "Guinea",
      }),
      details: {
        validPrefixes: ["3 (landline)", "6 (mobile)"],
        country: "Guinea",
      },
    };
  }

  return { isValid: true };
};



