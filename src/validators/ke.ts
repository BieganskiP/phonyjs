import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Kenyan phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 07xx or 01xx
 * - Landline: 10 digits with area codes (e.g., 020-Nairobi, 041-Mombasa)
 * - Handles international format (+254 prefix) and 00254 prefix
 *
 * Mobile prefixes: 070-079, 010-019
 * Major area codes:
 * - 020: Nairobi
 * - 041: Mombasa
 * - 051: Nakuru
 *
 * @example
 * validateKE("0712 345 678") // { isValid: true }
 * validateKE("0912 345 678") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateKE: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00254") && digits.length >= 12) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("254") && digits.length >= 10) {
    digits = "0" + digits.slice(3);
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

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Kenya",
      }),
      details: { country: "Kenya" },
    };
  }

  // Mobile: 07xx or 01xx followed by 7 digits (10 total)
  if (digits.startsWith("07") || digits.startsWith("01")) {
    if (!/^0[17]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Kenya",
          type: "mobile",
        }),
        details: { country: "Kenya", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: 0[2-6] followed by 8 digits (10 total)
  if (/^0[2-6]/.test(digits)) {
    if (!/^0[2-6]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Kenya",
          type: "landline",
        }),
        details: { country: "Kenya", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["01, 07 (mobile)", "02-06 (landline)"],
      country: "Kenya",
    }),
    details: {
      validPrefixes: ["01, 07 (mobile)", "02-06 (landline)"],
      country: "Kenya",
    },
  };
};

