import * as enUS from './en-US.json';

const locales = {
  'en-US': enUS,
};

export function load(key: string, ls: any) {
  locales[key] = ls;
}

export default (key: string, locale: string) => {
  return locales[locale]?.[key] ?? key;
};
