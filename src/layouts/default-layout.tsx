import { useContext } from "react";
import {
    Route,
    Switch
} from "react-router-dom";
import { cssTransition, ToastContainer } from "react-toastify";
import { AppContext } from "../app.context";

import { Footer, Loading, Navbar } from "../components";
import { Globals, Routes } from "../contants";
import { useStyles } from "../services";

export function DefaultLayout() {
    const app = useContext(AppContext);
    const styles = useStyles({
        aojContainer: {
            minHeight: '400px',
            marginRight: 'auto',
            marginLeft: 'auto',
            paddingLeft: '15px',
            paddingRight: '15px',
        },
            
        '@media(min-width: 768px)': { aojContainer: { width: '750px' } },
        '@media(min-width: 992px)': { aojContainer: { width: '970px' } },
        '@media(min-width: 1200px)': { aojContainer: { width: '1170px' } }
    })();
  
    return <div className={app.isDarkTheme ? Globals.darkClass : ''}
        style={{minHeight:'100%', backgroundColor: app.theme.palette.neutralLighterAlt}}>
            <ToastContainer className={'animated'}
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={cssTransition({ enter: 'animated slideInDown', exit: 'animated slideOutUp', })}
            />
        <Loading/>
        <Navbar />
        <div className={styles.aojContainer}>
            <Switch>
                {
                    Object.values(Routes).map(x =>
                        <Route 
                            key={x.path}
                            path={x.path}
                            component={x.component}></Route>)
                }
            </Switch>
        </div>
        <Footer />
    </div>;
}