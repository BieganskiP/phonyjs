import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Lebanese phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 7-8 digits starting with 3, 7, or 8
 * - Landline: 7-8 digits with area codes (e.g., 1 for Beirut)
 * - Handles international format (+961 prefix) and 00961 prefix
 *
 * Mobile carriers:
 * - 3xxx xxxx: Alfa
 * - 7xxx xxxx, 8xxx xxxx: Touch
 *
 * Major area codes:
 * - 1: Beirut
 * - 4: South Lebanon
 * - 5: Mount Lebanon North
 * - 6: North Lebanon
 * - 7: Nabatieh
 * - 8: Bekaa
 * - 9: Baalbek-Hermel
 *
 * @example
 * validateLB("3 123 456") // { isValid: true }
 * validateLB("0 123 456") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateLB: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00961") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("961") && digits.length >= 10) {
    digits = digits.slice(3);
  }

  // Check minimum length
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

  // Check maximum length
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

  // Mobile: 7-8 digits starting with 3, 7, or 8
  if (/^[378]/.test(digits)) {
    if (!/^[378]\d{6,7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Lebanon",
          type: "mobile",
        }),
        details: { country: "Lebanon", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: 7-8 digits starting with 1, 4, 5, 6, 9
  if (/^[145689]/.test(digits)) {
    if (!/^[145689]\d{6,7}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Lebanon",
          type: "landline",
        }),
        details: { country: "Lebanon", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: ["3, 7, 8 (mobile)", "1, 4-6, 9 (landline)"],
      country: "Lebanon",
    }),
    details: {
      validPrefixes: ["3, 7, 8 (mobile)", "1, 4-6, 9 (landline)"],
      country: "Lebanon",
    },
  };
};
