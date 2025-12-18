import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Republic of the Congo phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +242
 * - Format: 9 digits
 * - Mobile: starts with 0
 * - Landline: starts with 2
 * - Handles international format (+242 prefix) and 00242 prefix
 *
 * @example
 * validateCG("06 123 45 67") // { isValid: true }
 * validateCG("22 123 45 67") // { isValid: true }
 * validateCG("+242 06 123 45 67") // { isValid: true }
 */
export const validateCG: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00242") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("242") && digits.length >= 12) {
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

  if (!/^[02]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2 (landline)", "0 (mobile)"],
        country: "Republic of the Congo",
      }),
      details: {
        validPrefixes: ["2 (landline)", "0 (mobile)"],
        country: "Republic of the Congo",
      },
    };
  }

  return { isValid: true };
};


