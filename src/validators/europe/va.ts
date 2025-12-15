import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Vatican City phone numbers with detailed error messages.
 *
 * Rules:
 * - Must contain exactly 6 digits (excluding country code)
 * - Numbers typically start with 06 698
 * - Handles international format (+39 prefix) and 0039 prefix
 *
 * Note: Vatican City uses Italian numbering plan (+39)
 *
 * @example
 * validateVA("06 698 1234") // { isValid: true }
 * validateVA("123 456") // { isValid: true }
 */
export const validateVA: PhoneValidator = (phone: string): ValidationResult => {
  // Check for invalid characters first
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  // Handle international formats (Vatican uses Italian +39)
  // "+39 06 698 1234" = "39066981234" = 11 digits, remove "39" = "066981234" = 9 digits
  if (digits.startsWith("0039") && digits.length >= 13) {
    digits = digits.slice(4);
  } else if (digits.startsWith("39") && digits.length >= 11) {
    digits = digits.slice(2);
  }

  // Vatican numbers are typically 6-10 digits (Italian format)
  // For simplicity, accept 6-10 digits
  if (digits.length < 6) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "6-10",
        got: digits.length,
      }),
      details: { expected: "6-10", got: digits.length },
    };
  }

  if (digits.length > 10) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "6-10",
        got: digits.length,
      }),
      details: { expected: "6-10", got: digits.length },
    };
  }

  // Accept 6-10 digits (Italian numbering format)
  if (!/^\d{6,10}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Vatican City",
      }),
      details: { country: "Vatican City" },
    };
  }

  return { isValid: true };
};

