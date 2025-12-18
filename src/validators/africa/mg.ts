import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Madagascar phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +261
 * - Format: 9 digits
 * - Mobile: starts with 3
 * - Landline: starts with 2
 * - Handles international format (+261 prefix) and 00261 prefix
 *
 * @example
 * validateMG("32 12 345 67") // { isValid: true }
 * validateMG("20 12 345 67") // { isValid: true }
 * validateMG("+261 32 12 345 67") // { isValid: true }
 */
export const validateMG: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00261") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("261") && digits.length >= 12) {
    digits = digits.slice(3);
  }

  // Remove leading 0 if present
  if (digits.startsWith("0") && digits.length === 10) {
    digits = digits.slice(1);
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

  if (!/^[23]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2 (landline)", "3 (mobile)"],
        country: "Madagascar",
      }),
      details: {
        validPrefixes: ["2 (landline)", "3 (mobile)"],
        country: "Madagascar",
      },
    };
  }

  return { isValid: true };
};



