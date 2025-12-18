import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Guinea-Bissau phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +245
 * - Format: 7 digits (new format) or 9 digits
 * - Mobile: starts with 5, 6, 7, 9
 * - Landline: starts with 3
 * - Handles international format (+245 prefix) and 00245 prefix
 *
 * @example
 * validateGW("955 12 34") // { isValid: true }
 * validateGW("321 23 45") // { isValid: true }
 * validateGW("+245 955 12 34") // { isValid: true }
 */
export const validateGW: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00245") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("245") && digits.length >= 10) {
    digits = digits.slice(3);
  }

  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "7-9",
        got: digits.length,
      }),
      details: { expected: "7-9", got: digits.length },
    };
  }

  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "7-9",
        got: digits.length,
      }),
      details: { expected: "7-9", got: digits.length },
    };
  }

  if (!/^[3-79]\d{6,8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Guinea-Bissau",
        type: "phone",
      }),
      details: { country: "Guinea-Bissau", type: "phone" },
    };
  }

  return { isValid: true };
};




