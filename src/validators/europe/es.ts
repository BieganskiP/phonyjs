import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Spanish phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 6 or 7
 * - Landline: 9 digits starting with 8 or 9
 * - Handles international format (+34 prefix) and 0034 prefix
 *
 * @example
 * validateES("612 345 678") // { isValid: true }
 * validateES("512 345 678") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateES: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0034") && digits.length >= 13) {
    digits = digits.slice(4);
  } else if (digits.startsWith("34") && digits.length >= 11) {
    digits = digits.slice(2);
  }

  // Check length
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

  // Mobile: 6/7 + 8 digits
  // Landline: 8/9 + 8 digits
  if (!/^[6-9]\d{8}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Spain",
      }),
      details: { country: "Spain" },
    };
  }

  return { isValid: true };
};
