import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Liechtenstein phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 7 digits (excluding country code)
 * - No area codes, all numbers are national
 * - Handles international format (+423 prefix) and 00423 prefix
 *
 * @example
 * validateLI("234 56 78") // { isValid: true }
 * validateLI("123 4567") // { isValid: true }
 */
export const validateLI: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00423") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("423") && digits.length >= 10) {
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
        country: "Liechtenstein",
      }),
      details: { country: "Liechtenstein" },
    };
  }

  return { isValid: true };
};

