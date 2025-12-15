import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Andorran phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 6 digits (excluding country code)
 * - Numbers start with 6 or 8
 * - Handles international format (+376 prefix) and 00376 prefix
 *
 * @example
 * validateAD("812 345") // { isValid: true }
 * validateAD("612 345") // { isValid: true }
 */
export const validateAD: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00376") && digits.length >= 11) {
    digits = digits.slice(5);
  } else if (digits.startsWith("376") && digits.length >= 9) {
    digits = digits.slice(3);
  }

  // Check length
  if (digits.length < 6) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 6,
        got: digits.length,
      }),
      details: { expected: 6, got: digits.length },
    };
  }

  if (digits.length > 6) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 6,
        got: digits.length,
      }),
      details: { expected: 6, got: digits.length },
    };
  }

  // Must be 6 digits starting with 6 or 8
  if (!/^[68]\d{5}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Andorra",
      }),
      details: { country: "Andorra" },
    };
  }

  return { isValid: true };
};

