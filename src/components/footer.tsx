import { ActionButton, CommandButton, Stack, Text } from "@fluentui/react";
import { useContext } from "react";
import { AppContext } from "../app.context";
import { Route } from "../contants";
import { I18nLanguage, translate } from "../i18n";
import { navigateTo, useStyles } from "../services";
import { Separator } from "./separator";

export function Footer() {
    const app = useContext(AppContext);
    const palette = app.theme.palette;
    const styles = useStyles({
        footer: {
            width: '100%',
            height: '130px',
            backgroundColor: palette.themeDark,
            marginTop: '30px',
            display: 'flex',
            alignItems: 'center'
        },
        footerContainer: {
            marginRight: 'auto',
            marginLeft: 'auto',
            paddingLeft: '15px',
            paddingRight: '15px',
        },
        '@media(min-width: 768px)': { footerContainer: { width: '750px' } },
        '@media(min-width: 992px)': { footerContainer: { width: '970px' } },
        '@media(min-width: 1200px)': { footerContainer: { width: '1170px' } },
        link: {
            color: palette.white,
        },
        langPickerContainer: {
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row-reverse',
        }
    })();

    const changeLang = (e: any, i: any) => app.setLanguage(i.key as I18nLanguage);

    return <div className={styles.footer}>
        <div  className={styles.footerContainer}>
            <Stack tokens={{ childrenGap: 5 }} horizontal>
                <ActionButton className={styles.link} onClick={() => navigateTo(Route.Home)}>
                    {translate('footer.linkHome')}
                </ActionButton>
                <Separator vertical />
                <ActionButton className={styles.link} onClick={() => navigateTo(Route.LearningPaths)}>
                    {translate('footer.linkLearningPaths')}
                </ActionButton>
                <Separator vertical />
                <ActionButton className={styles.link} onClick={() => navigateTo(Route.Modules)}>
                    {translate('footer.linkModules')}
                </ActionButton>
                <Separator vertical />
                <ActionButton className={styles.link} onClick={() => navigateTo(Route.Articles)}>
                    {translate('footer.linkArticles')}
                </ActionButton>
                <div className={styles.langPickerContainer}>
                    <CommandButton text={translate('footer.langLabel')}
                        styles={{ root: { color: palette.neutralLight }, menuIcon: { color: palette.neutralLight } }}
                        menuProps={{
                                items: [
                                    { key: I18nLanguage.Spanish, text: translate('general.spanish'), onClick: changeLang },
                                    { key: I18nLanguage.English, text: translate('general.english'), onClick: changeLang },
                                ],
                            }
                        }
                    />
                </div>
            </Stack>
        </div>
    </div>;
}