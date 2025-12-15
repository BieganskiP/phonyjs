import { PhoneValidator, ValidationResult } from "../types";
import { ErrorCodes, getMessage } from "../errorCodes";

/**
 * Validates Swedish phone numbers with detailed error messages.
 *
 * Rules:
 * - Total length: 7-9 digits (excluding country code)
 * - Mobile numbers: 9 digits starting with 7
 * - Landline: 7-9 digits with area codes (08 for Stockholm, etc.)
 * - Handles international format (+46 prefix) and 0046 prefix
 *
 * @example
 * validateSE("08-123 456 78") // { isValid: true }
 * validateSE("070-123 45 67") // { isValid: true }
 */
export const validateSE: PhoneValidator = (phone: string): ValidationResult => {
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
  if (digits.startsWith("0046") && digits.length >= 11) {
    digits = "0" + digits.slice(4);
  } else if (digits.startsWith("46") && digits.length >= 9) {
    digits = "0" + digits.slice(2);
  }

  // Must start with 0 for domestic format
  if (!digits.startsWith("0")) {
    return {
      isValid: false,
      errorCode: ErrorCodes.MISSING_LEADING_ZERO,
      message: getMessage(ErrorCodes.MISSING_LEADING_ZERO, {
        country: "Sweden",
      }),
      details: { country: "Sweden" },
    };
  }

  // Remove leading 0 for length check
  const withoutLeadingZero = digits.slice(1);

  // Check length (7-9 digits after removing leading 0)
  if (withoutLeadingZero.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "7-9",
        got: withoutLeadingZero.length,
      }),
      details: { expected: "7-9", got: withoutLeadingZero.length },
    };
  }

  if (withoutLeadingZero.length > 9) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "7-9",
        got: withoutLeadingZero.length,
      }),
      details: { expected: "7-9", got: withoutLeadingZero.length },
    };
  }

  // Mobile numbers start with 07 (9 digits total including leading 0)
  if (digits.startsWith("07") && digits.length === 10) {
    return { isValid: true };
  }

  // Landline numbers: 0 + area code (1-3 digits) + subscriber (5-8 digits)
  if (/^0[1-9]\d{6,9}$/.test(digits)) {
    return { isValid: true };
  }

  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, {
      country: "Sweden",
    }),
    details: { country: "Sweden" },
  };
};
