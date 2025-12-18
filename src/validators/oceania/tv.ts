import { PhoneValidator, ValidationResult } from "../../types";
import { ErrorCodes, getMessage } from "../../errorCodes";

/**
 * Validates Tuvalu phone numbers with detailed error messages.
 *
 * Rules:
 * - Country code: +688
 * - Format: 5-6 digits
 * - Mobile: starts with 2, 7, 9
 * - Landline: starts with 2
 * - Handles international format (+688 prefix) and 00688 prefix
 *
 * @example
 * validateTV("20123") // { isValid: true }
 * validateTV("901234") // { isValid: true }
 * validateTV("+688 20123") // { isValid: true }
 */
export const validateTV: PhoneValidator = (phone: string): ValidationResult => {
  if (phone && !/^[0-9+\s\-().]+$/.test(phone)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_CHARACTERS,
      message: getMessage(ErrorCodes.INVALID_CHARACTERS),
    };
  }

  let digits = phone.replace(/\D/g, "");

  if (digits.startsWith("00688") && digits.length >= 10) {
    digits = digits.slice(5);
  } else if (digits.startsWith("688") && digits.length >= 8) {
    digits = digits.slice(3);
  }

  if (digits.length < 5) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_SHORT,
      message: getMessage(ErrorCodes.TOO_SHORT, {
        expected: "5-6",
        got: digits.length,
      }),
      details: { expected: "5-6", got: digits.length },
    };
  }

  if (digits.length > 6) {
    return {
      isValid: false,
      errorCode: ErrorCodes.TOO_LONG,
      message: getMessage(ErrorCodes.TOO_LONG, {
        expected: "5-6",
        got: digits.length,
      }),
      details: { expected: "5-6", got: digits.length },
    };
  }

  if (!/^[279]\d{4,5}$/.test(digits)) {
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_PREFIX,
      message: getMessage(ErrorCodes.INVALID_PREFIX, {
        validPrefixes: ["2 (landline/mobile)", "7, 9 (mobile)"],
        country: "Tuvalu",
      }),
      details: {
        validPrefixes: ["2 (landline/mobile)", "7, 9 (mobile)"],
        country: "Tuvalu",
      },
    };
  }

  return { isValid: true };
};



