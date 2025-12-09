# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.1.0]: https://github.com/BieganskiP/phonyjs/releases/tag/v1.1.0
[1.0.0]: https://github.com/BieganskiP/phonyjs/releases/tag/v1.0.0
