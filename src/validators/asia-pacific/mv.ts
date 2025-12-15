import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Maldivian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 7 digits starting with 7, 9
 * - Landline: 7 digits starting with 3, 6
 * - Handles international format (+960 prefix) and 00960 prefix
 *
 * Mobile prefixes: 7xx, 9xx
 * Landline prefixes: 3xx, 6xx
 *
 * @example
 * validateMV("791 2345") // { isValid: true }
 * validateMV("591 2345") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateMV: PhoneValidator = (phone: string): ValidationResult => {
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
  // Only strip if more than 7 digits (to avoid stripping valid 960xxxx numbers)
  if (digits.startsWith("00960") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("960") && digits.length >= 10) {
    digits = digits.slice(3);
  }

  // Check length
  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 7,
        got: digits.length,
      }),
      details: { expected: 7, got: digits.length },
    };
  }

  if (digits.length > 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 7,
        got: digits.length,
      }),
      details: { expected: 7, got: digits.length },
    };
  }

  // Mobile: 7xx or 9xx followed by 4 digits (7 total)
  if (/^[79]/.test(digits)) {
    if (!/^[79]\d{6}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Maldives",
          type: "mobile",
        }),
        details: { country: "Maldives", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: 3xx or 6xx followed by 4 digits (7 total)
  if (/^[36]/.test(digits)) {
    if (!/^[36]\d{6}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Maldives",
          type: "landline",
        }),
        details: { country: "Maldives", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["7, 9 (mobile)", "3, 6 (landline)"],
      country: "Maldives",
    }),
    details: {
      validPrefixes: ["7, 9 (mobile)", "3, 6 (landline)"],
      country: "Maldives",
    },
  };
};
