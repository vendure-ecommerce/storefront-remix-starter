import { RemixI18Next } from 'remix-i18next';
import i18n from '~/i18n'; // your i18n configuration file
import HttpApi from 'i18next-http-backend';
import {
  IS_CF_PAGES,
  safeRequireNodeDependency,
} from '~/utils/platform-adapter';
import { RemixI18NextOption } from 'remix-i18next/build/server';

export function getPlatformBackend() {
  if (IS_CF_PAGES) {
    return HttpApi;
  } else {
    return safeRequireNodeDependency('i18next-fs-backend');
  }
}

export function platformAdapti18nConfig(config: RemixI18NextOption) {
  if (Array.isArray(config.plugins)) {
    config.plugins = [...config.plugins, getPlatformBackend()];
  } else {
    config.plugins = [getPlatformBackend()];
  }

  return config;
}

let i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
  },
  // This is the configuration for i18next used
  // when translating messages server-side only
  i18next: {
    ...i18n,
  },
  // The i18next plugins you want RemixI18next to use for `i18n.getFixedT` inside loaders and actions.
  // E.g. The Backend plugin for loading translations from the file system
  // Tip: You could pass `resources` to the `i18next` configuration and avoid a backend here
  plugins: [],
});

export default i18next;
