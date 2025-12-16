import { PhoneValidator } from "../types";
import { validatePL } from "./europe/pl";
import { validateGB } from "./europe/gb";
import { validateFR } from "./europe/fr";
import { validateDE } from "./europe/de";
import { validateES } from "./europe/es";
import { validateIT } from "./europe/it";
import { validateNL } from "./europe/nl";
import { validateCH } from "./europe/ch";
import { validateAT } from "./europe/at";
import { validateBE } from "./europe/be";
import { validateIE } from "./europe/ie";
import { validateGR } from "./europe/gr";
import { validateTR } from "./europe/tr";
import { validateDK } from "./europe/dk";
import { validateFI } from "./europe/fi";
import { validateHU } from "./europe/hu";
import { validateCZ } from "./europe/cz";
import { validateHR } from "./europe/hr";
import { validateRO } from "./europe/ro";
import { validateBA } from "./europe/ba";
import { validateAL } from "./europe/al";
import { validateME } from "./europe/me";
import { validateGE } from "./europe/ge";
import { validateAM } from "./europe/am";
import { validateRU } from "./europe/ru";
import { validateCY } from "./europe/cy";
import { validatePT } from "./europe/pt";
import { validateSE } from "./europe/se";
import { validateNO } from "./europe/no";
import { validateUA } from "./europe/ua";
import { validateBG } from "./europe/bg";
import { validateSK } from "./europe/sk";
import { validateSI } from "./europe/si";
import { validateEE } from "./europe/ee";
import { validateLV } from "./europe/lv";
import { validateLT } from "./europe/lt";
import { validateLU } from "./europe/lu";
import { validateMT } from "./europe/mt";
import { validateIS } from "./europe/is";
import { validateRS } from "./europe/rs";
import { validateBY } from "./europe/by";
import { validateMD } from "./europe/md";
import { validateMK } from "./europe/mk";
import { validateAZ } from "./europe/az";
import { validateMC } from "./europe/mc";
import { validateLI } from "./europe/li";
import { validateSM } from "./europe/sm";
import { validateAD } from "./europe/ad";
import { validateVA } from "./europe/va";
import { validateXK } from "./europe/xk";
import { validateKZ } from "./europe/kz";
import { validateUS } from "./americas/us";
import { validateCA } from "./americas/ca";
import { validateSA } from "./middle-east/sa";
import { validateAE } from "./middle-east/ae";
import { validateEG } from "./middle-east/eg";
import { validateQA } from "./middle-east/qa";
import { validateKW } from "./middle-east/kw";
import { validateBH } from "./middle-east/bh";
import { validateOM } from "./middle-east/om";
import { validateJO } from "./middle-east/jo";
import { validateYE } from "./middle-east/ye";
import { validateLB } from "./middle-east/lb";
import { validateIQ } from "./middle-east/iq";
import { validateSD } from "./middle-east/sd";
import { validateIR } from "./middle-east/ir";
import { validateIL } from "./middle-east/il";
import { validatePS } from "./middle-east/ps";
import { validateSY } from "./middle-east/sy";
import { validateIN } from "./asia-pacific/in";
import { validatePK } from "./asia-pacific/pk";
import { validateCN } from "./asia-pacific/cn";
import { validateJP } from "./asia-pacific/jp";
import { validateKR } from "./asia-pacific/kr";
import { validateSG } from "./asia-pacific/sg";
import { validateID } from "./asia-pacific/id";
import { validatePH } from "./asia-pacific/ph";
import { validateTH } from "./asia-pacific/th";
import { validateMY } from "./asia-pacific/my";
import { validateNP } from "./asia-pacific/np";
import { validateLK } from "./asia-pacific/lk";
import { validateHK } from "./asia-pacific/hk";
import { validateUZ } from "./asia-pacific/uz";
import { validateKG } from "./asia-pacific/kg";
import { validateAF } from "./asia-pacific/af";
import { validateAU } from "./asia-pacific/au";
import { validateMV } from "./asia-pacific/mv";
import { validateNZ } from "./asia-pacific/nz";
import { validateVN } from "./asia-pacific/vn";
import { validateBD } from "./asia-pacific/bd";
import { validateTW } from "./asia-pacific/tw";
import { validateFJ } from "./asia-pacific/fj";
import { validateMM } from "./asia-pacific/mm";
import { validateKH } from "./asia-pacific/kh";
import { validateLA } from "./asia-pacific/la";
import { validatePG } from "./asia-pacific/pg";
import { validateBN } from "./asia-pacific/bn";
import { validateMN } from "./asia-pacific/mn";
import { validateMO } from "./asia-pacific/mo";
import { validateBT } from "./asia-pacific/bt";
import { validateTL } from "./asia-pacific/tl";
import { validateWS } from "./asia-pacific/ws";
import { validateTO } from "./asia-pacific/to";
import { validateVU } from "./asia-pacific/vu";
import { validateSB } from "./asia-pacific/sb";
import { validateZA } from "./africa/za";
import { validateKE } from "./africa/ke";
import { validateUG } from "./africa/ug";
import { validateSN } from "./africa/sn";
import { validateAO } from "./africa/ao";
import { validateGeneric } from "./generic";

