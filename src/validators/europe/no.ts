import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Norwegian phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 8 digits
 * - Mobile numbers start with 4 or 9
 * - Landline numbers start with 2, 3, 5, 6, 7, or 8
 * - Handles international format (+47 prefix) and 0047 prefix
 *
 * @example
 * validateNO("21 23 45 67") // { isValid: true }
 * validateNO("412 34 567") // { isValid: true }
 */
export const validateNO: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0047") && digits.length >= 12) {
    digits = digits.slice(4);
  } else if (digits.startsWith("47") && digits.length >= 10) {
    digits = digits.slice(2);
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

  // Must be 8 digits starting with 2-9 (not 0 or 1)
  if (!/^[2-9]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Norway",
      }),
      details: { country: "Norway" },
    };
  }

  return { isValid: true };
};

