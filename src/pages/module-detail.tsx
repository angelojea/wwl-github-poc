import { Link, Stack, Text } from "@fluentui/react";
import { useContext } from "react";
import { useParams } from "react-router-dom";

import { AppContext } from "../app.context";
import { Separator } from "../components";
import { Route } from "../contants";
import { modules as moduleData, knowledgearticles as articleData } from "../data";
import { formatRoute, navigateTo } from "../services";

export function ModuleDetail() {
    const app = useContext(AppContext);
    const { id } = useParams<{ id: string }>();

    const module = moduleData.find(x => x.id === id);

    if (!module) {
        navigateTo(Route.Modules);
        return null;
    }

    const articles = module["knowledge-articles"].map(articleId => articleData.find(x => x.id === articleId)).filter(x => x);

    const navigate = (id: string) => () => navigateTo(formatRoute(Route.ArticleDetail, { id: id }) as Route);

    return (
        <Stack tokens={{ childrenGap: 20 }}>
            <Text><h1>{module.name}</h1></Text>
            <Text>
                <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(module.description) }}></div>
            </Text>
            <Separator />
            <Text><h3>Knowledge Articles</h3></Text>
            <ul style={{listStyle:'none'}}>
                {articles.map(article => <Link onClick={navigate(article!.id)}>{article?.title}</Link>)}
            </ul>
        </Stack>
    )
}