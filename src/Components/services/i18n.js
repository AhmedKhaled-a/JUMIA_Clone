import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import data from '../localization/data';


const resources = data;
const langFromLocalStorage = localStorage.getItem('cur_lang');
i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: langFromLocalStorage || 'en',
	debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;