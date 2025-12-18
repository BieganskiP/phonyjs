import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Mexican phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 1, 2, 3, 5, 6, 7, 8, or 9
 * - Landline: 10 digits with area codes (e.g., 55-Mexico City, 33-Guadalajara)
 * - Handles international format (+52 prefix) and 0052 prefix
 * - Mobile numbers in Mexico City, Guadalajara, and Monterrey: 10 digits
 * - Other areas: 10 digits total
 *
 * Major area codes:
 * - 55: Mexico City (CDMX)
 * - 33: Guadalajara
 * - 81: Monterrey
 * - 222: Puebla
 * - 228: Veracruz
 *
 * @example
 * validateMX("55 1234 5678") // { isValid: true }
 * validateMX("33 1234 5678") // { isValid: true }
 * validateMX("01 1234 5678") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateMX: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0052") && digits.length >= 12) {
    digits = digits.slice(4);
  } else if (digits.startsWith("52") && digits.length >= 10) {
    digits = digits.slice(2);
  }

  // Check length
  if (digits.length < 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 10,
        got: digits.length,
      }),
      details: { expected: 10, got: digits.length },
    };
  }

  // Extract first digit
  const firstDigit = digits[0];

  // Check if first digit is valid (cannot start with 0 or 4)
  if (firstDigit === "0" || firstDigit === "4") {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        prefix: firstDigit,
        country: "Mexico",
      }),
      details: { prefix: firstDigit, country: "Mexico" },
    };
  }

  // Validate Mexican phone number format
  // Must be 10 digits, first digit 1-3, 5-9
  if (!/^[1-35-9]\d{9}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Mexico",
      }),
      details: { country: "Mexico" },
    };
  }

  return { isValid: true };
};
