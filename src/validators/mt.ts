import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Maltese phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 8 digits (excluding country code)
 * - Landline numbers start with 2
 * - Mobile numbers start with 7 or 9
 * - Handles international format (+356 prefix) and 00356 prefix
 *
 * @example
 * validateMT("21 234 567") // { isValid: true }
 * validateMT("9923 4567") // { isValid: true }
 */
export const validateMT: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00356") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("356") && digits.length >= 11) {
    digits = digits.slice(3);
  }

  // Check length
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

  // Must be 8 digits starting with 2 (landline), 7 (mobile), or 9 (mobile)
  if (!/^[279]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Malta",
      }),
      details: { country: "Malta" },
    };
  }

  return { isValid: true };
};

