import { RemixI18Next } from 'remix-i18next';

import i18n from '~/i18n'; // your i18n configuration file
import HttpBackend from 'i18next-http-backend';
import {
  IS_CF_PAGES,
  safeRequireNodeDependency,
} from '~/utils/platform-adapter';
import { RemixI18NextOption } from 'remix-i18next/build/server';
import resourcesToBackend from 'i18next-resources-to-backend';
import { findLanguageJSON } from '~/languages.server';

export async function getPlatformBackend() {
  if (IS_CF_PAGES) {
    return HttpBackend;
  } else {
    return await safeRequireNodeDependency('i18next-fs-backend').then(
      (module) => module.default,
    );
  }
}

/*
 * This is done to prevent hydration errors
 * entry.server.tsx must use the http backend in a cloudflare context, but loaders/action functions need to load translations into memory
 */
export async function getPlatformBackendApiCtx() {
  if (IS_CF_PAGES) {
    return resourcesToBackend(findLanguageJSON);
  }

  return getPlatformBackend();
}

export async function platformAdapti18nConfig(config: RemixI18NextOption) {
  const backend = await getPlatformBackendApiCtx();
  if (Array.isArray(config.plugins)) {
    config.plugins = [...config.plugins, backend];
  } else {
    config.plugins = [backend];
  }

  return config;
}

export async function getI18NextServer() {
  return platformAdapti18nConfig({
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
  }).then((config) => new RemixI18Next(config));
}

export async function getFixedT(request: Request) {
  return getI18NextServer().then((i18next) => i18next.getFixedT(request));
}
