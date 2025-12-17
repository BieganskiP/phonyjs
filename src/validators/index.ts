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
import { validateUS } from "./north-america/us";
import { validateCA } from "./north-america/ca";
import { validateSA } from "./asia/sa";
import { validateAE } from "./asia/ae";
import { validateQA } from "./asia/qa";
import { validateKW } from "./asia/kw";
import { validateBH } from "./asia/bh";
import { validateOM } from "./asia/om";
import { validateJO } from "./asia/jo";
import { validateYE } from "./asia/ye";
import { validateLB } from "./asia/lb";
import { validateIQ } from "./asia/iq";
import { validateIR } from "./asia/ir";
import { validateIL } from "./asia/il";
import { validatePS } from "./asia/ps";
import { validateSY } from "./asia/sy";
import { validateKP } from "./asia/kp";
import { validateTJ } from "./asia/tj";
import { validateTM } from "./asia/tm";
import { validateIN } from "./asia/in";
import { validatePK } from "./asia/pk";
import { validateCN } from "./asia/cn";
import { validateJP } from "./asia/jp";
import { validateKR } from "./asia/kr";
import { validateSG } from "./asia/sg";
import { validateID } from "./asia/id";
import { validatePH } from "./asia/ph";
import { validateTH } from "./asia/th";
import { validateMY } from "./asia/my";
import { validateNP } from "./asia/np";
import { validateLK } from "./asia/lk";
import { validateHK } from "./asia/hk";
import { validateUZ } from "./asia/uz";
import { validateKG } from "./asia/kg";
import { validateAF } from "./asia/af";
import { validateMV } from "./asia/mv";
import { validateVN } from "./asia/vn";
import { validateBD } from "./asia/bd";
import { validateTW } from "./asia/tw";
import { validateMM } from "./asia/mm";
import { validateKH } from "./asia/kh";
import { validateLA } from "./asia/la";
import { validateBN } from "./asia/bn";
import { validateMN } from "./asia/mn";
import { validateMO } from "./asia/mo";
import { validateBT } from "./asia/bt";
import { validateTL } from "./asia/tl";
import { validateAU } from "./oceania/au";
import { validateNZ } from "./oceania/nz";
import { validateFJ } from "./oceania/fj";
import { validatePG } from "./oceania/pg";
import { validateSB } from "./oceania/sb";
import { validateTO } from "./oceania/to";
import { validateVU } from "./oceania/vu";
import { validateWS } from "./oceania/ws";
import { validateKI } from "./oceania/ki";
import { validateMH } from "./oceania/mh";
import { validateFM } from "./oceania/fm";
import { validateNR } from "./oceania/nr";
import { validatePW } from "./oceania/pw";
import { validateTV } from "./oceania/tv";
import { validateZA } from "./africa/za";
import { validateKE } from "./africa/ke";
import { validateUG } from "./africa/ug";
import { validateSN } from "./africa/sn";
import { validateAO } from "./africa/ao";
import { validateEG } from "./africa/eg";
import { validateSD } from "./africa/sd";
import { validateDZ } from "./africa/dz";
import { validateLY } from "./africa/ly";
import { validateMA } from "./africa/ma";
import { validateTN } from "./africa/tn";
import { validateBJ } from "./africa/bj";
import { validateBF } from "./africa/bf";
import { validateCV } from "./africa/cv";
import { validateCI } from "./africa/ci";
import { validateGM } from "./africa/gm";
import { validateGH } from "./africa/gh";
import { validateGN } from "./africa/gn";
import { validateGW } from "./africa/gw";
import { validateLR } from "./africa/lr";
import { validateML } from "./africa/ml";
import { validateMR } from "./africa/mr";
import { validateNE } from "./africa/ne";
import { validateNG } from "./africa/ng";
import { validateSL } from "./africa/sl";
import { validateTG } from "./africa/tg";
import { validateCM } from "./africa/cm";
import { validateCF } from "./africa/cf";
import { validateTD } from "./africa/td";
import { validateCG } from "./africa/cg";
import { validateCD } from "./africa/cd";
import { validateGQ } from "./africa/gq";
import { validateGA } from "./africa/ga";
import { validateST } from "./africa/st";
import { validateKM } from "./africa/km";
import { validateDJ } from "./africa/dj";
import { validateER } from "./africa/er";
import { validateET } from "./africa/et";
import { validateMG } from "./africa/mg";
import { validateMU } from "./africa/mu";
import { validateRW } from "./africa/rw";
import { validateSC } from "./africa/sc";
import { validateSO } from "./africa/so";
import { validateSS } from "./africa/ss";
import { validateTZ } from "./africa/tz";
import { validateBW } from "./africa/bw";
import { validateLS } from "./africa/ls";
import { validateMW } from "./africa/mw";
import { validateMZ } from "./africa/mz";
import { validateNA } from "./africa/na";
import { validateZM } from "./africa/zm";
import { validateZW } from "./africa/zw";
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
  eg: validateEG,
  sd: validateSD,
  dz: validateDZ,
  ly: validateLY,
  ma: validateMA,
  tn: validateTN,
  bj: validateBJ,
  bf: validateBF,
  cv: validateCV,
  ci: validateCI,
  gm: validateGM,
  gh: validateGH,
  gn: validateGN,
  gw: validateGW,
  lr: validateLR,
  ml: validateML,
  mr: validateMR,
  ne: validateNE,
  ng: validateNG,
  sl: validateSL,
  tg: validateTG,
  cm: validateCM,
  cf: validateCF,
  td: validateTD,
  cg: validateCG,
  cd: validateCD,
  gq: validateGQ,
  ga: validateGA,
  st: validateST,
  km: validateKM,
  dj: validateDJ,
  er: validateER,
  et: validateET,
  mg: validateMG,
  mu: validateMU,
  rw: validateRW,
  sc: validateSC,
  so: validateSO,
  ss: validateSS,
  tz: validateTZ,
  bw: validateBW,
  ls: validateLS,
  mw: validateMW,
  mz: validateMZ,
  na: validateNA,
  zm: validateZM,
  zw: validateZW,
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
  kp: validateKP,
  tj: validateTJ,
  tm: validateTM,
  ki: validateKI,
  mh: validateMH,
  fm: validateFM,
  nr: validateNR,
  pw: validatePW,
  tv: validateTV,
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
