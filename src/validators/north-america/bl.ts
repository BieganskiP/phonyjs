import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Saint-Barthélemy phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 9 digits after country code 590
 * - Mobile numbers: 590-6XX-XX-XX-XX (start with 6)
 * - Landline numbers: 590-5XX-XX-XX-XX (start with 5)
 * - Handles international format (+590 prefix) and 00590 prefix
 * - Total length: 9 digits after country code
 * - Uses same numbering plan as Guadeloupe
 *
 * Mobile prefixes: 6XX
 * Landline prefixes: 5XX
 *
 * @example
 * validateBL("590 690 12 34 56") // { isValid: true } - Mobile
 * validateBL("590 590 12 34 56") // { isValid: true } - Landline
 * validateBL("+590 690 123456") // { isValid: true } - International format
 * validateBL("590 12 34 56") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validateBL: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00590")) {
    digits = digits.slice(5);
  } else if (digits.startsWith("590") && digits.length > 9) {
    // Only remove country code if number is longer than 9 digits
    digits = digits.slice(3);
  }

  // Check length - Saint-Barthélemy numbers are 9 digits after country code
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

  // Validate Saint-Barthélemy phone number format (9 digits)
  if (!/^\d{9}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Saint-Barthélemy",
      }),
      details: { country: "Saint-Barthélemy" },
    };
  }

  // Check valid prefixes (5 for landline, 6 for mobile)
  const firstDigit = digits[0];
  if (firstDigit !== "5" && firstDigit !== "6") {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        country: "Saint-Barthélemy",
        validPrefixes: "5XX (landline), 6XX (mobile)",
      }),
      details: { 
        country: "Saint-Barthélemy", 
        validPrefixes: "5XX (landline), 6XX (mobile)",
        receivedPrefix: firstDigit
      },
    };
  }

  return { isValid: true };
};
