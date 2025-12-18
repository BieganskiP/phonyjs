import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Somalia phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +252
 * - Format: 7-9 digits
 * - Mobile: starts with 6, 7, 9
 * - Landline: starts with 1-5
 * - Handles international format (+252 prefix) and 00252 prefix
 *
 * @example
 * validateSO("61 234 567") // { isValid: true }
 * validateSO("1 123 456") // { isValid: true }
 * validateSO("+252 61 234 567") // { isValid: true }
 */
export const validateSO: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00252") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("252") && digits.length >= 10) {
    digits = digits.slice(3);
  }

  // Remove leading 0 if present
  if (digits.startsWith("0")) {
    digits = digits.slice(1);
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

  if (!/^[1-9]\d{6,8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Somalia",
        type: "phone",
      }),
      details: { country: "Somalia", type: "phone" },
    };
  }

  return { isValid: true };
};


