import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Haitian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 3, 4, or 5
 * - Landline: 8 digits starting with 2
 * - Handles international format (+509 prefix) and 00509 prefix
 *
 * Mobile prefixes: 3xxx-xxxx, 4xxx-xxxx, 5xxx-xxxx
 * Landline prefixes: 2xxx-xxxx
 *
 * @example
 * validateHT("3123 4567") // { isValid: true } - Mobile
 * validateHT("2234 5678") // { isValid: true } - Landline
 * validateHT("509 3123 4567") // { isValid: true } - With country code
 * validateHT("1123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateHT: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00509")) {
    digits = digits.slice(5);
  } else if (digits.startsWith("509")) {
    digits = digits.slice(3);
  }

  // Check length - Haitian numbers are 8 digits
  if (digits.length < 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "8",
        got: digits.length,
      }),
      details: { expected: "8", got: digits.length },
    };
  }

  if (digits.length > 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "8",
        got: digits.length,
      }),
      details: { expected: "8", got: digits.length },
    };
  }

  const firstDigit = digits[0];

  // Check if first digit is valid (2 for landline, 3/4/5 for mobile)
  if (!firstDigit || !["2", "3", "4", "5"].includes(firstDigit)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        prefix: firstDigit || "unknown",
        country: "Haiti",
      }),
      details: { prefix: firstDigit || "unknown", country: "Haiti" },
    };
  }

  // Validate Haitian phone number format
  if (!/^[2345]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Haiti",
      }),
      details: { country: "Haiti" },
    };
  }

  return { isValid: true };
};


