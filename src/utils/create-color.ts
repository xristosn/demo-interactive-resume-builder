import tinycolor from 'tinycolor2';

type ColorScale = Record<string, { value: string; description?: string }>;

// HSL adjustments based on Radix's light/dark theme scales
const lightThemeAdjustments = [
  { l: 98, s: 16, a: 0.05 },
  { l: 95, s: 22, a: 0.1 },
  { l: 89, s: 30, a: 0.15 },
  { l: 82, s: 35, a: 0.2 },
  { l: 70, s: 40, a: 0.25 },
  { l: 60, s: 45, a: 0.3 },
  { l: 50, s: 50, a: 0.4 },
  { l: 40, s: 55, a: 0.55 },
  { l: 35, s: 60, a: 0.7 },
  { l: 30, s: 65, a: 0.8 },
  { l: 20, s: 70, a: 0.9 },
  { l: 10, s: 75, a: 0.98 },
];

const darkThemeAdjustments = [
  { l: 12, s: 50, a: 0.05 },
  { l: 15, s: 45, a: 0.1 },
  { l: 20, s: 40, a: 0.15 },
  { l: 25, s: 35, a: 0.2 },
  { l: 30, s: 30, a: 0.3 },
  { l: 40, s: 28, a: 0.4 },
  { l: 50, s: 25, a: 0.55 },
  { l: 60, s: 22, a: 0.7 },
  { l: 70, s: 20, a: 0.8 },
  { l: 80, s: 18, a: 0.9 },
  { l: 90, s: 16, a: 0.95 },
  { l: 98, s: 14, a: 1.0 },
];

const keys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000];

export function createColor(
  color: string,
  theme: 'light' | 'dark',
  withOpacity: boolean = false
): ColorScale {
  const baseColor = tinycolor(color).toHsl();

  const adjustments = theme === 'dark' ? darkThemeAdjustments : lightThemeAdjustments;

  const shades: ColorScale = adjustments.reduce((acc, adjustment, index) => {
    const adjustedColor = tinycolor({
      h: baseColor.h,
      s: Math.min(100, baseColor.s * (adjustment.s / 100)),
      l: Math.min(100, adjustment.l),
    });

    const key = keys[index];

    const colorValue = withOpacity
      ? adjustedColor.setAlpha(adjustment.a).toHex8String()
      : adjustedColor.toHexString();

    acc[key] = { value: colorValue };

    return acc;
  }, {} as ColorScale);

  return shades;
}
