# PhonyJS v1.3.0 - Major Asian Markets 🌏

**Released**: December 9, 2025  
**Focus**: Massive geographic expansion with 5 major Asian markets

## 🎯 What's New

### Added 5 Major Asian Countries

We've added comprehensive support for the largest and most influential markets in Asia:

- 🇯🇵 **Japan (JP)** - 125M people, major tech hub
- 🇨🇳 **China (CN)** - 1.4B people, world's largest market
- 🇰🇷 **South Korea (KR)** - Major tech innovation center
- 🇸🇬 **Singapore (SG)** - Leading business hub
- 🇮🇩 **Indonesia (ID)** - 270M people, fastest-growing market

### Coverage Impact

With this release, PhonyJS now supports:
- **19 countries** across 4 continents
- **3+ billion people** globally
- All major tech hubs worldwide
- The world's 3 largest markets (China, India, USA)

## 📊 Stats

- **Countries**: 19 (from 14) - +35% growth
- **Tests**: 150 (from 120) - 100% passing ✅
- **Bundle Size**: 6.35 KB ESM (from 4.51 KB) - still tiny!
- **Zero Breaking Changes**: Fully backward compatible

### Regional Breakdown

| Region | Countries | New in v1.3.0 |
|--------|-----------|---------------|
| **Europe** | 7 | - |
| **North America** | 2 | - |
| **Middle East** | 3 | - |
| **Asia-Pacific** | 7 | 🆕 5 countries |

## 🚀 Usage Examples

### Japan (JP)

```typescript
import { validatePhone, validateJP } from "phonyjs";

// Mobile numbers (070/080/090)
validatePhone("jp", "090 1234 5678"); // ✅ true
validateJP("080-1234-5678"); // ✅ true

// Landline numbers
validatePhone("jp", "03 1234 5678"); // ✅ true (Tokyo)
validateJP("06-1234-5678"); // ✅ true (Osaka)

// International format
validateJP("+81 90 1234 5678"); // ✅ true
validateJP("+81 3 1234 5678"); // ✅ true
```

### China (CN)

```typescript
import { validatePhone, validateCN } from "phonyjs";

// Mobile numbers (13x-19x)
validatePhone("cn", "138 0013 8000"); // ✅ true
validateCN("159-1234-5678"); // ✅ true

// Landline numbers
validatePhone("cn", "010 1234 5678"); // ✅ true (Beijing)
validateCN("021-1234-5678"); // ✅ true (Shanghai)

// International format
validateCN("+86 138 0013 8000"); // ✅ true
validateCN("+86 10 1234 5678"); // ✅ true
```

### South Korea (KR)

```typescript
import { validatePhone, validateKR } from "phonyjs";

// Mobile numbers (010)
validatePhone("kr", "010 1234 5678"); // ✅ true
validateKR("010-123-4567"); // ✅ true

// Landline numbers
validatePhone("kr", "02 1234 5678"); // ✅ true (Seoul)
validateKR("031-123-4567"); // ✅ true (Gyeonggi)

// International format
validateKR("+82 10 1234 5678"); // ✅ true
validateKR("+82 2 1234 5678"); // ✅ true
```

### Singapore (SG)

```typescript
import { validatePhone, validateSG } from "phonyjs";

// Mobile numbers (8/9)
validatePhone("sg", "8123 4567"); // ✅ true
validateSG("9123-4567"); // ✅ true

// Landline numbers (6)
validatePhone("sg", "6123 4567"); // ✅ true

// International format
validateSG("+65 8123 4567"); // ✅ true
validateSG("+65 6123 4567"); // ✅ true
```

### Indonesia (ID)

```typescript
import { validatePhone, validateID } from "phonyjs";

// Mobile numbers (08x)
validatePhone("id", "0812 3456 7890"); // ✅ true
validateID("0856-1234-5678"); // ✅ true (Indosat)

// Landline numbers
validatePhone("id", "021 1234 5678"); // ✅ true (Jakarta)
validateID("022-1234-5678"); // ✅ true (Bandung)

// International format
validateID("+62 812 3456 7890"); // ✅ true
validateID("+62 21 1234 5678"); // ✅ true
```

## 📋 Validation Rules

### Japan (JP)
- **Mobile**: 11 digits, starting with 070, 080, or 090
- **Landline**: 10 digits with area codes (e.g., 03-Tokyo, 06-Osaka)
- **International**: +81 (drops leading 0)

### China (CN)
- **Mobile**: 11 digits, starting with 13, 14, 15, 16, 17, 18, or 19
- **Landline**: 10-12 digits with area codes (e.g., 010-Beijing, 021-Shanghai)
- **International**: +86

