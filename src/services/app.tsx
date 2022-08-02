import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { createUseStyles, DefaultTheme, Styles } from 'react-jss';

import { AppContext, AppContextProps } from '../app.context';
import { generateRandomStr, notification, NotificationType } from '.';
import { Route, RouteConfig, Routes } from '../contants';

let history: History;

export let app: AppContextProps;

//========================
// Routing
//========================
export const useInitHistory = () => {
  history = useHistory();
  app = useContext(AppContext);
}

export const navigateTo = (route: Route) => {
  history.push(route);
  app.setLoading(false);
  app.reRenderApp();
}

export const formatRoute = (route: Route, params: any) => {
  let returnValue = route as string;

  Object.keys(params).forEach(key => {
    returnValue = returnValue.replace(`:${key}`, params[key]);
  })
  
  return returnValue;
}

export const getActiveRoute = (): RouteConfig => {
  const currentPath = (window.location.href.split('#')[1] || '').replace(/\/$/g, '');

  if (!currentPath) return Routes.Home;

  return Object.keys(Routes).filter(key => {
    //@ts-ignore
    const currRoute = Routes[key].path;
    const pathArray = currentPath.replace(/^\//g, '').split('/');
    const routeArray = currRoute.replace(/^\//g, '').split('/');

    for (let i = 0; i < pathArray.length; i++) {
      const pathFrag = pathArray[i];
      const routeFrag = routeArray[i];

      if (!routeFrag) return false;
      if (routeFrag.startsWith(':') && pathFrag) continue;
      if (pathFrag !== routeFrag) return false;
    }
    return true;
  })
  //@ts-ignore
  .map(route => Routes[route])[0] as RouteConfig;
}
//========================



//========================
// Styles
//========================
export function useStyles<C extends string = string, Props = unknown, Theme = DefaultTheme>(styles: Styles<C, Props, Theme> | ((theme: Theme) => Styles<C, Props, undefined>)) {
  return createUseStyles(styles,
  {
    generateId: () => 'aoj-' + generateRandomStr(10)
  });
}

export const getTheme = () => {
  return app.theme;
}
//========================


//========================
// Error Handling
//========================
export class CustomError {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}

export function handleError(error: any) {
  if (error && error.constructor.name === 'CustomError') {
    notification((error as CustomError).message, NotificationType.Error);
  }
  else {
    notification('An error occurred. Please contact the system admin', NotificationType.Error);
  }
}
//========================