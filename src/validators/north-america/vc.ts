import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Saint Vincent and the Grenadines phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 7 digits after area code 784
 * - Mobile and landline use same format: 784-XXX-XXXX
 * - Handles international format (+1-784 prefix) and 001784 prefix
 * - Total length with area code: 10 digits (1-784-XXX-XXXX)
 *
 * Mobile prefixes: Various (no specific mobile prefixes)
 * Landline prefixes: Various (no specific landline prefixes)
 *
 * @example
 * validateVC("784 123 4567") // { isValid: true } - Standard format
 * validateVC("1 784 123 4567") // { isValid: true } - With country code
 * validateVC("+1 784 123 4567") // { isValid: true } - International format
 * validateVC("784 12 3456") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validateVC: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("001784")) {
    digits = digits.slice(6);
  } else if (digits.startsWith("1784")) {
    digits = digits.slice(4);
  } else if (digits.startsWith("784")) {
    digits = digits.slice(3);
  }

  // Check length - Saint Vincent and the Grenadines numbers are 7 digits after area code
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

  // Validate Saint Vincent and the Grenadines phone number format (7 digits)
  if (!/^\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Saint Vincent and the Grenadines",
      }),
      details: { country: "Saint Vincent and the Grenadines" },
    };
  }

  return { isValid: true };
};


