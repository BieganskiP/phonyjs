import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Burkina Faso phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +226
 * - Format: 8 digits
 * - Mobile: starts with 5, 6, 7
 * - Landline: starts with 2, 4, 5
 * - Handles international format (+226 prefix) and 00226 prefix
 *
 * @example
 * validateBF("70 12 34 56") // { isValid: true }
 * validateBF("25 12 34 56") // { isValid: true }
 * validateBF("+226 70 12 34 56") // { isValid: true }
 */
export const validateBF: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00226") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("226") && digits.length >= 11) {
    digits = digits.slice(3);
  }

  if (digits.length < 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 8,
        got: digits.length,
      }),
      details: { expected: 8, got: digits.length },
    };
  }

  if (digits.length > 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 8,
        got: digits.length,
      }),
      details: { expected: 8, got: digits.length },
    };
  }

  if (!/^[2-7]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Burkina Faso",
        type: "phone",
      }),
      details: { country: "Burkina Faso", type: "phone" },
    };
  }

  return { isValid: true };
};


