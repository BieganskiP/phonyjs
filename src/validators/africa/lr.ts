import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Liberia phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +231
 * - Format: 7-9 digits
 * - Mobile: starts with 4, 5, 6, 7, 8
 * - Landline: starts with 2
 * - Handles international format (+231 prefix) and 00231 prefix
 *
 * @example
 * validateLR("77 123 456") // { isValid: true }
 * validateLR("221 234 5") // { isValid: true }
 * validateLR("+231 77 123 456") // { isValid: true }
 */
export const validateLR: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00231") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("231") && digits.length >= 10) {
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

  if (!/^[2-8]\d{6,8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Liberia",
        type: "phone",
      }),
      details: { country: "Liberia", type: "phone" },
    };
  }

  return { isValid: true };
};


