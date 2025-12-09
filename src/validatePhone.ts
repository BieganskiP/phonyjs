import {
  validators,
  validateGeneric,
  AvailableCountryCode,
} from "./validators";

/**
 * Validates a phone number for a specific country.
 *
 * This function provides full TypeScript type safety:
 * - Country codes are restricted to available validators
 * - IDE autocomplete for country codes
 * - No runtime errors for unsupported countries
 *
 * @param countryCode - The two-letter country code (e.g., "pl", "us", "gb", "sa")
 * @param phoneNumber - The phone number to validate (can include formatting characters)
 * @returns true if the phone number is valid for the specified country, false otherwise
 *
 * @example
 * validatePhone("pl", "500 123 456"); // true
 * validatePhone("us", "212-456-7890"); // true
 * validatePhone("gb", "07912345678"); // true
 * validatePhone("sa", "050 123 4567"); // true
 * validatePhone("pl", "invalid"); // false
 */
export function validatePhone(
  countryCode: AvailableCountryCode,
  phoneNumber: string
): boolean {
  const validator = validators[countryCode];
  return validator(phoneNumber);
}

/**
 * Validates a phone number with fallback to generic validation.
 *
 * This function allows validation for any country code string:
 * - Uses specific validator if available
 * - Falls back to generic validation for unsupported countries
 * - No TypeScript restrictions on country codes
 *
 * Use this when you need to support any country code, even those
 * without specific validators implemented.
 *
 * @param countryCode - Any country code string
 * @param phoneNumber - The phone number to validate (can include formatting characters)
 * @param options - Optional configuration
 * @param options.strict - If true, only use specific validators (no fallback)
 * @returns true if the phone number is valid, false otherwise
 *
 * @example
 * validatePhoneWithFallback("pl", "500 123 456"); // true (uses specific validator)
 * validatePhoneWithFallback("fr", "0612345678"); // true (uses generic validator)
 * validatePhoneWithFallback("fr", "123", { strict: true }); // false (no specific validator)
 */
export function validatePhoneWithFallback(
  countryCode: string,
  phoneNumber: string,
  options: { strict?: boolean } = {}
): boolean {
  const validator = validators[countryCode as AvailableCountryCode];

  if (validator) {
    return validator(phoneNumber);
  }

  if (options.strict) {
    return false;
  }

  return validateGeneric(phoneNumber);
}
