import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Micronesia phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +691
 * - Format: 7 digits
 * - Mobile/Landline: starts with 3-9
 * - Handles international format (+691 prefix) and 00691 prefix
 *
 * Different states have different prefixes:
 * - Chuuk: 330
 * - Pohnpei: 320
 * - Yap: 350
 * - Kosrae: 370
 *
 * @example
 * validateFM("320 1234") // { isValid: true }
 * validateFM("970 5678") // { isValid: true }
 * validateFM("+691 320 1234") // { isValid: true }
 */
export const validateFM: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00691") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("691") && digits.length >= 10) {
    digits = digits.slice(3);
  }

  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 7,
        got: digits.length,
      }),
      details: { expected: 7, got: digits.length },
    };
  }

  if (digits.length > 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 7,
        got: digits.length,
      }),
      details: { expected: 7, got: digits.length },
    };
  }

  if (!/^[3-9]\d{6}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["3-9"],
        country: "Micronesia",
      }),
      details: {
        validPrefixes: ["3-9"],
        country: "Micronesia",
      },
    };
  }

  return { isValid: true };
};


