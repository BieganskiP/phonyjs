import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Mongolian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 9X (9X XXXXXX)
 * - Landline: 8 digits starting with 0XX (0XX XXXXX)
 * - Handles international format (+976 prefix) and 00976 prefix
 *
 * @example
 * validateMN("91 123456") // { isValid: true }
 * validateMN("011 23456") // { isValid: true }
 */
export const validateMN: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00976") && digits.length >= 13) {
    digits = digits.slice(5);
    // If it starts with 9, it's mobile (no leading 0), otherwise add 0 for landline
    if (!digits.startsWith("9")) {
      digits = "0" + digits;
    }
  } else if (digits.startsWith("976") && digits.length >= 11) {
    digits = digits.slice(3);
    // If it starts with 9, it's mobile (no leading 0), otherwise add 0 for landline
    if (!digits.startsWith("9")) {
      digits = "0" + digits;
    }
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

  // Mobile: 8 digits starting with 9X
  if (digits.startsWith("9")) {
    if (/^9\d{7}$/.test(digits)) {
      return { isValid: true };
    }
  }

  // Landline: 8 digits starting with 0XX
  if (digits.startsWith("0")) {
    if (/^0\d{7}$/.test(digits)) {
      return { isValid: true };
    }
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Mongolia",
    }),
    details: { country: "Mongolia" },
  };
};

