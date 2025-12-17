import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates North Korea phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +850
 * - Landline: 8 digits (including area code)
 * - Mobile: 10 digits (including 4-digit prefix 0191, 0192, 0195)
 * - Handles international format (+850 prefix) and 00850 prefix
 *
 * Note: Due to limited international connectivity and information,
 * this validator implements basic validation rules.
 *
 * Major area codes:
 * - 2: Pyongyang
 * - 3-9: Other regions
 *
 * Mobile prefixes: 191, 192, 195
 *
 * @example
 * validateKP("2 1234 5678") // { isValid: true } - Pyongyang landline
 * validateKP("191 234 5678") // { isValid: true } - Mobile
 * validateKP("+850 2 1234 5678") // { isValid: true }
 */
export const validateKP: PhoneValidator = (phone: string): ValidationResult => {
  // Check for invalid characters first
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  // Handle international formats
  if (digits.startsWith("00850") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("850") && digits.length >= 11) {
    digits = digits.slice(3);
  }

  // Check length (8 digits for landline, 10 for mobile)
  if (digits.length < 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "8-10",
        got: digits.length,
      }),
      details: { expected: "8-10", got: digits.length },
    };
  }

  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "8-10",
        got: digits.length,
      }),
      details: { expected: "8-10", got: digits.length },
    };
  }

  // Mobile: 10 digits starting with 191, 192, 195
  if (digits.length === 10) {
    if (!/^19[125]\d{7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_PREFIX,
        message: getMessage(ErrorCodes.INVALID_PREFIX, {
          validPrefixes: ["191, 192, 195 (mobile)"],
          country: "North Korea",
        }),
        details: {
          validPrefixes: ["191, 192, 195 (mobile)"],
          country: "North Korea",
        },
      };
    }
    return { isValid: true };
  }

  // Landline: 8-9 digits starting with 2-9
  if (digits.length === 8 || digits.length === 9) {
    if (!/^[2-9]\d{6,8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "North Korea",
          type: "landline",
        }),
        details: { country: "North Korea", type: "landline" },
      };
    }
    return { isValid: true };
  }

  // Invalid length
  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "North Korea",
      type: "phone",
    }),
    details: { country: "North Korea", type: "phone" },
  };
};
