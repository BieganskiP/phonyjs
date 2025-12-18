import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Cape Verde phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +238
 * - Format: 7 digits
 * - Mobile: starts with 5, 9
 * - Landline: starts with 2
 * - Handles international format (+238 prefix) and 00238 prefix
 *
 * @example
 * validateCV("991 23 45") // { isValid: true }
 * validateCV("221 23 45") // { isValid: true }
 * validateCV("+238 991 23 45") // { isValid: true }
 */
export const validateCV: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00238") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("238") && digits.length >= 10) {
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

  if (!/^[259]\d{6}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2 (landline)", "5, 9 (mobile)"],
        country: "Cape Verde",
      }),
      details: {
        validPrefixes: ["2 (landline)", "5, 9 (mobile)"],
        country: "Cape Verde",
      },
    };
  }

  return { isValid: true };
};




