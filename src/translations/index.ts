import { en, TranslationKeys } from './en';
import { hi } from './hi';

export type Language = 'en' | 'hi';

export const translations: Record<Language, TranslationKeys> = {
  en,
  hi,
};

export { en, hi };
export type { TranslationKeys };

