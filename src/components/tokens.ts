/**
 * Bolt Delivery Design Tokens
 * Extracted from @bolteu/design-tokens (BoltFood product theme)
 */

// ---------------------------------------------------------------------------
// Colors (Light Mode)
// ---------------------------------------------------------------------------
export const C = {
  // Layers / Surfaces
  floor0: '#FFFFFF',
  floor0Grouped: '#EEF1F0',
  floor1: '#FFFFFF',
  floor2: '#FFFFFF',
  floor3: '#FFFFFF',
  surface: 'rgba(0,45,30,0.07)',
  scrim: 'rgba(0,0,0,0.28)',

  // Special
  bgDisabled: 'rgba(0,45,30,0.07)',
  bgZebra: 'rgba(0,64,32,0.03)',
  brand: '#2A9C64',
  brandAlt: '#0C2C1C',

  // Content (text & icons)
  primary: '#191F1C',
  secondary: 'rgba(0,10,7,0.63)',
  tertiary: 'rgba(0,17,11,0.47)',
  actionPrimary: 'rgba(0,112,66,0.92)',
  actionSecondary: 'rgba(0,110,55,0.83)',
  dangerPrimary: 'rgba(173,0,14,0.94)',
  dangerSecondary: 'rgba(218,0,18,0.9)',
  warningPrimary: 'rgba(158,91,0,1)',
  promoPrimary: 'rgba(56,4,215,0.94)',
  promoSecondary: 'rgba(0,20,237,0.65)',
  primaryInverted: 'rgba(253,255,254,0.93)',
  secondaryInverted: 'rgba(244,254,249,0.69)',
  actionPrimaryInverted: 'rgba(116,239,170,1)',

  // Backgrounds (component fills)
  bgActionPrimary: '#2B8659',
  bgActionSecondary: 'rgba(0,160,64,0.09)',
  bgNeutralPrimary: '#0E1010',
  bgNeutralSecondary: 'rgba(0,45,30,0.07)',
  bgNeutralSecondaryHard: 'rgba(0,20,13,0.16)',
  bgDangerPrimary: '#DE1929',
  bgDangerSecondary: 'rgba(255,0,0,0.08)',
  bgWarningPrimary: '#FFB200',
  bgWarningSecondary: '#FFF0C4',
  bgPositivePrimary: '#2B8659',
  bgPositiveSecondary: 'rgba(0,160,64,0.09)',
  bgPromoPrimary: '#5966F3',
  bgPromoSecondary: 'rgba(0,60,255,0.07)',

  // Active / Pressed
  bgActiveActionPrimary: '#18784C',
  bgActiveNeutralPrimary: '#161A18',
  bgActiveNeutralSecondary: 'rgba(0,31,24,0.13)',
  bgActiveActionSecondary: 'rgba(0,144,56,0.22)',
  bgActiveDangerPrimary: '#CE0019',
  bgActivePromoPrimary: '#4F5BDA',
  bgActiveWarningPrimary: '#C89200',

  // Borders
  separator: 'rgba(0,45,30,0.07)',
  borderNeutralPrimary: 'rgba(0,17,11,0.47)',
  borderNeutralSecondary: 'rgba(0,20,13,0.16)',
  borderActionPrimary: '#2B8659',
  borderActionSecondary: 'rgba(1,133,52,0.29)',
  borderDangerPrimary: '#DE1929',
  borderPromoPrimary: '#5966F3',

  // Bolt Plus
  boltPlusBg: '#0C2C1C',

  // Static (mode-independent)
  staticKeyDark: '#000000',
  staticPrimaryDark: '#191F1C',
  staticSecondaryDark: 'rgba(0,10,7,0.63)',
  staticKeyLight: '#FFFFFF',
  staticPrimaryLight: '#ECEEEB',
  staticSecondaryLight: 'rgba(244,254,249,0.69)',
  staticBgKeyLight: '#FFFFFF',
  staticBgKeyDark: '#000000',
  staticBgNeutralPrimaryDark: '#202221',
} as const;

// ---------------------------------------------------------------------------
// Layout Constants
// ---------------------------------------------------------------------------
export const DEFAULT_BORDER_RADIUS = 8;
export const SCREEN_PADDING_H = 24;
export const SCREEN_PADDING_V = 16;

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------
const FONT_REGULAR = '400' as const;
const FONT_ACCENT = '600' as const;

