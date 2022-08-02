import { DefaultLayout } from './layouts';

import { useInitHistory, useStyles } from "./services";

export function App() {
  useInitHistory();
  
  const styles = useStyles({
    app: { height: '100%', },
  })();

  return (
    <div className={styles.app}>
      <DefaultLayout />
    </div>);
}