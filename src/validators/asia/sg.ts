import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Singapore phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 8 or 9
 * - Landline: 8 digits starting with 6
 * - Handles international format (+65 prefix) and 0065 prefix
 *
 * Number types:
 * - 6XXX XXXX: Landline
 * - 8XXX XXXX: Mobile
 * - 9XXX XXXX: Mobile
 *
 * @example
 * validateSG("8123 4567") // { isValid: true }
 * validateSG("5123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateSG: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0065") && digits.length >= 12) {
    digits = digits.slice(4);
  } else if (digits.startsWith("65") && digits.length >= 10) {
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

  // Must be 8 digits starting with 6 (landline), 8, or 9 (mobile)
  if (!/^[689]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Singapore",
      }),
      details: { country: "Singapore" },
    };
  }

  return { isValid: true };
};
