import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Botswana phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +267
 * - Format: 8 digits (new) or 7 digits (old)
 * - Mobile: starts with 7
 * - Landline: starts with 3, 4, 5, 6
 * - Handles international format (+267 prefix) and 00267 prefix
 *
 * @example
 * validateBW("71 234 567") // { isValid: true }
 * validateBW("390 1234") // { isValid: true }
 * validateBW("+267 71 234 567") // { isValid: true }
 */
export const validateBW: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00267") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("267") && digits.length >= 10) {
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

  if (!/^[3-7]\d{6,7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["3-6 (landline)", "7 (mobile)"],
        country: "Botswana",
      }),
      details: {
        validPrefixes: ["3-6 (landline)", "7 (mobile)"],
        country: "Botswana",
      },
    };
  }

  return { isValid: true };
};




