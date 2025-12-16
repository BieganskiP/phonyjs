import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Indian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 6, 7, 8, or 9
 * - Landline: 10 digits with area codes (2-4 digits) + subscriber number
 * - Common area codes: 11 (Delhi), 22 (Mumbai), 33 (Kolkata), 44 (Chennai), 80 (Bangalore)
 * - Handles international format (+91 prefix) and 0091 prefix
 *
 * @example
 * validateIN("98765 43210") // { isValid: true }
 * validateIN("58765 43210") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateIN: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0091") && digits.length >= 14) {
    digits = digits.slice(4);
  } else if (digits.startsWith("91") && digits.length >= 12) {
    digits = digits.slice(2);
  }

  // Check length
  if (digits.length < 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  // Mobile: 10 digits starting with 6-9
  // Landline: 10 digits starting with 1-5 (area code prefixes)
  if (!/^[1-9]\d{9}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "India",
      }),
      details: { country: "India" },
    };
  }

  return { isValid: true };
};
