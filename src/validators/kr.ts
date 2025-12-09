import { PhoneValidator } from "../types";

/**
 * Validates South Korean phone numbers (mobile and landline).
 * 
 * Rules:
 * - Mobile: 10-11 digits starting with 010
 * - Landline: 9-10 digits with area codes (02-Seoul, 031-Gyeonggi, 051-Busan, etc.)
 * - Non-digit characters are stripped before validation
 * - Handles international format (+82 prefix)
 * 
 * Mobile format: 010-XXXX-XXXX or 010-XXX-XXXX
 * Major area codes: 02 (Seoul), 031 (Gyeonggi), 032 (Incheon), 051 (Busan)
 * 
 * @example
 * validateKR("010 1234 5678") // true (mobile)
 * validateKR("02 1234 5678") // true (landline - Seoul)
 * validateKR("031 123 4567") // true (landline - Gyeonggi)
 * validateKR("+82 10 1234 5678") // true (international mobile)
 * validateKR("+82 2 1234 5678") // true (international landline)
 */
export const validateKR: PhoneValidator = (phone) => {
  let digits = phone.replace(/\D/g, "");
  
  // Remove country code if present (+82)
  if (digits.startsWith("82")) {
    // Mobile: +82 10 -> 010
    if (digits.length >= 11 && digits.charAt(2) === "1" && digits.charAt(3) === "0") {
      digits = "0" + digits.slice(2);
    }
    // Landline: +82 2 -> 02 (Seoul doesn't have middle 0)
    else if (digits.length >= 10) {
      digits = "0" + digits.slice(2);
    }
  }
  
  // Mobile: 010 + 7-8 digits (10-11 total)
  // Landline: 0[2-9] + 7-9 digits (9-11 total)
  return /^(010\d{7,8}|0[2-9]\d{6,9})$/.test(digits);
};

