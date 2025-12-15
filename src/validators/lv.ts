import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Latvian phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 8 digits (excluding country code)
 * - Mobile numbers start with 2
 * - Landline numbers start with 6 or 7
 * - Handles international format (+371 prefix) and 00371 prefix
 *
 * @example
 * validateLV("67 123 456") // { isValid: true }
 * validateLV("29123456") // { isValid: true }
 */
export const validateLV: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00371") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("371") && digits.length >= 11) {
    digits = digits.slice(3);
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

  // Must be 8 digits starting with 2 (mobile), 6 (landline), or 7 (landline)
  if (!/^[267]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Latvia",
      }),
      details: { country: "Latvia" },
    };
  }

  return { isValid: true };
};

