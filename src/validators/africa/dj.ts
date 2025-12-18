import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Djibouti phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +253
 * - Format: 8 digits
 * - Mobile: starts with 77
 * - Landline: starts with 21
 * - Handles international format (+253 prefix) and 00253 prefix
 *
 * @example
 * validateDJ("77 12 34 56") // { isValid: true }
 * validateDJ("21 12 34 56") // { isValid: true }
 * validateDJ("+253 77 12 34 56") // { isValid: true }
 */
export const validateDJ: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00253") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("253") && digits.length >= 11) {
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

  if (!/^[27]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["21 (landline)", "77 (mobile)"],
        country: "Djibouti",
      }),
      details: {
        validPrefixes: ["21 (landline)", "77 (mobile)"],
        country: "Djibouti",
      },
    };
  }

  return { isValid: true };
};




