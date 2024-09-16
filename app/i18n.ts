export default {
  supportedLngs: ['hu', 'en', 'es', 'pt', 'pt-BR'],
  fallbackLng: 'hu',
  // Disabling suspense is recommended
  react: { useSuspense: false },
  backend: {
    loadPath: '../public/locales/{{lng}}/{{ns}}.json',
  },
};
