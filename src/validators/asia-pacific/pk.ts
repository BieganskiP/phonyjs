import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Pakistani phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 11 digits starting with 3xx (300-349 for various carriers)
 * - Landline: 9-11 digits with area codes (e.g., 21-Karachi, 42-Lahore, 51-Islamabad)
 * - Handles international format (+92 prefix) and 0092 prefix
 *
 * Mobile carriers:
 * - 300-305: Mobilink/Jazz
 * - 306-309: Telenor
 * - 310-315: Ufone
 * - 320-329: Zong
 * - 330-339: U-fone/SCOM
 * - 340-349: Warid/Jazz
 *
 * Major area codes: 21 (Karachi), 42 (Lahore), 51 (Islamabad), 91 (Peshawar)
 *
 * @example
 * validatePK("0300 1234567") // { isValid: true }
 * validatePK("0200 1234567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validatePK: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0092") && digits.length >= 11) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("92") && digits.length >= 9) {
    digits = "0" + digits.slice(2);
  }

  // Check minimum length
  if (digits.length < 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "9-11",
        got: digits.length,
      }),
      details: { expected: "9-11", got: digits.length },
    };
  }

  // Check maximum length
  if (digits.length > 11) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "9-11",
        got: digits.length,
      }),
      details: { expected: "9-11", got: digits.length },
    };
  }

  // Must start with 0
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Pakistan",
      }),
      details: { country: "Pakistan" },
    };
  }

  // Mobile: 03[0-4]x followed by 8 digits (11 total with leading 0)
  if (digits.startsWith("03")) {
    if (digits.length !== 11) {
      return {
        isValid: false,
        errorCode:
          digits.length < 11 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        message: getMessage(
          digits.length < 11 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
          { expected: 11, got: digits.length, type: "mobile" }
        ),
        details: { expected: 11, got: digits.length, type: "mobile" },
      };
    }

    const mobilePrefix = digits.slice(0, 3);
    if (!/^03[0-4]/.test(mobilePrefix)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_MOBILE_PREFIX,
        message: getMessage(ErrorCodes.INVALID_MOBILE_PREFIX, {
          validPrefixes: ["030-034"],
          got: mobilePrefix,
        }),
        details: { validPrefixes: ["030-034"], got: mobilePrefix },
      };
    }

    if (!/^03[0-4]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Pakistan",
          type: "mobile",
        }),
        details: { country: "Pakistan", type: "mobile" },
      };
    }

    return { isValid: true };
  }

  // Landline: 0[2-9]x followed by varying digits (9-11 total)
  if (/^0[2-9]/.test(digits)) {
    if (!/^0(?:2\d|3[5-9]|[4-9]\d)\d{6,8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Pakistan",
          type: "landline",
        }),
        details: { country: "Pakistan", type: "landline" },
      };
    }

    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["030-034 (mobile)", "02, 035-09 (landline)"],
      country: "Pakistan",
    }),
    details: {
      validPrefixes: ["030-034 (mobile)", "02, 035-09 (landline)"],
      country: "Pakistan",
    },
  };
};

