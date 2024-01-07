export default {
  supportedLngs: ['en', 'es', 'pt', 'pt-BR'],
  fallbackLng: 'en',
  // Disabling suspense is recommended
  react: { useSuspense: false },
  backend: {
    loadPath: '../public/locales/{{lng}}/{{ns}}.json',
  },
};
