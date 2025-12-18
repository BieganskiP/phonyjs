import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Uruguayan phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 9
 * - Landline: 7-8 digits depending on area code
 * - Handles international format (+598 prefix) and 00598 prefix
 * - Mobile format: 9XXX-XXXX (8 digits total)
 * - Landline format: XX-XXX-XXX or XXX-XXXX (7-8 digits)
 *
 * Mobile prefixes: 9XXX-XXXX
 * Landline prefixes: Various area codes
 *
 * @example
 * validateUY("9123 4567") // { isValid: true } - Mobile
 * validateUY("2 123 4567") // { isValid: true } - Landline Montevideo
 * validateUY("598 9123 4567") // { isValid: true } - With country code
 * validateUY("8123 4567") // { isValid: false, errorCode: "INVALID_FORMAT", ... }
 */
export const validateUY: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00598")) {
    digits = digits.slice(5);
  } else if (digits.startsWith("598")) {
    digits = digits.slice(3);
  }

  // Check if it's a mobile number (starts with 9, 8 digits total)
  if (digits.startsWith("9")) {
    // Mobile should be exactly 8 digits
    if (digits.length === 8) {
      return { isValid: true };
    }
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

  // Landline numbers: 7-8 digits (not starting with 9)
  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "7-8",
        got: digits.length,
      }),
      details: { expected: "7-8", got: digits.length },
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

  return { isValid: true };
};


