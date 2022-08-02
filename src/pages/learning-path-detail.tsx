import { Link, Stack, Text } from "@fluentui/react";
import { useContext } from "react";
import { useParams } from "react-router-dom";

import { AppContext } from "../app.context";
import { Separator } from "../components";
import { Route } from "../contants";
import { modules, learningPaths } from "../data";
import { formatRoute, navigateTo } from "../services";

export function LearningPathDetail() {
    const app = useContext(AppContext);
    const { id } = useParams<{ id: string }>();

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