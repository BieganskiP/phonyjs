import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Mozambique phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +258
 * - Format: 9 digits
 * - Mobile: starts with 8
 * - Landline: starts with 2
 * - Handles international format (+258 prefix) and 00258 prefix
 *
 * @example
 * validateMZ("84 123 4567") // { isValid: true }
 * validateMZ("21 123 456") // { isValid: true }
 * validateMZ("+258 84 123 4567") // { isValid: true }
 */
export const validateMZ: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00258") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("258") && digits.length >= 12) {
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

  if (!/^[28]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2 (landline)", "8 (mobile)"],
        country: "Mozambique",
      }),
      details: {
        validPrefixes: ["2 (landline)", "8 (mobile)"],
        country: "Mozambique",
      },
    };
  }

  return { isValid: true };
};

