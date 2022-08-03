import { Link, Spinner, Stack, Text } from "@fluentui/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AppContext } from "../app.context";
import { Separator } from "../components";
import { Route } from "../contants";
import { KnowledgeArticle, LearningPath, Module } from "../models";
import { formatRoute, httpGet, navigateTo } from "../services";

export function ModuleDetail() {
    const app = useContext(AppContext);
    const { id } = useParams<{ id: string }>();
    
    const [loading, setLoading] = useState(true);
    const [modules, setModules] = useState<Module[]>([]);
    const [knowledgearticles, setKnowledgearticles] = useState<KnowledgeArticle[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const responses = await Promise.all([
                httpGet('./src/data/knowledge-article.json'),
                httpGet('./src/data/module.json'),
            ])
            setKnowledgearticles(responses[0]);
            setModules(responses[1]);
            setLoading(false);
        };
        if (loading) loadData();
    }, [loading]);

    if (loading) return <Spinner />;

    const module = modules.find(x => x.id === id);

    if (!module) {
        navigateTo(Route.Modules);
        return null;
    }

    const articles = module["knowledge-articles"].map(articleId => knowledgearticles.find(x => x.id === articleId)).filter(x => x);

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