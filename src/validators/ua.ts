import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Ukrainian phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 9 digits (excluding country code)
 * - Mobile numbers start with 0 (domestic format) or 39, 50, 63, 66, 67, 68, 73, 91, 92, 93, 94, 95, 96, 97, 98, 99
 * - Landline: area codes 2-5 digits, subscriber 5-7 digits
 * - Handles international format (+380 prefix) and 00380 prefix
 *
 * @example
 * validateUA("044 123 4567") // { isValid: true }
 * validateUA("050 123 4567") // { isValid: true }
 */
export const validateUA: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00380") && digits.length >= 14) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("380") && digits.length >= 12) {
    digits = "0" + digits.slice(3);
  }

  // Must start with 0 for domestic format
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Ukraine",
      }),
      details: { country: "Ukraine" },
    };
  }

  // Remove leading 0 for validation
  const withoutLeadingZero = digits.slice(1);

  // Check length (9 digits total including leading 0)
  if (digits.length !== 10) {
    return {
      isValid: false,
      errorCode: digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
      message: getMessage(
        digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        {
          expected: 10,
          got: digits.length,
        }
      ),
      details: { expected: 10, got: digits.length },
    };
  }

  // Mobile numbers: 0 + (39, 50, 63, 66, 67, 68, 73, 91-99) + 7 digits
  const mobilePrefixes = ["39", "50", "63", "66", "67", "68", "73", "91", "92", "93", "94", "95", "96", "97", "98", "99"];
  if (mobilePrefixes.some(prefix => withoutLeadingZero.startsWith(prefix))) {
    if (withoutLeadingZero.length === 9) {
      return { isValid: true };
    }
  }

  // Landline: 0 + area code (2-5 digits) + subscriber (5-7 digits) = 10 total
  // Area codes: 31-39, 41-47, 51-57, 61-69, 71-79, 81-89, etc.
  if (/^0[3-8]\d{8}$/.test(digits)) {
    return { isValid: true };
  }

  // Kyiv area code 044
  if (digits.startsWith("044") && digits.length === 10) {
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Ukraine",
    }),
    details: { country: "Ukraine" },
  };
};

