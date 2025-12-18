import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Marshall Islands phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +692
 * - Format: 7 digits
 * - Mobile/Landline: starts with 2-6
 * - Handles international format (+692 prefix) and 00692 prefix
 *
 * @example
 * validateMH("247 1234") // { isValid: true }
 * validateMH("625 5678") // { isValid: true }
 * validateMH("+692 247 1234") // { isValid: true }
 */
export const validateMH: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00692") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("692") && digits.length >= 10) {
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

  if (!/^[2-6]\d{6}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2-6"],
        country: "Marshall Islands",
      }),
      details: {
        validPrefixes: ["2-6"],
        country: "Marshall Islands",
      },
    };
  }

  return { isValid: true };
};