### South Korea (KR)
- **Mobile**: 10-11 digits, starting with 010
- **Landline**: 9-10 digits with area codes (e.g., 02-Seoul, 051-Busan)
- **International**: +82

### Singapore (SG)
- **Mobile**: 8 digits, starting with 8 or 9
- **Landline**: 8 digits, starting with 6
- **International**: +65

### Indonesia (ID)
- **Mobile**: 10-13 digits, starting with 08
- **Landline**: 9-11 digits with area codes (e.g., 021-Jakarta, 031-Surabaya)
- **International**: +62

## 🎨 Features

All new validators include:
- ✅ **Mobile & Landline** support
- ✅ **International format** handling (+country code)
- ✅ **Flexible formatting** (spaces, dashes, parentheses)
- ✅ **Strict validation** rules per country standards
- ✅ **Full TypeScript** types and autocomplete
- ✅ **Comprehensive tests** (6+ tests per country)

## 🔄 Migration Guide

**No migration needed!** This is a fully backward-compatible release.

Simply update your package:

```bash
npm update phonyjs
```

And start using the new countries:

```typescript
import { validatePhone } from "phonyjs";

// New countries available immediately
validatePhone("jp", "090 1234 5678"); // ✅
validatePhone("cn", "138 0013 8000"); // ✅
validatePhone("kr", "010 1234 5678"); // ✅
validatePhone("sg", "8123 4567"); // ✅
validatePhone("id", "0812 3456 7890"); // ✅
```

## 📦 Bundle Size

Despite adding 5 countries, the bundle remains tiny:

| Format | Size | Comparison |
|--------|------|------------|
| **ESM** | 6.35 KB | +1.84 KB (still very small) |
| **CJS** | 6.84 KB | +1.93 KB |
| **Types** | 2.00 KB | No change |

**Tree-shaking**: Import only what you need to minimize bundle impact!

```typescript
// Only adds ~300 bytes per validator
import { validateJP, validateCN } from "phonyjs";
```

## 🌍 Global Coverage

### By Population
1. 🇨🇳 China - 1.4B
2. 🇮🇳 India - 1.4B
3. 🇺🇸 USA - 330M
4. 🇮🇩 Indonesia - 270M
5. 🇯🇵 Japan - 125M

**Combined coverage: 3.5+ billion people** 🎉

### By Tech Influence
All major tech hubs now covered:
- 🇺🇸 Silicon Valley
- 🇬🇧 London Tech City
- 🇩🇪 Berlin Tech Scene
- 🇯🇵 Tokyo Tech Hub
- 🇰🇷 Seoul (Samsung, LG)
- 🇸🇬 Singapore FinTech
- 🇮🇳 Bangalore
- 🇨🇳 Shenzhen/Beijing

## 🔮 What's Next?

### Upcoming Batches (in order):

1. **Latin America** (v1.4.0) 🇧🇷 🇲🇽 🇦🇷 🇨🇴 🇨🇱
2. **Nordic Countries** (v1.5.0) 🇸🇪 🇳🇴 🇩🇰 🇫🇮
3. **Southeast Asia** (v1.6.0) 🇹🇭 🇵🇭 🇻🇳 🇲🇾

### Feature Roadmap
- Phone number formatting utilities
- Phone number parsing
- Carrier detection
- Region identification

## 🙏 Thank You

Thank you for using PhonyJS! If you find it useful, please:
- ⭐ [Star on GitHub](https://github.com/BieganskiP/phonyjs)
- 📦 [Review on NPM](https://www.npmjs.com/package/phonyjs)
- ☕ [Buy me a coffee](https://buycoffee.to/pbieganski) - Support development
- 🐛 [Report issues](https://github.com/BieganskiP/phonyjs/issues)
- 💡 [Suggest features](https://github.com/BieganskiP/phonyjs/issues/new)

## 📚 Resources

- **GitHub**: [github.com/BieganskiP/phonyjs](https://github.com/BieganskiP/phonyjs)
- **NPM**: [npmjs.com/package/phonyjs](https://www.npmjs.com/package/phonyjs)
- **Documentation**: [github.com/BieganskiP/phonyjs#readme](https://github.com/BieganskiP/phonyjs#readme)
- **Issues**: [github.com/BieganskiP/phonyjs/issues](https://github.com/BieganskiP/phonyjs/issues)

## 👨‍💻 Author

**Patryk Biegański**
- GitHub: [@BieganskiP](https://github.com/BieganskiP)
- LinkedIn: [in/patrykbieganski](https://www.linkedin.com/in/patrykbieganski)

---

**Full Changelog**: [v1.2.0...v1.3.0](https://github.com/BieganskiP/phonyjs/compare/v1.2.0...v1.3.0)

