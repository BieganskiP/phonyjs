import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Australian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 04
 * - Landline: 10 digits starting with 02, 03, 07, or 08 (area codes)
 * - Area codes: 02 (NSW), 03 (VIC), 07 (QLD), 08 (SA/WA/NT)
 * - Handles international format (+61 prefix) and 0061 prefix
 *
 * @example
 * validateAU("04 1234 5678") // { isValid: true }
 * validateAU("05 1234 5678") // { isValid: false, errorCode: "INVALID_PREFIX", ... }
 */
export const validateAU: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0061") && digits.length >= 14) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("61") && digits.length >= 11) {
    digits = "0" + digits.slice(2);
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
        country: "Australia",
      }),
      details: { country: "Australia" },
    };
  }

  // Mobile: 04 + 8 digits
  if (digits.startsWith("04")) {
    if (!/^04\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Australia",
          type: "mobile",
        }),
        details: { country: "Australia", type: "mobile" },
      };
    }
    return { isValid: true };
  }

  // Landline: 02/03/07/08 + 8 digits
  if (
    digits.startsWith("02") ||
    digits.startsWith("03") ||
    digits.startsWith("07") ||
    digits.startsWith("08")
  ) {
    if (!/^0[2378]\d{8}$/.test(digits)) {
      return {
        isValid: false,
        errorCode: ErrorCodes.INVALID_FORMAT,
        message: getMessage(ErrorCodes.INVALID_FORMAT, {
          country: "Australia",
          type: "landline",
        }),
        details: { country: "Australia", type: "landline" },
      };
    }
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_PREFIX,
    message: getMessage(ErrorCodes.INVALID_PREFIX, {
      validPrefixes: [
        "04 (mobile)",
        "02 (NSW/ACT)",
        "03 (VIC/TAS)",
        "07 (QLD)",
        "08 (SA/WA/NT)",
      ],
      country: "Australia",
    }),
    details: {
      validPrefixes: [
        "04 (mobile)",
        "02 (NSW/ACT)",
        "03 (VIC/TAS)",
        "07 (QLD)",
        "08 (SA/WA/NT)",
      ],
      country: "Australia",
    },
  };
};
