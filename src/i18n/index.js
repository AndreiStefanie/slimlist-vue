import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  silentTranslationWarn: true
});

const loadedLanguages = [];

function setI18nLanguage(lang) {
  i18n.locale = lang;
  axios.defaults.headers.common['Accept-Language'] = lang;
  document.querySelector('html').setAttribute('lang', lang);
  return lang;
}

/**
 * Load the indicated language.
 * @param {string} lang The language to be loaded
 */
export function loadLanguageAsync(lang) {
  if (i18n.locale !== lang) {
    if (loadedLanguages.indexOf(lang) === -1) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/i18n/langs/${lang}`).then(
        msgs => {
          i18n.setLocaleMessage(lang, msgs.default);
          loadedLanguages.push(lang);
          return setI18nLanguage(lang);
        }
      );
    }
    return Promise.resolve(setI18nLanguage(lang));
  }
  return Promise.resolve(lang);
}
