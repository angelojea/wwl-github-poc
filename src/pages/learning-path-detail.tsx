import { Link, Spinner, Stack, Text } from "@fluentui/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AppContext } from "../app.context";
import { Separator } from "../components";
import { Route } from "../contants";
import { LearningPath, Module } from "../models";
import { formatRoute, httpGet, navigateTo } from "../services";

export function LearningPathDetail() {
    const app = useContext(AppContext);
    const { id } = useParams<{ id: string }>();
    
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

    if (loading) return <Spinner />;
    
    const learningPath = learningPaths.find(x => x.id === id);

    if (!learningPath) {
        navigateTo(Route.LearningPaths);
        return null;
    }
    
    const moduleRecords = learningPath.modules.map(moduleId => modules.find(x => x.id === moduleId)!).filter(x => x) || [];

    const navigate = (id: string) => () => navigateTo(formatRoute(Route.ModuleDetail, { id: id }) as Route);

    return (
        <Stack tokens={{ childrenGap: 20 }}>
            <Text><h1>{learningPath.name}</h1></Text>
            <Text>
                <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(learningPath.description) }}></div>
            </Text>
            <Separator />
            <Text><h3>Modules</h3></Text>
            <ul style={{listStyle:'none'}}>
                {moduleRecords.map(module => <li><Link onClick={navigate(module!.id)}>{module?.name}</Link></li>)}
            </ul>
        </Stack>
    )
}