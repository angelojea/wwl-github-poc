import {
    HomePage,
    Articles,
    LearningPaths,
    Modules,
    ArticleDetail,
    LearningPathDetail,
    ModuleDetail,
} from "../pages";

export enum Route {
    Home = '/',
    Articles = '/articles',
    ArticleDetail = '/article/:id',
    LearningPaths = '/learning-paths',
    LearningPathDetail = '/learning-path/:id',
    Modules = '/modules',
    ModuleDetail = '/module/:id',
}

export const Routes: RoutesModule = {
    Articles: {
        titleKey: 'articles.title',
        path: Route.Articles,
        component: Articles,
    },
    ArticleDetail: {
        titleKey: 'article.title',
        path: Route.ArticleDetail,
        component: ArticleDetail,
        backTo: Route.Articles,
    },
    LearningPaths: {
        titleKey: 'learning-paths.title',
        path: Route.LearningPaths,
        component: LearningPaths,
    },
    LearningPathDetail: {
        titleKey: 'learning-path.title',
        path: Route.LearningPathDetail,
        component: LearningPathDetail,
        backTo: Route.LearningPaths,
    },
    Modules: {
        titleKey: 'modules.title',
        path: Route.Modules,
        component: Modules,
    },
    ModuleDetail: {
        titleKey: 'module.title',
        path: Route.ModuleDetail,
        component: ModuleDetail,
        backTo: Route.Modules,
    },
    Home: {
        titleKey: 'home.title',
        path: Route.Home,
        component: HomePage,
    },
}

export interface RoutesModule {
    Home: RouteConfig,
    Articles: RouteConfig,
    ArticleDetail: RouteConfig,
    LearningPaths: RouteConfig,
    LearningPathDetail: RouteConfig,
    Modules: RouteConfig,
    ModuleDetail: RouteConfig,
}

export interface RouteConfig {
    path: Route,
    component: any,
    titleKey: string,
    backTo?: Route,
}
