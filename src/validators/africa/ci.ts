import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Ivory Coast (Côte d'Ivoire) phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +225
 * - Format: 10 digits
 * - Mobile: starts with 01, 05, 07
 * - Landline: starts with 2
 * - Handles international format (+225 prefix) and 00225 prefix
 *
 * @example
 * validateCI("01 23 45 67 89") // { isValid: true }
 * validateCI("27 12 34 56") // { isValid: true }
 * validateCI("+225 01 23 45 67 89") // { isValid: true }
 */
export const validateCI: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00225") && digits.length >= 15) {
    digits = digits.slice(5);
  } else if (digits.startsWith("225") && digits.length >= 13) {
    digits = digits.slice(3);
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

  if (!/^[012][0-9]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Ivory Coast",
        type: "phone",
      }),
      details: { country: "Ivory Coast", type: "phone" },
    };
  }

  return { isValid: true };
};




