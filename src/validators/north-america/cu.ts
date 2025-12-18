import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Cuban phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 5
 * - Landline: 8 digits starting with 2, 3, 4, or 7
 * - Handles international format (+53 prefix) and 0053 prefix
 *
 * Mobile prefixes: 5xxx-xxxx
 * Landline prefixes: 2xxx-xxxx, 3xxx-xxxx, 4xxx-xxxx, 7xxx-xxxx
 *
 * @example
 * validateCU("5123 4567") // { isValid: true } - Mobile
 * validateCU("2234 5678") // { isValid: true } - Landline
 * validateCU("53 5123 4567") // { isValid: true } - With country code
 * validateCU("1123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateCU: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0053")) {
    digits = digits.slice(4);
  } else if (digits.startsWith("53")) {
    digits = digits.slice(2);
  }

  // Check length - Cuban numbers are 8 digits
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

  // Check if first digit is valid (2/3/4/7 for landline, 5 for mobile)
  if (!firstDigit || !["2", "3", "4", "5", "7"].includes(firstDigit)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        prefix: firstDigit || "unknown",
        country: "Cuba",
      }),
      details: { prefix: firstDigit || "unknown", country: "Cuba" },
    };
  }

  // Validate Cuban phone number format
  if (!/^[23457]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Cuba",
      }),
      details: { country: "Cuba" },
    };
  }

  return { isValid: true };
};


