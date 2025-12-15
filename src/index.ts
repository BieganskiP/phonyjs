/**
 * PhonyJS - Type-safe phone number validation library
 *
 * A modern, extensible library for validating phone numbers with country-specific rules.
 * Built with TypeScript for maximum type safety and developer experience.
 */

// Main validation functions
export {
  validatePhone,
  isValidPhone,
  validatePhoneWithFallback,
} from "./validatePhone";

// Validators registry (for direct access to individual validators)
export { validators, validateGeneric } from "./validators";

// Error codes for frontend i18n
export { ErrorCodes } from "./errorCodes";
export type { ErrorCode } from "./errorCodes";

// Type exports for TypeScript consumers
export type { PhoneValidator, ValidationResult } from "./types";
export type { AvailableCountryCode } from "./validators";

// Re-export individual validators for tree-shaking
// Europe
export { validatePL } from "./validators/europe/pl";
export { validateGB } from "./validators/europe/gb";
export { validateFR } from "./validators/europe/fr";
export { validateDE } from "./validators/europe/de";
export { validateES } from "./validators/europe/es";
export { validateIT } from "./validators/europe/it";
export { validateNL } from "./validators/europe/nl";
export { validateCH } from "./validators/europe/ch";
export { validateAT } from "./validators/europe/at";
export { validateBE } from "./validators/europe/be";
export { validateIE } from "./validators/europe/ie";
export { validateGR } from "./validators/europe/gr";
export { validateTR } from "./validators/europe/tr";
export { validateDK } from "./validators/europe/dk";
export { validateFI } from "./validators/europe/fi";
export { validateHU } from "./validators/europe/hu";
export { validateCZ } from "./validators/europe/cz";
export { validateHR } from "./validators/europe/hr";
export { validateRO } from "./validators/europe/ro";
export { validateBA } from "./validators/europe/ba";
export { validateAL } from "./validators/europe/al";
export { validateME } from "./validators/europe/me";
export { validateGE } from "./validators/europe/ge";
export { validateAM } from "./validators/europe/am";
export { validateRU } from "./validators/europe/ru";
export { validateCY } from "./validators/europe/cy";
export { validatePT } from "./validators/europe/pt";
export { validateSE } from "./validators/europe/se";
export { validateNO } from "./validators/europe/no";
export { validateUA } from "./validators/europe/ua";
export { validateBG } from "./validators/europe/bg";
export { validateSK } from "./validators/europe/sk";
export { validateSI } from "./validators/europe/si";
export { validateEE } from "./validators/europe/ee";
export { validateLV } from "./validators/europe/lv";
export { validateLT } from "./validators/europe/lt";
export { validateLU } from "./validators/europe/lu";
export { validateMT } from "./validators/europe/mt";
export { validateIS } from "./validators/europe/is";
export { validateRS } from "./validators/europe/rs";
export { validateBY } from "./validators/europe/by";
export { validateMD } from "./validators/europe/md";
export { validateMK } from "./validators/europe/mk";
export { validateAZ } from "./validators/europe/az";
export { validateMC } from "./validators/europe/mc";
export { validateLI } from "./validators/europe/li";
export { validateSM } from "./validators/europe/sm";
export { validateAD } from "./validators/europe/ad";
export { validateVA } from "./validators/europe/va";
export { validateXK } from "./validators/europe/xk";
export { validateKZ } from "./validators/europe/kz";
// Middle East
export { validateSA } from "./validators/middle-east/sa";
export { validateAE } from "./validators/middle-east/ae";
export { validateEG } from "./validators/middle-east/eg";
export { validateQA } from "./validators/middle-east/qa";
export { validateKW } from "./validators/middle-east/kw";
export { validateBH } from "./validators/middle-east/bh";
export { validateOM } from "./validators/middle-east/om";
export { validateJO } from "./validators/middle-east/jo";
export { validateYE } from "./validators/middle-east/ye";
export { validateLB } from "./validators/middle-east/lb";
export { validateIQ } from "./validators/middle-east/iq";
export { validateSD } from "./validators/middle-east/sd";
export { validateIR } from "./validators/middle-east/ir";
export { validateIL } from "./validators/middle-east/il";
export { validatePS } from "./validators/middle-east/ps";
export { validateSY } from "./validators/middle-east/sy";
// Asia-Pacific
export { validateIN } from "./validators/asia-pacific/in";
export { validatePK } from "./validators/asia-pacific/pk";
export { validateCN } from "./validators/asia-pacific/cn";
export { validateJP } from "./validators/asia-pacific/jp";
export { validateKR } from "./validators/asia-pacific/kr";
export { validateSG } from "./validators/asia-pacific/sg";
export { validateID } from "./validators/asia-pacific/id";
export { validatePH } from "./validators/asia-pacific/ph";
export { validateTH } from "./validators/asia-pacific/th";
export { validateMY } from "./validators/asia-pacific/my";
export { validateNP } from "./validators/asia-pacific/np";
export { validateLK } from "./validators/asia-pacific/lk";
export { validateHK } from "./validators/asia-pacific/hk";
export { validateUZ } from "./validators/asia-pacific/uz";
export { validateKG } from "./validators/asia-pacific/kg";
export { validateAF } from "./validators/asia-pacific/af";
export { validateAU } from "./validators/asia-pacific/au";
export { validateMV } from "./validators/asia-pacific/mv";
// Africa
export { validateZA } from "./validators/africa/za";
export { validateKE } from "./validators/africa/ke";
export { validateUG } from "./validators/africa/ug";
export { validateSN } from "./validators/africa/sn";
export { validateAO } from "./validators/africa/ao";
// Americas
export { validateUS } from "./validators/americas/us";
export { validateCA } from "./validators/americas/ca";
