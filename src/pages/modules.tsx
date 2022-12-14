import { DetailsList, Link, Spinner, Stack, Text } from "@fluentui/react";
import { t } from "i18next";
import { useContext, useState, useEffect } from "react";
import * as _ from 'lodash';

import { AppContext } from "../app.context";
import { Route } from "../contants";
import { formatRoute, httpGet, navigateTo, useStyles } from "../services";
import { Filter } from "../components";
import { LearningPath, Module } from "../models";

export function Modules() {
    const app = useContext(AppContext);
    
    const [loading, setLoading] = useState(true);
    const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
    const [modules, setModules] = useState<Module[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const responses = await Promise.all([
                httpGet('./src/data/learning-path.json'),
                httpGet('./src/data/module.json'),
            ])
            setLearningPaths(responses[0]);
            setModules(responses[1]);
            setLoading(false);
        };
        if (loading) loadData();
    }, [loading]);

    const [selectedPathFilters, setSelectedPathFilters] = useState<string[]>([]);

    let records = modules.filter(x => x.language === app.language);
    
    let pathsFilterOptions = records.filter(x => x["learning-path"]).map(path => learningPaths.find(x => x.id === path["learning-path"])!).filter(x => x);
    pathsFilterOptions = _.uniqBy(pathsFilterOptions, 'id');
    
    if (selectedPathFilters.length > 0) {
        records = _.flatten(selectedPathFilters.map(x => records.filter(y => y["learning-path"] === x)));
    }

    const styles = useStyles({
        link: {
            fontSize: '16px'
        }
    })();

    const navigate = (id: string) => () => navigateTo(formatRoute(Route.ModuleDetail, { id: id }) as Route);
    const navigateToPath = (id: string) => () => navigateTo(formatRoute(Route.LearningPathDetail, { id: id }) as Route);

    return (
        loading ?
        <Spinner />
        :
        <Stack tokens={{ childrenGap: 20 }}>
            <div className="row">
                <div className="col-3">
                    <Filter
                        labelKey="modules.paths-filter"
                        options={pathsFilterOptions.map(x => ({ key: x?.id!, label: x?.name! }))}
                        onSelectedChanged={(ids) => setSelectedPathFilters(Array.from(ids))}
                    />
                </div>
                <div className="col-9">
                    <DetailsList items={records}
                        className='ms-depth-4'
                        columns={[
                            {
                                key: 'name', fieldName: 'name', name: 'Name', minWidth: 250, maxWidth: 400,
                                onRender: (item) =>
                                    <Link className={styles.link}
                                        onClick={navigate(item.id)}>{item.name}</Link>
                            },
                            {
                                key: 'path', name: 'Learning Path', minWidth: 250, maxWidth: 300,
                                onRender: (item) => {
                                    const path = learningPaths.find(x => x.id === item['learning-path']);
                                    if (!path) return <span></span>;
                                    return <Link className={styles.link}
                                            onClick={navigateToPath(path.id)}>{path.name}</Link>;
                                }
                            },
                        ]}
                    />
                </div>
            </div>
        </Stack>
    )
}