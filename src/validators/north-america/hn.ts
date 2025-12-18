import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Honduran phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 9
 * - Landline: 8 digits starting with 2
 * - Handles international format (+504 prefix) and 00504 prefix
 *
 * Mobile prefixes: 9xxx-xxxx
 * Landline prefixes: 2xxx-xxxx
 *
 * @example
 * validateHN("9123 4567") // { isValid: true } - Mobile
 * validateHN("2234 5678") // { isValid: true } - Landline
 * validateHN("3123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateHN: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00504") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("504") && digits.length >= 11) {
    digits = digits.slice(3);
  }

  // Check length - Honduran numbers are 8 digits
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
  // Mobile: 3, 7, 8, 9
  // Landline: 2 and other area codes (4, 5, 6)
  if (!firstDigit || !["2", "9"].includes(firstDigit)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        prefix: firstDigit || "unknown",
        country: "Honduras",
      }),
      details: { prefix: firstDigit || "unknown", country: "Honduras" },
    };
  }

  // Validate Honduran phone number format
  if (!/^[29]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Honduras",
      }),
      details: { country: "Honduras" },
    };
  }

  return { isValid: true };
};
