import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Nauru phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +674
 * - Format: 7 digits
 * - Mobile: starts with 5, 8
 * - Landline: starts with 4
 * - Handles international format (+674 prefix) and 00674 prefix
 *
 * @example
 * validateNR("555 1234") // { isValid: true }
 * validateNR("444 5678") // { isValid: true }
 * validateNR("+674 555 1234") // { isValid: true }
 */
export const validateNR: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00674") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("674") && digits.length >= 10) {
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

  if (!/^[458]\d{6}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["4 (landline)", "5, 8 (mobile)"],
        country: "Nauru",
      }),
      details: {
        validPrefixes: ["4 (landline)", "5, 8 (mobile)"],
        country: "Nauru",
      },
    };
  }

  return { isValid: true };
};


