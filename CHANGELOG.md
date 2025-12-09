# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.1] - 2025-12-09

### Changed
- Added support link (Buy Me a Coffee) to README and documentation
- Updated README header with support badge
- Added dedicated Support section to README

## [1.3.0] - 2025-12-09

### Added - Major Asian Markets 🌏
- 🇯🇵 **Japan (JP)** - Mobile and landline validation (070/080/090 for mobile, area codes for landline)
- 🇨🇳 **China (CN)** - Mobile and landline validation (13x-19x for mobile, area codes for landline)
- 🇰🇷 **South Korea (KR)** - Mobile and landline validation (010 for mobile, area codes for landline)
- 🇸🇬 **Singapore (SG)** - Mobile and landline validation (8/9 for mobile, 6 for landline)
- 🇮🇩 **Indonesia (ID)** - Mobile and landline validation (08x for mobile, area codes for landline)

### Improvements
- Expanded test suite to 150 tests (from 120)
- Added comprehensive tests for all Asian markets
- Enhanced global coverage significantly

### Countries Summary
**Total supported countries: 19** 🚀🌍

**By Region:**
- **Europe (7)**: 🇵🇱 PL, 🇬🇧 GB, 🇫🇷 FR, 🇩🇪 DE, 🇪🇸 ES, 🇮🇹 IT, 🇳🇱 NL
- **North America (2)**: 🇺🇸 US, 🇨🇦 CA
- **Middle East (3)**: 🇸🇦 SA, 🇦🇪 AE, 🇪🇬 EG
- **Asia-Pacific (7)**: 🇮🇳 IN, 🇦🇺 AU, 🇯🇵 JP ⭐, 🇨🇳 CN ⭐, 🇰🇷 KR ⭐, 🇸🇬 SG ⭐, 🇮🇩 ID ⭐

**Market Coverage:**
- **Population covered**: 3+ billion people
- **Major tech hubs**: All covered (JP, KR, SG, IN, DE, GB, US)
- **Largest markets**: China, India, USA, Indonesia

## [1.2.0] - 2025-12-09

### Added - New Countries 🌍
- 🇦🇪 **UAE (AE)** - Mobile and landline validation
- 🇪🇬 **Egypt (EG)** - Mobile and landline validation
- 🇪🇸 **Spain (ES)** - Mobile and landline validation
- 🇮🇹 **Italy (IT)** - Mobile and landline validation
- 🇳🇱 **Netherlands (NL)** - Mobile and landline validation

### Improvements - Landline Support 📞
- **All validators now support both mobile AND landline numbers!**
- 🇵🇱 Poland: Added landline support (area codes 1-3)
- 🇬🇧 UK: Added landline support (01, 02, 03 area codes)
- 🇩🇪 Germany: Added landline support (variable length area codes)
- 🇮🇳 India: Added landline support (area codes for major cities)
- 🇦🇺 Australia: Added landline support (02, 03, 07, 08 area codes)
- 🇸🇦 Saudi Arabia: Added landline support (011-017 area codes)
- 🇦🇪 UAE: Added landline support (2-9 area codes)
- 🇪🇬 Egypt: Added landline support (02-09 area codes)
- 🇪🇸 Spain: Added landline support (8-9 prefixes)
- 🇮🇹 Italy: Added landline support (0x area codes)
- 🇳🇱 Netherlands: Added landline support (01-05 area codes)

### Testing
- Expanded test suite to 120 tests (from 82)
- Added comprehensive tests for both mobile and landline numbers
- Enhanced Middle East coverage
- Enhanced European coverage

### Countries Summary
**Total supported countries: 14** 🚀
- **Europe (7)**: 🇵🇱 Poland, 🇬🇧 UK, 🇫🇷 France, 🇩🇪 Germany, 🇪🇸 Spain, 🇮🇹 Italy, 🇳🇱 Netherlands
- **North America (2)**: 🇺🇸 USA, 🇨🇦 Canada
- **Middle East (3)**: 🇸🇦 Saudi Arabia, 🇦🇪 UAE, 🇪🇬 Egypt
- **Asia-Pacific (2)**: 🇮🇳 India, 🇦🇺 Australia

## [1.1.0] - 2025-12-09

### Added - New Countries 🆕

- 🇫🇷 **France (FR)** - Mobile and landline validation (06/07 for mobile, 01-05 for landline)
- 🇩🇪 **Germany (DE)** - Mobile numbers validation (015x, 016x, 017x prefixes)
- 🇮🇳 **India (IN)** - Mobile numbers validation (6-9 prefix, 10 digits)
- 🇨🇦 **Canada (CA)** - NANP validation (same rules as US)
- 🇦🇺 **Australia (AU)** - Mobile numbers validation (04 prefix)

### Improvements

- Expanded test suite to 82 tests (from 50)
- Added comprehensive tests for all new countries
- Improved documentation for international format handling

### Countries Summary

**Total supported countries: 9**

- 🇵🇱 Poland, 🇺🇸 United States, 🇬🇧 United Kingdom, 🇸🇦 Saudi Arabia
- 🇫🇷 France, 🇩🇪 Germany, 🇮🇳 India, 🇨🇦 Canada, 🇦🇺 Australia

## [1.0.0] - 2025-12-09

### Added - New Countries 🌍

- 🇵🇱 **Poland (PL)** - Mobile numbers validation (4-8 prefix)
- 🇺🇸 **United States (US)** - NANP validation with area code rules
- 🇬🇧 **United Kingdom (GB)** - Mobile numbers validation (07x prefix, excluding 070)
- 🇸🇦 **Saudi Arabia (SA)** - Mobile numbers validation (050, 053-056, 058-059 prefixes)

### Added - Core Features

- **Generic validator** for countries without specific rules (E.164 standard)
- **`validatePhoneWithFallback()`** function with automatic fallback to generic validation
- **Strict mode** option for type-safe validation only
- Full TypeScript support with strict typing
- Tree-shakeable exports for optimal bundle size
- ESM and CommonJS support
- Zero runtime dependencies
- International format support (+country code)

### Added - Validation Rules

- Country-specific prefix validation based on real telecommunication standards
- International format handling (e.g., +48, +44, +1, +966)
- Format normalization (strips spaces, dashes, parentheses)
- Length validation per country
- Special number exclusion (e.g., 070 for UK, 9xx for Poland)

### Added - Developer Experience

- Comprehensive test suite with Vitest (50+ tests)
- Complete documentation (README, CONTRIBUTING, QUICK_REFERENCE)
- JSDoc comments for all public APIs
- ESLint + Prettier configuration
- TypeScript type definitions included
- Example usage for all validators

### Technical Details

- **Bundle Size**: ~2KB (minified)
- **Test Coverage**: 100% of validators
- **TypeScript**: Strict mode enabled
- **Node.js**: >=16 required
- **Package Exports**: Properly configured for types, import, require

[1.3.1]: https://github.com/BieganskiP/phonyjs/releases/tag/v1.3.1
[1.3.0]: https://github.com/BieganskiP/phonyjs/releases/tag/v1.3.0
[1.2.0]: https://github.com/BieganskiP/phonyjs/releases/tag/v1.2.0
[1.1.0]: https://github.com/BieganskiP/phonyjs/releases/tag/v1.1.0
[1.0.0]: https://github.com/BieganskiP/phonyjs/releases/tag/v1.0.0
