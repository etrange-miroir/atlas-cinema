const path = require('path');

const DEFAULT_LOCALE = 'fr';
const AVAILABLES_LOCALES = [DEFAULT_LOCALE, 'en'];

module.exports = {
  i18n: {
    locales: AVAILABLES_LOCALES,
    defaultLocale: DEFAULT_LOCALE,
    defaultNS: null, // see https://github.com/isaachinman/next-i18next/issues/462#issuecomment-832793454
    localePath: path.resolve('./public/locales'),
    react: { transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'li'] },
  },
};

module.exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
module.exports.AVAILABLES_LOCALES = AVAILABLES_LOCALES;
