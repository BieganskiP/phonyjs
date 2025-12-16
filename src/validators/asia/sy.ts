import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Syrian phone numbers with detailed error messages.
 *
 * Rules:
 * - Mobile: 10 digits starting with 09 (09xx xxxx xx)
 * - Landline: 9 digits with area codes (011 for Damascus, etc.)
 * - Handles international format (+963 prefix) and 00963 prefix
 *
 * @example
 * validateSY("0912 345 678") // { isValid: true }
 * validateSY("011 123 4567") // { isValid: true }
 */
export const validateSY: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("00963") && digits.length >= 14) {
    digits = "0" + digits.slice(5);
  } else if (digits.startsWith("963") && digits.length >= 12) {
    digits = "0" + digits.slice(3);
  }

  // Must start with 0 for domestic format
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Syria",
      }),
      details: { country: "Syria" },
    };
  }

  // Mobile: 09 followed by 8 digits (10 total)
  if (digits.startsWith("09")) {
    if (digits.length === 10) {
      return { isValid: true };
    }
    return {
      isValid: false,
      errorCode: digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
      message: getMessage(
        digits.length < 10 ? ErrorCodes.TOO_SHORT : ErrorCodes.TOO_LONG,
        {
          expected: 10,
          got: digits.length,
          type: "mobile",
        }
      ),
      details: { expected: 10, got: digits.length, type: "mobile" },
    };
  }

  // Landline: 0 + area code (2-3 digits) + subscriber (6-7 digits) = 9-10 total
  // Area codes: 011 (Damascus), 021 (Aleppo), 031 (Latakia), etc.
  if (digits.length >= 9 && digits.length <= 10) {
    if (/^0[1-9]\d{7,9}$/.test(digits)) {
      return { isValid: true };
    }
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Syria",
    }),
    details: { country: "Syria" },
  };
};

