import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Cameroon phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +237
 * - Format: 9 digits
 * - Mobile: starts with 6
 * - Landline: starts with 2, 3
 * - Handles international format (+237 prefix) and 00237 prefix
 *
 * @example
 * validateCM("6 71 23 45 67") // { isValid: true }
 * validateCM("2 22 12 34 56") // { isValid: true }
 * validateCM("+237 6 71 23 45 67") // { isValid: true }
 */
export const validateCM: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00237") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("237") && digits.length >= 12) {
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

  if (!/^[236]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2, 3 (landline)", "6 (mobile)"],
        country: "Cameroon",
      }),
      details: {
        validPrefixes: ["2, 3 (landline)", "6 (mobile)"],
        country: "Cameroon",
      },
    };
  }

  return { isValid: true };
};



