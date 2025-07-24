const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#F4E0D9",
  primary200: "#E8C1B4",
  primary300: "#DDA28E",
  primary400: "#D28468",
  primary500: "#C76542",
  primary600: "#A54F31",

  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  palette,

  transparent: "rgba(0, 0, 0, 0)",

  text: palette.neutral800,
  textDim: palette.neutral600,
  textInverse: palette.neutral100,
  primaryText: palette.primary600,

  background: palette.neutral200,
  screenBackground: palette.neutral100,
  cardBackground: palette.neutral100,
  overlay: palette.overlay20,

  border: palette.neutral400,
  separator: palette.neutral300,

  tint: palette.primary500,
  tintInactive: palette.neutral300,

  error: palette.angry500,
  errorBackground: palette.angry100,

  success: "#3C9A5F",
  warning: palette.accent500,

  buttonBackground: palette.primary500,
  buttonText: palette.neutral100,

  // ✅ Custom additions to fix theme errors
  primary: palette.primary500,
  surface: palette.neutral100,
  backgroundDark: palette.neutral900,
  keypad: palette.accent100,
}
