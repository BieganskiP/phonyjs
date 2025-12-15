import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Afghanistan phone numbers with detailed error messages.
 *
 * Rules:
 * - Format: +93 XX YYYYYYY (9 digits after country code)
 * - Domestic format: 0XX YYYYYYY (10 digits with leading 0)
 * - Format without leading 0: XX YYYYYYY (9 digits)
 * - Handles international format (+93 prefix) and 0093 prefix
 *
 * Mobile carrier codes: 70-79 (e.g., 70/79-Roshan, 72/78-Etisalat, 70-AWCC)
 * Landline area codes: 20-Kabul, 30-Kandahar, 40-Herat, and others
 *
 * Note: Some older AWCC mobile numbers may have 6-digit subscriber numbers
 * (8 digits total after country code), but most carriers have migrated to 7-digit format.
 *
 * @example
 * validateAF("70 123 4567") // { isValid: true }
 * validateAF("020 1234567") // { isValid: true }
 * validateAF("+93 70 123 4567") // { isValid: true }
 * validateAF("80 123 4567") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateAF: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0093") && digits.length >= 13) {
    digits = digits.slice(4); // Remove 0093, expect 9 digits
  } else if (digits.startsWith("93") && digits.length >= 11) {
    digits = digits.slice(2); // Remove 93, expect 9 digits
  }

  // Handle domestic format with leading 0: 0XX YYYYYYY (10 digits)
  if (digits.startsWith("0") && digits.length === 10) {
    digits = digits.slice(1); // Remove leading 0, now expect 9 digits
  }

  // Check length (should be 9 digits after processing)
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

  if (digits.length > 9) {
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

  // Format: XX YYYYYYY (2-digit area/carrier code + 7-digit subscriber number)
  // Mobile: starts with 7 (70-79)
  if (digits.startsWith("7")) {
    if (!/^7\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Afghanistan",
          type: "mobile",
        }),
        details: { country: "Afghanistan", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: starts with 2-6 (area codes like 20-Kabul, 30-Kandahar, 40-Herat)
  if (/^[2-6]/.test(digits)) {
    if (!/^[2-6]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Afghanistan",
          type: "landline",
        }),
        details: { country: "Afghanistan", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: [
        "7 (mobile: 70-79)",
        "2-6 (landline area codes: 20-Kabul, 30-Kandahar, 40-Herat, etc.)",
      ],
      country: "Afghanistan",
    }),
    details: {
      validPrefixes: [
        "7 (mobile: 70-79)",
        "2-6 (landline area codes: 20-Kabul, 30-Kandahar, 40-Herat, etc.)",
      ],
      country: "Afghanistan",
    },
  };
};
