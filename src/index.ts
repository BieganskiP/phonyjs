/**
 * PhonyJS - Type-safe phone number validation library
 * 
 * A modern, extensible library for validating phone numbers with country-specific rules.
 * Built with TypeScript for maximum type safety and developer experience.
 */

// Main validation functions
export { validatePhone, validatePhoneWithFallback } from "./validatePhone";

// Validators registry (for direct access to individual validators)
export { validators, validateGeneric } from "./validators";

// Type exports for TypeScript consumers
export type { PhoneValidator } from "./types";
export type { AvailableCountryCode } from "./validators";

// Re-export individual validators for tree-shaking
export { validatePL } from "./validators/pl";
export { validateUS } from "./validators/us";
export { validateGB } from "./validators/gb";
export { validateSA } from "./validators/sa";
export { validateFR } from "./validators/fr";
export { validateDE } from "./validators/de";
export { validateIN } from "./validators/in";
export { validateCA } from "./validators/ca";
export { validateAU } from "./validators/au";
export { validateAE } from "./validators/ae";
export { validateEG } from "./validators/eg";
export { validateES } from "./validators/es";
export { validateIT } from "./validators/it";
export { validateNL } from "./validators/nl";
export { validateJP } from "./validators/jp";
export { validateCN } from "./validators/cn";
export { validateKR } from "./validators/kr";
export { validateSG } from "./validators/sg";
export { validateID } from "./validators/id";
export { validateTR } from "./validators/tr";
export { validatePK } from "./validators/pk";
export { validateGR } from "./validators/gr";
export { validateSD } from "./validators/sd";
export { validateOM } from "./validators/om";
export { validateQA } from "./validators/qa";
export { validateKW } from "./validators/kw";
export { validateBH } from "./validators/bh";
export { validateJO } from "./validators/jo";
export { validateYE } from "./validators/ye";
export { validateLB } from "./validators/lb";
export { validateIQ } from "./validators/iq";
export { validateIE } from "./validators/ie";
export { validateCH } from "./validators/ch";
export { validateAT } from "./validators/at";
export { validateBE } from "./validators/be";
export { validateDK } from "./validators/dk";
export { validateFI } from "./validators/fi";
export { validateHU } from "./validators/hu";
export { validateCZ } from "./validators/cz";
export { validateHR } from "./validators/hr";
export { validateRO } from "./validators/ro";
export { validateBA } from "./validators/ba";
export { validateAL } from "./validators/al";
export { validateME } from "./validators/me";
export { validateGE } from "./validators/ge";
export { validateAM } from "./validators/am";
export { validateKE } from "./validators/ke";
export { validateUG } from "./validators/ug";
export { validateSN } from "./validators/sn";
export { validateAO } from "./validators/ao";
export { validateZA } from "./validators/za";
export { validateMV } from "./validators/mv";
export { validateTH } from "./validators/th";
export { validateMY } from "./validators/my";
export { validateNP } from "./validators/np";
export { validateLK } from "./validators/lk";
export { validateHK } from "./validators/hk";
export { validateUZ } from "./validators/uz";
export { validateKG } from "./validators/kg";
export { validateAF } from "./validators/af";
export { validateCY } from "./validators/cy";
export { validateRU } from "./validators/ru";
export { validatePH } from "./validators/ph";

