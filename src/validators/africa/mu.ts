import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Mauritius phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +230
 * - Format: 8 digits (new) or 7 digits (old)
 * - Mobile: starts with 5
 * - Landline: starts with 2, 4, 6
 * - Handles international format (+230 prefix) and 00230 prefix
 *
 * @example
 * validateMU("5 123 4567") // { isValid: true }
 * validateMU("2 123 456") // { isValid: true }
 * validateMU("+230 5 123 4567") // { isValid: true }
 */
export const validateMU: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00230") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("230") && digits.length >= 10) {
    digits = digits.slice(3);
  }

  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "7-8",
        got: digits.length,
      }),
      details: { expected: "7-8", got: digits.length },
    };
  }

  if (digits.length > 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "7-8",
        got: digits.length,
      }),
      details: { expected: "7-8", got: digits.length },
    };
  }

  if (!/^[2456]\d{6,7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2, 4, 6 (landline)", "5 (mobile)"],
        country: "Mauritius",
      }),
      details: {
        validPrefixes: ["2, 4, 6 (landline)", "5 (mobile)"],
        country: "Mauritius",
      },
    };
  }

  return { isValid: true };
};

