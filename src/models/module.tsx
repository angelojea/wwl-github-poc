import { I18nLanguage } from "../i18n";

export interface Module {
    id: string,
    name: string,
    language: I18nLanguage,
    order: number,
    description: string,
    'learning-path': string,
    'knowledge-articles': string[],
}
