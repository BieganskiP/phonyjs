import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Benin phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +229
 * - Format: 8 digits
 * - Mobile: starts with 9, 6, 5
 * - Landline: starts with 2
 * - Handles international format (+229 prefix) and 00229 prefix
 *
 * @example
 * validateBJ("97 12 34 56") // { isValid: true }
 * validateBJ("21 12 34 56") // { isValid: true }
 * validateBJ("+229 97 12 34 56") // { isValid: true }
 */
export const validateBJ: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00229") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("229") && digits.length >= 11) {
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

  if (!/^[2569]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2 (landline)", "5, 6, 9 (mobile)"],
        country: "Benin",
      }),
      details: {
        validPrefixes: ["2 (landline)", "5, 6, 9 (mobile)"],
        country: "Benin",
      },
    };
  }

  return { isValid: true };
};




