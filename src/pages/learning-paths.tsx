import { DetailsList, Link, Stack, Text } from "@fluentui/react";
import { useContext } from "react";

import { AppContext } from "../app.context";
import { Route } from "../contants";
import { learningPaths } from "../data";
import { formatRoute, navigateTo, useStyles } from "../services";

export function LearningPaths() {
    const app = useContext(AppContext);

    const records = learningPaths.filter(x => x.language === app.language);

    const styles = useStyles({
        link: { fontSize: '16px' }
    })();

    const navigate = (id: string) => () => navigateTo(formatRoute(Route.LearningPathDetail, { id: id }) as Route);

    return (
        <Stack tokens={{ childrenGap: 20 }}>
            <div className="row">
                <div className="col-9">
                    <DetailsList items={records}
                        className='ms-depth-4'
                        columns={[
                            {
                                key: 'name', fieldName: 'name', name: 'Name', minWidth: 200,
                                onRender: (item) =>
                                    <Link className={styles.link}
                                        onClick={navigate(item.id)}>{item.name}</Link>
                            },
                        ]}
                    />
                </div>
            </div>
        </Stack>
    )
}