import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Surinamese phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 7 digits starting with 7 or 8
 * - Landline: 7 digits starting with 4, 5, or 6
 * - Handles international format (+597 prefix) and 00597 prefix
 *
 * Mobile prefixes: 7xx-xxxx, 8xx-xxxx
 * Landline prefixes: 4xx-xxxx, 5xx-xxxx, 6xx-xxxx
 *
 * @example
 * validateSR("712 3456") // { isValid: true } - Mobile
 * validateSR("423 4567") // { isValid: true } - Landline
 * validateSR("597 712 3456") // { isValid: true } - With country code
 * validateSR("112 3456") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateSR: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00597") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("597") && digits.length >= 10) {
    digits = digits.slice(3);
  }

  // Check length
  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "7",
        got: digits.length,
      }),
      details: { expected: "7", got: digits.length },
    };
  }

  if (digits.length > 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "7",
        got: digits.length,
      }),
      details: { expected: "7", got: digits.length },
    };
  }

  const firstDigit = digits[0];

  // Check if first digit is valid
  // Mobile: 7, 8
  // Landline: 4, 5, 6
  if (!firstDigit || !["4", "5", "6", "7", "8"].includes(firstDigit)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        prefix: firstDigit || "unknown",
        country: "Suriname",
      }),
      details: { prefix: firstDigit || "unknown", country: "Suriname" },
    };
  }

  // Validate Surinamese phone number format
  if (!/^[45678]\d{6}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Suriname",
      }),
      details: { country: "Suriname" },
    };
  }

  return { isValid: true };
};


