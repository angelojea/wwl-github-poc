import { DetailsList, Link, Stack, Text } from "@fluentui/react";
import { t } from "i18next";
import { useContext, useState } from "react";
import * as _ from 'lodash';

import { AppContext } from "../app.context";
import { Route } from "../contants";
import { knowledgearticles, learningPaths, modules } from "../data";
import { formatRoute, navigateTo, useStyles } from "../services";
import { Filter } from "../components";

export function Articles() {
    const app = useContext(AppContext);
    const [selectedModuleFilters, setSelectedModuleFilters] = useState<string[]>([]);
    const [selectedPathFilters, setSelectedPathFilters] = useState<string[]>([]);

    let records = knowledgearticles.filter(x => x.language === app.language);

    let modulesFilterOptions = records.filter(x => x.module).map(article => modules.find(x => x.id === article.module)!).filter(x => x);
    modulesFilterOptions = _.uniqBy(modulesFilterOptions, 'id');

    let pathsFilterOptions = modulesFilterOptions.filter(x => x["learning-path"]).map(path => learningPaths.find(x => x.id === path["learning-path"])!).filter(x => x);
    pathsFilterOptions = _.uniqBy(pathsFilterOptions, 'id');
    
    if (selectedModuleFilters.length > 0) {
        records = _.flatten(selectedModuleFilters.map(x => records.filter(y => y.module === x)));
    }
    
    if (selectedPathFilters.length > 0) {
        records = _.flatten(selectedPathFilters.map(id => {
            const tempModules =
                records.map(article => ({
                        article,
                        module: modules.find(x => x.id === article.module)!
                    }))
                    .filter(x => x.module);
            return tempModules.filter(x => x.module["learning-path"] && x.module["learning-path"] === id).map(x => x.article);
        }));
    }

    const styles = useStyles({
        link: {
            fontSize: '16px'
        }
    })();

    const navigate = (id: string) => () => navigateTo(formatRoute(Route.ArticleDetail, { id: id }) as Route);
    const navigateToModule = (id: string) => () => navigateTo(formatRoute(Route.ModuleDetail, { id: id }) as Route);
    const navigateToPath = (id: string) => () => navigateTo(formatRoute(Route.LearningPathDetail, { id: id }) as Route);

    return (
        <Stack tokens={{ childrenGap: 20 }}>
            <div className="row">
                <div className="col-3">
                    <Stack tokens={{ childrenGap: 10 }}>
                        <Filter
                            labelKey="articles.modules-filter"
                            options={modulesFilterOptions.map(x => ({ key: x?.id!, label: x?.name! }))}
                            onSelectedChanged={(ids) => setSelectedModuleFilters(Array.from(ids))}
                        />
                        <Filter
                            labelKey="articles.paths-filter"
                            options={pathsFilterOptions.map(x => ({ key: x?.id!, label: x?.name! }))}
                            onSelectedChanged={(ids) => setSelectedPathFilters(Array.from(ids))}
                        />
                    </Stack>
                </div>
                <div className="col-9">
                    <DetailsList items={records}
                        className='ms-depth-4'
                        columns={[
                            {
                                key: 'title', fieldName: 'title', name: 'Title', minWidth: 100,
                                onRender: (item) =>
                                    <Link className={styles.link}
                                        onClick={navigate(item.id)}>{item.title}</Link>
                            },
                            {
                                key: 'module', name: 'Module', minWidth: 200,
                                onRender: (item) => {
                                    const module = modules.find(x => x.id === item.module);
                                    if (!module) return <span></span>;
                                    return <Link className={styles.link} onClick={navigateToModule(module.id)}>{module.name}</Link>
                                }
                            },
                            {
                                key: 'path', name: 'Learning Path', minWidth: 200,
                                onRender: (item: any) => {
                                    const module = modules.find(x => x.id === item.module);
                                    if (!module) return <span></span>;

                                    const path = learningPaths.find(x => x.id === module['learning-path']);
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