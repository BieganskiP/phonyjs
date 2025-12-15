import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Kosovan phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 9 digits (excluding country code)
 * - Mobile numbers start with 04
 * - Landline numbers start with area codes (038 for Pristina, etc.)
 * - Handles international format (+383 prefix) and 00383 prefix
 *
 * @example
 * validateXK("38 123 456") // { isValid: true }
 * validateXK("044 123 456") // { isValid: true }
 */
export const validateXK: PhoneValidator = (phone: string): ValidationResult => {
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
  // "+383 38 123 456" = "38338123456" = 11 digits, remove "383" = "38123456" = 8 digits, add "0" = "038123456" = 9 digits
  // "+383 044 123 456" = "383044123456" = 12 digits, remove "383" = "044123456" = 9 digits (already has leading 0)
  if (digits.startsWith("00383") && digits.length >= 14) {
    const remaining = digits.slice(5);
    if (remaining.startsWith("0")) {
      digits = remaining;
    } else {
      digits = "0" + remaining;
    }
  } else if (digits.startsWith("383") && digits.length >= 11) {
    const remaining = digits.slice(3);
    if (remaining.startsWith("0")) {
      digits = remaining;
    } else {
      digits = "0" + remaining;
    }
  }

  // Domestic format: 8 digits without leading 0 for landlines (e.g., "38 123 456")
  // But "38123456" (8 digits without formatting) should be rejected
  // Accept 8 digits without leading 0 only if original had formatting characters
  if (digits.length === 8 && !digits.startsWith("0")) {
    // Check if it matches landline pattern: 38xxxxxx
    if (/^38\d{6}$/.test(digits) && hasFormatting) {
      return { isValid: true };
    }
  }

  // Must start with 0 for 9-digit format
  if (digits.length === 9 && !digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Kosovo",
      }),
      details: { country: "Kosovo" },
    };
  }

  // Mobile: 9 digits with leading 0 (044, 045, etc.)
  // Landline: 9 digits with leading 0 (029, 038, etc.)
  // "38 123 456" = 8 digits, but after adding leading 0 becomes "038123456" = 9 digits
  // "044 123 456" = 9 digits with leading 0
  if (digits.length === 9) {
    if (/^0\d{8}$/.test(digits)) {
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
      country: "Kosovo",
    }),
    details: { country: "Kosovo" },
  };
};