/**
 * Registry of all available phone validators.
 *
 * This object uses TypeScript's `satisfies` keyword to ensure:
 * - All validators conform to the PhoneValidator type
 * - Type inference works automatically for country codes
 * - No manual maintenance of country code types needed
 *
 * To add a new country:
 * 1. Create a new file (e.g., de.ts) with a validator function in the appropriate continent folder
 * 2. Import it here
 * 3. Add it to the validators object below
 *
 * TypeScript will automatically update the AvailableCountryCode type.
 */
export const validators = {
  pl: validatePL,
  us: validateUS,
  gb: validateGB,
  sa: validateSA,
  fr: validateFR,
  de: validateDE,
  in: validateIN,
  ca: validateCA,
  au: validateAU,
  ae: validateAE,
  eg: validateEG,
  es: validateES,
  it: validateIT,
  nl: validateNL,
  jp: validateJP,
  cn: validateCN,
  kr: validateKR,
  sg: validateSG,
  id: validateID,
  tr: validateTR,
  pk: validatePK,
  gr: validateGR,
  sd: validateSD,
  om: validateOM,
  qa: validateQA,
  kw: validateKW,
  bh: validateBH,
  jo: validateJO,
  ye: validateYE,
  lb: validateLB,
  iq: validateIQ,
  ie: validateIE,
  ch: validateCH,
  at: validateAT,
  be: validateBE,
  dk: validateDK,
  fi: validateFI,
  hu: validateHU,
  cz: validateCZ,
  hr: validateHR,
  ro: validateRO,
  ba: validateBA,
  al: validateAL,
  me: validateME,
  ge: validateGE,
  am: validateAM,
  ke: validateKE,
  ug: validateUG,
  sn: validateSN,
  ao: validateAO,
  za: validateZA,
  mv: validateMV,
  th: validateTH,
  my: validateMY,
  np: validateNP,
  lk: validateLK,
  hk: validateHK,
  uz: validateUZ,
  kg: validateKG,
  af: validateAF,
  cy: validateCY,
  ru: validateRU,
  ph: validatePH,
  pt: validatePT,
  se: validateSE,
  no: validateNO,
  ua: validateUA,
  bg: validateBG,
  sk: validateSK,
  si: validateSI,
  ee: validateEE,
  lv: validateLV,
  lt: validateLT,
  lu: validateLU,
  mt: validateMT,
  is: validateIS,
  rs: validateRS,
  by: validateBY,
  md: validateMD,
  mk: validateMK,
  az: validateAZ,
  mc: validateMC,
  li: validateLI,
  sm: validateSM,
  ad: validateAD,
  va: validateVA,
  xk: validateXK,
  kz: validateKZ,
  ir: validateIR,
  il: validateIL,
  ps: validatePS,
  sy: validateSY,
  nz: validateNZ,
  vn: validateVN,
  bd: validateBD,
  tw: validateTW,
  fj: validateFJ,
  mm: validateMM,
  kh: validateKH,
  la: validateLA,
  pg: validatePG,
  bn: validateBN,
  mn: validateMN,
  mo: validateMO,
  bt: validateBT,
  tl: validateTL,
  ws: validateWS,
  to: validateTO,
  vu: validateVU,
  sb: validateSB,
} satisfies Record<string, PhoneValidator>;

/**
 * Generic validator used as fallback for countries without specific validators.
 */
export { validateGeneric };

/**
 * Automatically inferred type of all available country codes.
 * This type is derived from the keys of the validators object,
 * so it's always in sync with the actual validators.
 */
export type AvailableCountryCode = keyof typeof validators;
