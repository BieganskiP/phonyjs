import { CountryCode, ValidationResult } from "./types";
import { validators } from "./validators";
import { ErrorCodes, getMessage } from "./errorCodes";

/**
 * Validates a phone number for a specific country with detailed error information
 *
 * @param countryCode - Two-letter ISO country code (e.g., "gb", "us", "sa")
 * @param phoneNumber - The phone number to validate
 * @returns ValidationResult with isValid, errorCode (type-safe), message, and details
 *
 * @example
 * ```typescript
 * // Valid number
 * validatePhone("us", "+1 212 456 7890")
 * // → { isValid: true }
 *
 * // Invalid number
 * const result = validatePhone("us", "123")
 * // → {
 * //     isValid: false,
 * //     errorCode: "INVALID_FORMAT",
 * //     message: "Invalid phone number format for US"
 * //   }
 *
 * // Use errorCode on frontend for i18n
 * if (result.errorCode === "INVALID_FORMAT") {
 *   displayMessage(t("errors.invalidFormat", { country: "US" }));
 * }
 * ```
 */
export function validatePhone(
  countryCode: CountryCode,
  phoneNumber: string
): ValidationResult {
  const normalizedCode = countryCode.toLowerCase();
  const validator = validators[normalizedCode as keyof typeof validators];

  if (!validator) {
    const details = { code: countryCode };
    return {
      isValid: false,
      errorCode: ErrorCodes.UNSUPPORTED_COUNTRY,
      message: getMessage(ErrorCodes.UNSUPPORTED_COUNTRY, details),
      details,
    };
  }

  const result = validator(phoneNumber);

  // Handle enhanced validators that return ValidationResult
  if (typeof result === "object") {
    return result;
  }

  // Handle legacy boolean validators
  if (result) {
    return { isValid: true };
  }

  const details = { country: countryCode.toUpperCase() };
  return {
    isValid: false,
    errorCode: ErrorCodes.INVALID_FORMAT,
    message: getMessage(ErrorCodes.INVALID_FORMAT, details),
    details,
  };
}

/**
 * Simple boolean validator for backward compatibility
 * Returns true if valid, false if invalid
 *
 * @param countryCode - Two-letter ISO country code
 * @param phoneNumber - The phone number to validate
 * @returns boolean - true if valid, false otherwise
 *
 * @example
 * ```typescript
 * isValidPhone("us", "+1 212 456 7890") // → true
 * isValidPhone("us", "123") // → false
 * ```
 */
export function isValidPhone(
  countryCode: CountryCode,
  phoneNumber: string
): boolean {
  return validatePhone(countryCode, phoneNumber).isValid;
}

/**
 * @deprecated Use validatePhone() instead. This function is kept for backward compatibility.
 * Validates with fallback to generic validator for unsupported countries.
 */
export function validatePhoneWithFallback(
  countryCode: CountryCode,
  phoneNumber: string,
  strict: boolean = false
): ValidationResult {
  const result = validatePhone(countryCode, phoneNumber);

  // If unsupported and not strict, use generic validation
  if (result.errorCode === ErrorCodes.UNSUPPORTED_COUNTRY && !strict) {
    // Basic validation: at least 7 digits, not too long
    const digits = phoneNumber.replace(/\D/g, "");
    if (digits.length >= 7 && digits.length <= 15) {
      return { isValid: true };
    }
    return {
      isValid: false,
      errorCode: ErrorCodes.INVALID_FORMAT,
      message: getMessage(ErrorCodes.INVALID_FORMAT),
    };
  }

  return result;
}
