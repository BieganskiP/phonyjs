import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates French Guiana phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 9 digits after country code 594
 * - Mobile numbers: 594-6XX-XX-XX-XX (start with 6)
 * - Landline numbers: 594-5XX-XX-XX-XX (start with 5)
 * - Handles international format (+594 prefix) and 00594 prefix
 * - Total length: 9 digits after country code
 * - Uses same numbering plan as other French territories
 *
 * Mobile prefixes: 6XX
 * Landline prefixes: 5XX
 *
 * @example
 * validateGF("594 694 12 34 56") // { isValid: true } - Mobile
 * validateGF("594 594 12 34 56") // { isValid: true } - Landline
 * validateGF("+594 694 123456") // { isValid: true } - International format
 * validateGF("594 12 34 56") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validateGF: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00594")) {
    digits = digits.slice(5);
  } else if (digits.startsWith("594") && digits.length > 9) {
    // Only remove country code if number is longer than 9 digits
    digits = digits.slice(3);
  }

  // Check length - French Guiana numbers are 9 digits after country code
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "9",
        got: digits.length,
      }),
      details: { expected: "9", got: digits.length },
    };
  }

  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "9",
        got: digits.length,
      }),
      details: { expected: "9", got: digits.length },
    };
  }

  // Validate French Guiana phone number format (9 digits)
  if (!/^\d{9}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "French Guiana",
      }),
      details: { country: "French Guiana" },
    };
  }

  // Check valid prefixes (5 for landline, 6 for mobile)
  const firstDigit = digits[0];
  if (firstDigit !== "5" && firstDigit !== "6") {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        country: "French Guiana",
        validPrefixes: "5XX (landline), 6XX (mobile)",
      }),
      details: { 
        country: "French Guiana", 
        validPrefixes: "5XX (landline), 6XX (mobile)",
        receivedPrefix: firstDigit
      },
    };
  }

  return { isValid: true };
};


