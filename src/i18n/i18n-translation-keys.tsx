import i18next from "i18next";

export enum I18nLanguage {
    English = 'en',
    Spanish = 'es',
}

export const translate = (key: string) => {
    return i18next.t(key);
  }