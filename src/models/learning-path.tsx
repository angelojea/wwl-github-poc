import { I18nLanguage } from "../i18n";

export interface LearningPath {
    id: string,
    name: string,
    language: I18nLanguage,
    order: number,
    description: string,
    'modules': string[],
}
