import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Moldovan phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 8 digits (excluding country code)
 * - Mobile numbers start with 06, 07, 08, 09
 * - Landline numbers start with area codes (22 for Chișinău, etc.)
 * - Handles international format (+373 prefix) and 00373 prefix
 *
 * @example
 * validateMD("22 123 456") // { isValid: true }
 * validateMD("069 123 456") // { isValid: true }
 */
export const validateMD: PhoneValidator = (phone: string): ValidationResult => {
  // Check for invalid characters first
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  // Check if original has formatting (spaces, dashes, etc.)
  const hasFormatting = phone && /[\s\-()]/.test(phone);
  let digits = phone.replace(/\D/g, "");

  // Handle international formats
  // "+373 22 123 456" = "37322123456" = 11 digits, remove "373" = "22123456" = 8 digits, add "0" = "022123456" = 9 digits
  if (digits.startsWith("00373") && digits.length >= 13) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("373") && digits.length >= 11) {
    digits = "0" + digits.slice(3);
  }

  // Domestic format: 8 digits without leading 0 for landlines (e.g., "22 123 456")
  // But "22123456" (8 digits without formatting) should be rejected
  // Accept 8 digits without leading 0 only if original had formatting characters
  if (digits.length === 8 && !digits.startsWith("0")) {
    // Check if it matches landline area codes: 22xxxxxx or 231xxxxx
    if ((/^22\d{6}$/.test(digits) || /^231\d{5}$/.test(digits)) && hasFormatting) {
      return { isValid: true };
    }
  }

  // Must start with 0 for 9-digit format
  if (digits.length === 9 && !digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Moldova",
      }),
      details: { country: "Moldova" },
    };
  }

  // Mobile: 9 digits with leading 0 (069, 079, etc.)
  if (digits.length === 9 && digits.startsWith("0")) {
    if (/^0[6-9]\d{7}$/.test(digits)) {
      return { isValid: true };
    }
  }

  // Landline: 9 digits with leading 0 (022, 0231, etc.)
  // "22 123 456" = 8 digits, but after adding leading 0 becomes "022123456" = 9 digits
  // "231 23 456" = 8 digits, but after adding leading 0 becomes "023123456" = 9 digits
  if (digits.length === 9 && digits.startsWith("0")) {
    // Valid landlines: 022xxxxxx (022 + 6 digits), 0231xxxxx (0231 + 5 digits)
    if (/^022\d{6}$/.test(digits) || /^0231\d{5}$/.test(digits)) {
      return { isValid: true };
    }
    // Also accept other area codes
    if (/^0[2-9]\d{7,8}$/.test(digits)) {
      return { isValid: true };
    }
  }

  // Check length (8 digits for landline without leading 0, 9 digits for mobile/landline with leading 0)
  if (digits.length < 8 || digits.length > 9) {
    return {
      isValid: false,
      errorCode: digits.length < 8 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
      message: getMessage(
        digits.length < 8 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        {
          expected: "8-9",
          got: digits.length,
        }
      ),
      details: { expected: "8-9", got: digits.length },
    };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Moldova",
    }),
    details: { country: "Moldova" },
  };
};

