import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Paraguayan phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 9
 * - Landline: 7-8 digits depending on area code
 * - Handles international format (+595 prefix) and 00595 prefix
 * - Mobile format: 9XX-XXX-XXX (9 digits total)
 * - Landline format: XX-XXX-XXX or XXX-XXXX (7-8 digits)
 *
 * Mobile prefixes: 9XX-XXX-XXX
 * Landline prefixes: Various area codes
 *
 * @example
 * validatePY("981 123 456") // { isValid: true } - Mobile
 * validatePY("21 123 456") // { isValid: true } - Landline Asunción
 * validatePY("595 981 123 456") // { isValid: true } - With country code
 * validatePY("8123 456") // { isValid: false, errorCode: "INVALID_FORMAT", ... }
 */
export const validatePY: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00595")) {
    digits = digits.slice(5);
  } else if (digits.startsWith("595")) {
    digits = digits.slice(3);
  }

  // Check if it's a mobile number (starts with 9, 9 digits total)
  if (digits.startsWith("9")) {
    // Mobile should be exactly 9 digits
    if (digits.length === 9) {
      return { isValid: true };
    }
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


