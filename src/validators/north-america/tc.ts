import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Turks and Caicos Islands phone numbers with detailed error messages.
 *
 * Rules:
 * - All numbers: 7 digits after area code 649
 * - Mobile and landline use same format: 649-XXX-XXXX
 * - Handles international format (+1-649 prefix) and 001649 prefix
 * - Total length with area code: 10 digits (1-649-XXX-XXXX)
 *
 * Mobile prefixes: Various (no specific mobile prefixes)
 * Landline prefixes: Various (no specific landline prefixes)
 *
 * @example
 * validateTC("649 123 4567") // { isValid: true } - Standard format
 * validateTC("1 649 123 4567") // { isValid: true } - With country code
 * validateTC("+1 649 123 4567") // { isValid: true } - International format
 * validateTC("649 12 3456") // { isValid: false, errorCode: "TOO_SHORT", ... }
 */
export const validateTC: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("001649")) {
    digits = digits.slice(6);
  } else if (digits.startsWith("1649")) {
    digits = digits.slice(4);
  } else if (digits.startsWith("649")) {
    digits = digits.slice(3);
  }

  // Check length - Turks and Caicos Islands numbers are 7 digits after area code
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

  // Validate Turks and Caicos Islands phone number format (7 digits)
  if (!/^\d{7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Turks and Caicos Islands",
      }),
      details: { country: "Turks and Caicos Islands" },
    };
  }

  return { isValid: true };
};


