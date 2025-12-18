import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Mali phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +223
 * - Format: 8 digits
 * - Mobile: starts with 6, 7, 9
 * - Landline: starts with 2
 * - Handles international format (+223 prefix) and 00223 prefix
 *
 * @example
 * validateML("70 12 34 56") // { isValid: true }
 * validateML("20 12 34 56") // { isValid: true }
 * validateML("+223 70 12 34 56") // { isValid: true }
 */
export const validateML: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00223") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("223") && digits.length >= 11) {
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

  if (!/^[2679]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2 (landline)", "6, 7, 9 (mobile)"],
        country: "Mali",
      }),
      details: {
        validPrefixes: ["2 (landline)", "6, 7, 9 (mobile)"],
        country: "Mali",
      },
    };
  }

  return { isValid: true };
};



