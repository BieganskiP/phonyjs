import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Panamanian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 8 digits starting with 6
 * - Landline: 7-8 digits with area codes (e.g., 2xx-xxxx for Panama City)
 * - Handles international format (+507 prefix) and 00507 prefix
 *
 * Mobile prefixes: 6xxx-xxxx
 * Landline prefixes:
 * - 2xx-xxxx: Panama City (8 digits)
 * - 4xx-xxxx, 7xx-xxxx, 9xx-xxxx: Other areas (7 digits)
 *
 * @example
 * validatePA("6123 4567") // { isValid: true } - Mobile
 * validatePA("223 4567") // { isValid: true } - Landline Panama City
 * validatePA("412 3456") // { isValid: true } - Landline other area
 * validatePA("1123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validatePA: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00507")) {
    digits = digits.slice(5);
  } else if (digits.startsWith("507")) {
    digits = digits.slice(3);
  }

  // Check length - Panamanian numbers are 7-8 digits
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
        expected: "7-8",
        got: digits.length,
      }),
      details: { expected: "7-8", got: digits.length },
    };
  }

  const firstDigit = digits[0];

  // Check if first digit is valid
  if (!firstDigit || !["2", "4", "6", "7", "9"].includes(firstDigit)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        prefix: firstDigit || "unknown",
        country: "Panama",
      }),
      details: { prefix: firstDigit || "unknown", country: "Panama" },
    };
  }

  // Mobile numbers (start with 6) must be 8 digits
  if (firstDigit === "6" && digits.length !== 8) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Panama (mobile must be 8 digits)",
      }),
      details: { country: "Panama (mobile must be 8 digits)" },
    };
  }

  // Panama City landlines (start with 2) should be 8 digits
  if (firstDigit === "2") {
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
  }

  // Other area landlines (4, 7, 9) should be 7 digits
  if (["4", "7", "9"].includes(firstDigit)) {
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
  }

  // Validate Panamanian phone number format
  if (!/^[24679]\d{6,7}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Panama",
      }),
      details: { country: "Panama" },
    };
  }

  return { isValid: true };
};
