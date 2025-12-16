import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Yemeni phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 9 digits starting with 7
 * - Landline: 7-9 digits with area codes (e.g., 1 for Sana'a, 2 for Aden)
 * - Handles international format (+967 prefix) and 00967 prefix
 *
 * Mobile carriers:
 * - 7xxxx xxxx: Various carriers (Yemen Mobile, MTN, Sabafon)
 *
 * Major area codes:
 * - 1: Sana'a
 * - 2: Aden
 * - 3: Taiz
 * - 4: Al Hudaydah
 * - 5: Ibb
 *
 * @example
 * validateYE("7 1234 5678") // { isValid: true }
 * validateYE("6 1234 5678") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateYE: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00967") && digits.length >= 10) {
    digits = digits.slice(5);
  } else if (digits.startsWith("967") && digits.length >= 8) {
    digits = digits.slice(3);
  }

  // Check minimum length
  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "7-9",
        got: digits.length,
      }),
      details: { expected: "7-9", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "7-9",
        got: digits.length,
      }),
      details: { expected: "7-9", got: digits.length },
    };
  }

  // Mobile: 7 followed by 8 digits (9 total)
  if (digits.startsWith("7") && digits.length === 9) {
    if (!/^7\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Yemen",
          type: "mobile",
        }),
        details: { country: "Yemen", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with 1-6 (area codes), 7-9 digits total
  if (/^[1-6]/.test(digits)) {
    if (digits.length < 7 || digits.length > 9) {
      return {
        isValid: false,
        errorCode:
          digits.length < 7 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 7 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: "7-9", got: digits.length, type: "landline" }
        ),
        details: { expected: "7-9", got: digits.length, type: "landline" },
      };
    }

    if (!/^[1-6]\d{6,8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Yemen",
          type: "landline",
        }),
        details: { country: "Yemen", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["7 (mobile)", "1-6 (landline)"],
      country: "Yemen",
    }),
    details: {
      validPrefixes: ["7 (mobile)", "1-6 (landline)"],
      country: "Yemen",
    },
  };
};