const OT_BASE = {
  fontFamily: 'System',
  // Use system font (San Francisco on iOS, Roboto on Android).
  // InterVariable is not bundled — 'System' avoids serif fallback on web.
};

export const F = {
  // Headings — Accent only (except XS which has Regular)
  Heading2XL: { ...OT_BASE, fontSize: 48, lineHeight: 60, letterSpacing: -0.022 * 48, fontWeight: FONT_ACCENT },
  HeadingXL: { ...OT_BASE, fontSize: 40, lineHeight: 48, letterSpacing: -0.022 * 40, fontWeight: FONT_ACCENT },
  HeadingL: { ...OT_BASE, fontSize: 36, lineHeight: 44, letterSpacing: -0.022 * 36, fontWeight: FONT_ACCENT },
  HeadingM: { ...OT_BASE, fontSize: 28, lineHeight: 36, letterSpacing: -0.020 * 28, fontWeight: FONT_ACCENT },
  HeadingS: { ...OT_BASE, fontSize: 24, lineHeight: 30, letterSpacing: -0.019 * 24, fontWeight: FONT_ACCENT },
  HeadingXSAccent: { ...OT_BASE, fontSize: 20, lineHeight: 25, letterSpacing: -0.017 * 20, fontWeight: FONT_ACCENT },
  HeadingXSRegular: { ...OT_BASE, fontSize: 20, lineHeight: 25, letterSpacing: -0.017 * 20, fontWeight: FONT_REGULAR },

  // Body
  BodyLRegular: { ...OT_BASE, fontSize: 18, lineHeight: 24, letterSpacing: -0.014 * 18, fontWeight: FONT_REGULAR },
  BodyLAccent: { ...OT_BASE, fontSize: 18, lineHeight: 24, letterSpacing: -0.014 * 18, fontWeight: FONT_ACCENT },
  BodyLCompactRegular: { ...OT_BASE, fontSize: 18, lineHeight: 22, letterSpacing: -0.014 * 18, fontWeight: FONT_REGULAR },
  BodyLCompactAccent: { ...OT_BASE, fontSize: 18, lineHeight: 22, letterSpacing: -0.014 * 18, fontWeight: FONT_ACCENT },

  BodyMRegular: { ...OT_BASE, fontSize: 16, lineHeight: 24, letterSpacing: -0.011 * 16, fontWeight: FONT_REGULAR },
  BodyMAccent: { ...OT_BASE, fontSize: 16, lineHeight: 24, letterSpacing: -0.011 * 16, fontWeight: FONT_ACCENT },
  BodyMCompactRegular: { ...OT_BASE, fontSize: 16, lineHeight: 20, letterSpacing: -0.011 * 16, fontWeight: FONT_REGULAR },
  BodyMCompactAccent: { ...OT_BASE, fontSize: 16, lineHeight: 20, letterSpacing: -0.011 * 16, fontWeight: FONT_ACCENT },

  BodySRegular: { ...OT_BASE, fontSize: 14, lineHeight: 20, letterSpacing: -0.006 * 14, fontWeight: FONT_REGULAR },
  BodySAccent: { ...OT_BASE, fontSize: 14, lineHeight: 20, letterSpacing: -0.006 * 14, fontWeight: FONT_ACCENT },
  BodySCompactRegular: { ...OT_BASE, fontSize: 14, lineHeight: 18, letterSpacing: -0.006 * 14, fontWeight: FONT_REGULAR },
  BodySCompactAccent: { ...OT_BASE, fontSize: 14, lineHeight: 18, letterSpacing: -0.006 * 14, fontWeight: FONT_ACCENT },

  BodyXSRegular: { ...OT_BASE, fontSize: 12, lineHeight: 16, letterSpacing: 0, fontWeight: FONT_REGULAR },
  BodyXSAccent: { ...OT_BASE, fontSize: 12, lineHeight: 16, letterSpacing: 0, fontWeight: FONT_ACCENT },
  BodyXSCompactRegular: { ...OT_BASE, fontSize: 12, lineHeight: 15, letterSpacing: 0, fontWeight: FONT_REGULAR },
  BodyXSCompactAccent: { ...OT_BASE, fontSize: 12, lineHeight: 15, letterSpacing: 0, fontWeight: FONT_ACCENT },

  Body2XSRegular: { ...OT_BASE, fontSize: 10, lineHeight: 14, letterSpacing: 0.010 * 10, fontWeight: FONT_REGULAR },
  Body2XSAccent: { ...OT_BASE, fontSize: 10, lineHeight: 14, letterSpacing: 0.010 * 10, fontWeight: FONT_ACCENT },
  Body2XSCompactRegular: { ...OT_BASE, fontSize: 10, lineHeight: 12, letterSpacing: 0.010 * 10, fontWeight: FONT_REGULAR },
  Body2XSCompactAccent: { ...OT_BASE, fontSize: 10, lineHeight: 12, letterSpacing: 0.010 * 10, fontWeight: FONT_ACCENT },

  // Tabular (numbers — tnum feature)
  TabularL: { ...OT_BASE, fontSize: 18, lineHeight: 24, letterSpacing: -0.029 * 18, fontWeight: FONT_REGULAR },
  TabularLAccent: { ...OT_BASE, fontSize: 18, lineHeight: 24, letterSpacing: -0.029 * 18, fontWeight: FONT_ACCENT },
  TabularLCompact: { ...OT_BASE, fontSize: 18, lineHeight: 22, letterSpacing: -0.029 * 18, fontWeight: FONT_REGULAR },
  TabularM: { ...OT_BASE, fontSize: 16, lineHeight: 24, letterSpacing: -0.026 * 16, fontWeight: FONT_REGULAR },
  TabularMAccent: { ...OT_BASE, fontSize: 16, lineHeight: 24, letterSpacing: -0.026 * 16, fontWeight: FONT_ACCENT },
  TabularMCompact: { ...OT_BASE, fontSize: 16, lineHeight: 20, letterSpacing: -0.026 * 16, fontWeight: FONT_REGULAR },
  TabularS: { ...OT_BASE, fontSize: 14, lineHeight: 20, letterSpacing: -0.021 * 14, fontWeight: FONT_REGULAR },
  TabularSAccent: { ...OT_BASE, fontSize: 14, lineHeight: 20, letterSpacing: -0.021 * 14, fontWeight: FONT_ACCENT },
  TabularSCompact: { ...OT_BASE, fontSize: 14, lineHeight: 18, letterSpacing: -0.021 * 14, fontWeight: FONT_REGULAR },
  TabularXS: { ...OT_BASE, fontSize: 12, lineHeight: 16, letterSpacing: -0.015 * 12, fontWeight: FONT_REGULAR },
  TabularXSAccent: { ...OT_BASE, fontSize: 12, lineHeight: 16, letterSpacing: -0.015 * 12, fontWeight: FONT_ACCENT },
  TabularXSCompact: { ...OT_BASE, fontSize: 12, lineHeight: 15, letterSpacing: -0.015 * 12, fontWeight: FONT_REGULAR },
  Tabular2XS: { ...OT_BASE, fontSize: 10, lineHeight: 14, letterSpacing: -0.005 * 10, fontWeight: FONT_REGULAR },
  Tabular2XSAccent: { ...OT_BASE, fontSize: 10, lineHeight: 14, letterSpacing: -0.005 * 10, fontWeight: FONT_ACCENT },
  Tabular2XSCompact: { ...OT_BASE, fontSize: 10, lineHeight: 12, letterSpacing: -0.005 * 10, fontWeight: FONT_REGULAR },

  // Caps (uppercase labels)
  CapsL: { ...OT_BASE, fontSize: 16, lineHeight: 20, letterSpacing: 0.069 * 16, fontWeight: FONT_ACCENT, textTransform: 'uppercase' as const },
  CapsM: { ...OT_BASE, fontSize: 14, lineHeight: 18, letterSpacing: 0.074 * 14, fontWeight: FONT_ACCENT, textTransform: 'uppercase' as const },
  CapsS: { ...OT_BASE, fontSize: 11, lineHeight: 14, letterSpacing: 0.080 * 11, fontWeight: FONT_ACCENT, textTransform: 'uppercase' as const },

  // Display
  DisplayM: { ...OT_BASE, fontSize: 48, lineHeight: 60, letterSpacing: -0.022 * 48, fontWeight: FONT_REGULAR },
} as const;
