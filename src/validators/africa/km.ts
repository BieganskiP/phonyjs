import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Comoros phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +269
 * - Format: 7 digits
 * - Mobile: starts with 3, 6, 7
 * - Landline: starts with 7
 * - Handles international format (+269 prefix) and 00269 prefix
 *
 * @example
 * validateKM("321 23 45") // { isValid: true }
 * validateKM("773 12 34") // { isValid: true }
 * validateKM("+269 321 23 45") // { isValid: true }
 */
export const validateKM: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00269") && digits.length >= 12) {
    digits = digits.slice(5);
  } else if (digits.startsWith("269") && digits.length >= 10) {
    digits = digits.slice(3);
  }

  if (digits.length < 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: 7,
        got: digits.length,
      }),
      details: { expected: 7, got: digits.length },
    };
  }

  if (digits.length > 7) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: 7,
        got: digits.length,
      }),
      details: { expected: 7, got: digits.length },
    };
  }

  if (!/^[367]\d{6}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT, {
        country: "Comoros",
        type: "phone",
      }),
      details: { country: "Comoros", type: "phone" },
    };
  }

  return { isValid: true };
};


