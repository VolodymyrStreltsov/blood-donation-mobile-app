import { getLocales } from 'expo-localization'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { getLanguage } from '../data/profile'
import translationEN from './en/translation.json'
import translationPL from './pl/translation.json'
import translationRU from './ru/translation.json'
import translationUA from './ua/translation.json'

export const resources = {
  en: {
    translation: translationEN,
  },
  pl: {
    translation: translationPL,
  },
  ua: {
    translation: translationUA,
  },
  ru: {
    translation: translationRU,
  },
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

const setLanguage = async () => {
  console.log('Setting language')
  const storedLanguage = await getLanguage()
  console.log('Stored language', storedLanguage)
  if (storedLanguage) {
    i18n.changeLanguage(storedLanguage)
  } else {
    const systemLanguage = getLocales()[0].languageCode
    console.log('System language', systemLanguage)
    i18n.changeLanguage(systemLanguage)
  }
}

export default setLanguage
