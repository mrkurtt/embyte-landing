export { classicNavy } from './classic-navy';
export { romanticBlush } from './romantic-blush';
export { timelessIvory } from './timeless-ivory';
export { gardenSage } from './garden-sage';
export { modernMinimal } from './modern-minimal';

import { classicNavy } from './classic-navy';
import { romanticBlush } from './romantic-blush';
import { timelessIvory } from './timeless-ivory';
import { gardenSage } from './garden-sage';
import { modernMinimal } from './modern-minimal';
import type { ThemeConfig } from '@/shared/theme/types';

export const weddingThemes: ThemeConfig[] = [
  classicNavy,
  romanticBlush,
  timelessIvory,
  gardenSage,
  modernMinimal,
];

export function getWeddingTheme(id: string): ThemeConfig {
  return weddingThemes.find((t) => t.id === id) ?? classicNavy;
}
