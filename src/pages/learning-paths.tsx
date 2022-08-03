import { DetailsList, Link, Spinner, Stack, Text } from "@fluentui/react";
import { useContext, useState, useEffect } from "react";

import { AppContext } from "../app.context";
import { Route } from "../contants";
import { LearningPath } from "../models";
import { formatRoute, httpGet, navigateTo, useStyles } from "../services";

export function LearningPaths() {
    const app = useContext(AppContext);

    const [loading, setLoading] = useState(true);
    const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const responses = await Promise.all([ httpGet('./src/data/learning-path.json') ])
            setLearningPaths(responses[0]);
            setLoading(false);
        };
        if (loading) loadData();
    }, [loading]);

    const records = learningPaths.filter(x => x.language === app.language);

    const styles = useStyles({
        link: { fontSize: '16px' }
    })();

    const navigate = (id: string) => () => navigateTo(formatRoute(Route.LearningPathDetail, { id: id }) as Route);

    return (
        loading ?
        <Spinner />
        :
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