import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Nepali phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 97, 98
 * - Landline: 9-10 digits with area codes (e.g., 01-Kathmandu, 061-Pokhara)
 * - Handles international format (+977 prefix) and 00977 prefix
 *
 * Mobile prefixes: 97x, 98x
 * Major area codes:
 * - 01: Kathmandu
 * - 061: Pokhara
 * - 021: Biratnagar
 *
 * @example
 * validateNP("9841 234 567") // { isValid: true }
 * validateNP("9741 234 567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateNP: PhoneValidator = (phone: string): ValidationResult => {
  // Check for invalid characters first
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  // Handle international formats (+977)
  if (digits.startsWith("00977") && digits.length >= 11) {
    const remaining = digits.slice(5);
    // If remaining starts with 9, it's a mobile (keep as is)
    // Otherwise add leading 0 for landline
    digits = remaining.startsWith("9") ? remaining : "0" + remaining;
  } else if (digits.startsWith("977") && digits.length >= 9) {
    const remaining = digits.slice(3);
    // If remaining starts with 9, it's a mobile (keep as is)
    // Otherwise add leading 0 for landline
    digits = remaining.startsWith("9") ? remaining : "0" + remaining;
  }

  // Check minimum length
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "9-10",
        got: digits.length,
      }),
      details: { expected: "9-10", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "9-10",
        got: digits.length,
      }),
      details: { expected: "9-10", got: digits.length },
    };
  }

  // Mobile: 9[7-8]x followed by 7 digits (10 total, no leading 0)
  if (digits.startsWith("9")) {
    if (digits.length !== 10) {
      return {
        isValid: false,
        errorCode:
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: 10, got: digits.length, type: "mobile" }
        ),
        details: { expected: 10, got: digits.length, type: "mobile" },
      };
    }

    if (!/^9[7-8]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Nepal",
          type: "mobile",
        }),
        details: { country: "Nepal", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[1-9] followed by 7-8 digits (9-10 total with leading 0)
  if (digits.startsWith("0")) {
    if (digits.length < 9 || digits.length > 10) {
      return {
        isValid: false,
        errorCode:
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "9-10", got: digits.length, type: "landline" }
        ),
        details: { expected: "9-10", got: digits.length, type: "landline" },
      };
    }

    if (!/^0[1-9]\d{7,8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Nepal",
          type: "landline",
        }),
        details: { country: "Nepal", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["97-98 (mobile)", "01-09 (landline)"],
      country: "Nepal",
    }),
    details: {
      validPrefixes: ["97-98 (mobile)", "01-09 (landline)"],
      country: "Nepal",
    },
  };
};

