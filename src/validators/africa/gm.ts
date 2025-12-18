import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Gambia phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +220
 * - Format: 7 digits
 * - Mobile: starts with 3, 6, 7, 9
 * - Landline: starts with 4
 * - Handles international format (+220 prefix) and 00220 prefix
 *
 * @example
 * validateGM("991 23 45") // { isValid: true }
 * validateGM("421 23 45") // { isValid: true }
 * validateGM("+220 991 23 45") // { isValid: true }
 */
export const validateGM: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00220") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("220") && digits.length >= 10) {
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

  if (!/^[34679]\d{6}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["4 (landline)", "3, 6, 7, 9 (mobile)"],
        country: "Gambia",
      }),
      details: {
        validPrefixes: ["4 (landline)", "3, 6, 7, 9 (mobile)"],
        country: "Gambia",
      },
    };
  }

  return { isValid: true };
};




