import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Greenland phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 6 digits after country code 299
 * - Mobile and landline use same format: 299-XX-XX-XX
 * - Handles international format (+299 prefix) and 00299 prefix
 * - Total length: 6 digits after country code
 *
 * Mobile prefixes: Various (no specific mobile prefixes)
 * Landline prefixes: Various (no specific landline prefixes)
 *
 * @example
 * validateGL("299 12 34 56") // { isValid: true } - Standard format
 * validateGL("+299 12 34 56") // { isValid: true } - International format
 * validateGL("00299 123456") // { isValid: true } - International format
 * validateGL("299 12 345") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validateGL: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00299")) {
    digits = digits.slice(5);
  } else if (digits.startsWith("299")) {
    digits = digits.slice(3);
  }

  // Check length - Greenland numbers are 6 digits after country code
  if (digits.length < 6) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "6",
        got: digits.length,
      }),
      details: { expected: "6", got: digits.length },
    };
  }

  if (digits.length > 6) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "6",
        got: digits.length,
      }),
      details: { expected: "6", got: digits.length },
    };
  }

  // Validate Greenland phone number format (6 digits)
  if (!/^\d{6}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Greenland",
      }),
      details: { country: "Greenland" },
    };
  }

  return { isValid: true };
};


