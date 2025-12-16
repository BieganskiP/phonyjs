import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Bhutan phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 17X (17X XXXXX)
 * - Landline: 8 digits starting with 0XX (0XX XXXXX)
 * - Handles international format (+975 prefix) and 00975 prefix
 *
 * @example
 * validateBT("171 23456") // { isValid: true }
 * validateBT("02 123456") // { isValid: true }
 */
export const validateBT: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00975")) {
    digits = digits.slice(5); // Remove 00975, keep as is (mobile numbers don't have leading 0)
  } else if (digits.startsWith("975")) {
    digits = digits.slice(3); // Remove 975, keep as is (mobile numbers don't have leading 0)
  }
  
  // Add leading 0 for landline numbers if they don't have it
  if (!digits.startsWith("0") && !digits.startsWith("17")) {
    digits = "0" + digits;
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

  // Mobile: 8 digits starting with 17X
  if (digits.startsWith("17")) {
    if (/^17\d{6}$/.test(digits)) {
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
      country: "Bhutan",
    }),
    details: { country: "Bhutan" },
  };
};

