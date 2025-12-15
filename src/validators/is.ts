import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Icelandic phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 7 digits (excluding country code)
 * - No area codes, all numbers are national
 * - Handles international format (+354 prefix) and 00354 prefix
 *
 * @example
 * validateIS("512 3456") // { isValid: true }
 * validateIS("123 4567") // { isValid: true }
 */
export const validateIS: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00354") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("354") && digits.length >= 10) {
    digits = digits.slice(3);
  }

  // Check length
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

  // Must be exactly 7 digits
  if (!/^\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Iceland",
      }),
      details: { country: "Iceland" },
    };
  }

  return { isValid: true };
};

