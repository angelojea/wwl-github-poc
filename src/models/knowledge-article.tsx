import { I18nLanguage } from "../i18n";

export interface KnowledgeArticle {
    id: string,
    code: string,
    language: I18nLanguage,
    module: string,
    title: string,
    content: string
}
