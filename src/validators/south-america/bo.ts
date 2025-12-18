import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Bolivian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 6 or 7
 * - Landline: 8 digits starting with 2, 3, or 4
 * - Handles international format (+591 prefix) and 00591 prefix
 *
 * Mobile prefixes: 6xxx-xxxx, 7xxx-xxxx
 * Landline prefixes: 2xxx-xxxx, 3xxx-xxxx, 4xxx-xxxx
 *
 * @example
 * validateBO("6123 4567") // { isValid: true } - Mobile
 * validateBO("2234 5678") // { isValid: true } - Landline
 * validateBO("591 6123 4567") // { isValid: true } - With country code
 * validateBO("1123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateBO: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00591") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("591") && digits.length >= 11) {
    digits = digits.slice(3);
  }

  // Check length
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

  // Check if first digit is valid
  // Mobile: 6, 7
  // Landline: 2, 3, 4
  if (!firstDigit || !["2", "3", "4", "6", "7"].includes(firstDigit)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        prefix: firstDigit || "unknown",
        country: "Bolivia",
      }),
      details: { prefix: firstDigit || "unknown", country: "Bolivia" },
    };
  }

  // Validate Bolivian phone number format
  if (!/^[23467]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Bolivia",
      }),
      details: { country: "Bolivia" },
    };
  }

  return { isValid: true };
};


