import { Callout, DefaultButton, IconButton, Modal, Pivot, PivotItem, Stack, Text, TextField } from "@fluentui/react";
import { t } from "i18next";
import { useContext } from "react";

import { AppContext } from "../app.context";
import { Route } from "../contants";
import { getActiveRoute, handleError, navigateTo, useStyles } from "../services";

export function Navbar() {
    const app = useContext(AppContext);
    const palette = app.theme.palette;

    const styles = useStyles({
        header: {
            width: '100%',
            height: '80px',
            backgroundColor: palette.themePrimary,
            marginBottom: '30px',
            display: 'flex',
            alignItems: 'center'
        },
        headerContainer: {
            marginRight: 'auto',
            marginLeft: 'auto',
            paddingLeft: '15px',
            paddingRight: '15px',
        },
        '@media(min-width: 768px)': { headerContainer: { width: '750px' } },
        '@media(min-width: 992px)': { headerContainer: { width: '970px' } },
        '@media(min-width: 1200px)': { headerContainer: { width: '1170px' } },
        pivot: {
            minWidth: '300px',
            width: '400px'
        },
        title: {
            fontSize: '18px',
            color: palette.white,
        },
        leftPanel: {
            width: '50%',
        },
        rightPanel: {
            width: '50%',
            alignItems: 'center'
        },
    })();

    const activeRoute = getActiveRoute();

    return <div className={styles.header}>
        <div className={styles.headerContainer}>

            <Stack tokens={{ childrenGap: 10 }} horizontal>
                <Stack horizontal tokens={{ childrenGap: 10 }} className={styles.rightPanel}>
                    {activeRoute.backTo &&
                    <IconButton iconProps={{ iconName: 'ChromeBack' }}
                        onClick={() => navigateTo(activeRoute.backTo!)}
                        styles={{ root: { color: palette.neutralLight }, }}
                    />
                    }
                    <Text className={styles.title}>{t(activeRoute.titleKey)}</Text>
                </Stack>
                <Stack tokens={{ childrenGap: 20 }} horizontal reversed className={styles.rightPanel}>
                    <IconButton iconProps={{ iconName: app.isDarkTheme ? 'Sunny' : 'ClearNight' }}
                        onClick={() => app.toggleTheme()}
                        styles={{ root: { color: palette.neutralLight }, }}
                    />
                    <IconButton iconProps={{ iconName: 'Home' }}
                        onClick={() => navigateTo(Route.Home)}
                        styles={{ root: { color: palette.neutralLight }, }}
                    />
                </Stack>
            </Stack>
        </div>
    </div>;
}