import { PhoneValidator } from "../types";

/**
 * Validates Indonesian phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10-13 digits starting with 08
 * - Landline: 9-11 digits with area codes (021-Jakarta, 022-Bandung, 031-Surabaya, etc.)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+62 prefix)
 * 
 * Mobile carriers:
 * - 0811, 0812, 0813, 0821, 0822, 0823: Telkomsel
 * - 0814, 0815, 0816, 0855, 0856, 0857, 0858: Indosat
 * - 0817, 0818, 0819, 0859: XL Axiata
 * - 0895, 0896, 0897, 0898, 0899: 3 (Tri)
 * 
 * @example
 * validateID("0812 3456 7890") // true (mobile - Telkomsel)
 * validateID("021 1234 5678") // true (landline - Jakarta)
 * validateID("+62 812 3456 7890") // true (international mobile)
 * validateID("+62 21 1234 5678") // true (international landline)
 */
export const validateID: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+62)
  if (digits.startsWith("62")) {
    // Mobile: +62 812 -> 0812
    if (digits.length >= 11 && digits.charAt(2) === "8") {
      digits = "0" + digits.slice(2);
    }
    // Landline: +62 21 -> 021
    else if (digits.length >= 10) {
      digits = "0" + digits.slice(2);
    }
  }
  
  // Mobile: 08 + 8-11 digits (10-13 total)
  // Landline: 0[1-7,9] + area code + number (9-11 digits)
  return /^(08\d{8,11}|0[1-79]\d{7,9})$/.test(digits);
};

