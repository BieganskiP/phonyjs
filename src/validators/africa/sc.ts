import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Seychelles phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +248
 * - Format: 7 digits
 * - Mobile: starts with 2, 5
 * - Landline: starts with 4
 * - Handles international format (+248 prefix) and 00248 prefix
 *
 * @example
 * validateSC("2 512 345") // { isValid: true }
 * validateSC("4 321 234") // { isValid: true }
 * validateSC("+248 2 512 345") // { isValid: true }
 */
export const validateSC: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00248") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("248") && digits.length >= 10) {
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

  if (!/^[245]\d{6}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["4 (landline)", "2, 5 (mobile)"],
        country: "Seychelles",
      }),
      details: {
        validPrefixes: ["4 (landline)", "2, 5 (mobile)"],
        country: "Seychelles",
      },
    };
  }

  return { isValid: true };
};




