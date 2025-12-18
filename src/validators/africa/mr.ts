import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Mauritania phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +222
 * - Format: 8 digits
 * - Mobile: starts with 2, 3, 4
 * - Landline: starts with 4, 5
 * - Handles international format (+222 prefix) and 00222 prefix
 *
 * @example
 * validateMR("22 12 34 56") // { isValid: true }
 * validateMR("45 12 34 56") // { isValid: true }
 * validateMR("+222 22 12 34 56") // { isValid: true }
 */
export const validateMR: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00222") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("222") && digits.length >= 11) {
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

  if (!/^[2-5]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Mauritania",
        type: "phone",
      }),
      details: { country: "Mauritania", type: "phone" },
    };
  }

  return { isValid: true };
};


