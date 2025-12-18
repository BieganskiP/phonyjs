import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates São Tomé and Príncipe phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +239
 * - Format: 7 digits
 * - Mobile: starts with 9, 8
 * - Landline: starts with 2
 * - Handles international format (+239 prefix) and 00239 prefix
 *
 * @example
 * validateST("991 23 45") // { isValid: true }
 * validateST("222 34 56") // { isValid: true }
 * validateST("+239 991 23 45") // { isValid: true }
 */
export const validateST: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00239") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("239") && digits.length >= 10) {
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

  if (!/^[289]\d{6}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2 (landline)", "8, 9 (mobile)"],
        country: "São Tomé and Príncipe",
      }),
      details: {
        validPrefixes: ["2 (landline)", "8, 9 (mobile)"],
        country: "São Tomé and Príncipe",
      },
    };
  }

  return { isValid: true };
};




