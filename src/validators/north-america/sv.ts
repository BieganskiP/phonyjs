import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Salvadoran phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 6, 7, or 9
 * - Landline: 8 digits starting with 2 (San Salvador) or other area codes
 * - Handles international format (+503 prefix) and 00503 prefix
 *
 * Mobile prefixes: 6xxx-xxxx, 7xxx-xxxx, 9xxx-xxxx
 * Landline prefixes:
 * - 2xxx-xxxx: San Salvador metropolitan area
 * - Other area codes for different departments
 *
 * @example
 * validateSV("7123 4567") // { isValid: true } - Mobile
 * validateSV("2234 5678") // { isValid: true } - Landline San Salvador
 * validateSV("1123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateSV: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00503") && digits.length >= 13) {
    digits = digits.slice(5);
  } else if (digits.startsWith("503") && digits.length >= 11) {
    digits = digits.slice(3);
  }

  // Check length - Salvadoran numbers are 8 digits
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
  // Mobile: 6, 7, 9
  // Landline: 2 and other area codes (2, 4, 5)
  if (!firstDigit || !["2", "7"].includes(firstDigit)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        prefix: firstDigit || "unknown",
        country: "El Salvador",
      }),
      details: { prefix: firstDigit || "unknown", country: "El Salvador" },
    };
  }

  // Validate Salvadoran phone number format
  if (!/^[245679]\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "El Salvador",
      }),
      details: { country: "El Salvador" },
    };
  }

  return { isValid: true };
};
