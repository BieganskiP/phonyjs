import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Azerbaijani phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 9 digits (excluding country code)
 * - Mobile numbers start with 05, 07, 09
 * - Landline numbers start with area codes (12 for Baku, etc.)
 * - Handles international format (+994 prefix) and 00994 prefix
 *
 * @example
 * validateAZ("12 123 4567") // { isValid: true }
 * validateAZ("050 123 4567") // { isValid: true }
 */
export const validateAZ: PhoneValidator = (phone: string): ValidationResult => {
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
  // "+994 12 123 4567" = "994121234567" = 12 digits, remove "994" = "121234567" = 9 digits (landline without leading 0)
  // "+994 050 123 4567" = "9940501234567" = 13 digits, remove "994" = "0501234567" = 10 digits (mobile with leading 0)
  if (digits.startsWith("00994") && digits.length >= 14) {
    digits = digits.slice(5);
  } else if (digits.startsWith("994") && digits.length >= 12) {
    const remaining = digits.slice(3);
    // If it starts with 0, it's a mobile number, keep the 0
    // If it doesn't start with 0, it's a landline, keep as is
    digits = remaining;
  }

  // Mobile: 10 digits with leading 0 (050, 070, 099)
  if (digits.length === 10 && digits.startsWith("0")) {
    if (/^0[579]\d{8}$/.test(digits)) {
      return { isValid: true };
    }
  }

  // Landline: 9 digits, can be with or without leading 0 depending on format
  // Domestic format: "12 123 4567" (with formatting) should be valid
  // But "121234567" (without formatting) should be invalid
  // Accept 9 digits without leading 0 only if original had formatting characters
  if (digits.length === 9 && !digits.startsWith("0")) {
    // Valid landlines: 12xxxxxxx (12 + 7 digits), 141xxxxxx (141 + 6 digits)
    if ((/^12\d{7}$/.test(digits) || /^141\d{6}$/.test(digits)) && hasFormatting) {
      return { isValid: true };
    }
  }

  // Also accept 9 digits with leading 0 (from international format)
  if (digits.length === 9 && digits.startsWith("0")) {
    // Valid landlines: 012xxxxxxx (012 + 6 digits), 0141xxxxx (0141 + 5 digits)
    if (/^012\d{6}$/.test(digits) || /^0141\d{5}$/.test(digits)) {
      return { isValid: true };
    }
  }

  // Check length
  if (digits.length < 9 || digits.length > 10) {
    return {
      isValid: false,
      errorCode: digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
      message: getMessage(
        digits.length < 9 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        {
          expected: "9-10",
          got: digits.length,
        }
      ),
      details: { expected: "9-10", got: digits.length },
    };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Azerbaijan",
    }),
    details: { country: "Azerbaijan" },
  };
};

