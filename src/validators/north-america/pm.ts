import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Saint Pierre and Miquelon phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 6 digits after country code 508
 * - Mobile and landline use same format: 508-XX-XX-XX
 * - Handles international format (+508 prefix) and 00508 prefix
 * - Total length: 6 digits after country code
 *
 * Mobile prefixes: Various (no specific mobile prefixes)
 * Landline prefixes: Various (no specific landline prefixes)
 *
 * @example
 * validatePM("508 12 34 56") // { isValid: true } - Standard format
 * validatePM("+508 12 34 56") // { isValid: true } - International format
 * validatePM("00508 123456") // { isValid: true } - International format
 * validatePM("508 12 345") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validatePM: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00508")) {
    digits = digits.slice(5);
  } else if (digits.startsWith("508")) {
    digits = digits.slice(3);
  }

  // Check length - Saint Pierre and Miquelon numbers are 6 digits after country code
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

  // Validate Saint Pierre and Miquelon phone number format (6 digits)
  if (!/^\d{6}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Saint Pierre and Miquelon",
      }),
      details: { country: "Saint Pierre and Miquelon" },
    };
  }

  return { isValid: true };
};


