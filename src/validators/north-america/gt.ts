import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Guatemalan phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 5
 * - Landline: 8 digits starting with 2
 * - Handles international format (+502 prefix) and 00502 prefix
 *
 * Mobile prefixes: 5xxx-xxxx
 * Landline prefixes: 2xxx-xxxx
 *
 * @example
 * validateGT("5123 4567") // { isValid: true } - Mobile
 * validateGT("2234 5678") // { isValid: true } - Landline
 * validateGT("3123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateGT: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00502") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("502") && digits.length >= 11) {
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

  const firstDigit = digits[0];

  // Check if first digit is valid
  // Mobile: 5
  // Landline: 2
  if (!firstDigit || !["2", "5"].includes(firstDigit)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        prefix: firstDigit,
        country: "Guatemala",
      }),
      details: { prefix: firstDigit, country: "Guatemala" },
    };
  }

  // Validate Guatemalan phone number format
  if (!/^[25]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Guatemala",
      }),
      details: { country: "Guatemala" },
    };
  }

  return { isValid: true };
};
