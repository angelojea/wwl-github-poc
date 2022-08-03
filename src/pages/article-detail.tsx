import { Link, Spinner, Stack, Text } from "@fluentui/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AppContext } from "../app.context";
import { Separator } from "../components";
import { Route } from "../contants";
import { KnowledgeArticle } from "../models";
import { formatRoute, httpGet, navigateTo } from "../services";

export function ArticleDetail() {
    const app = useContext(AppContext);
    const { id } = useParams<{ id: string }>();

    const [loading, setLoading] = useState(true);
    const [knowledgearticles, setKnowledgearticles] = useState<KnowledgeArticle[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const responses = await Promise.all([
                httpGet('./src/data/knowledge-article.json'),
            ])
            setKnowledgearticles(responses[0]);
            setLoading(false);
        };
        if (loading) loadData();
    }, [loading]);

    if (loading) return <Spinner />;

    const article = knowledgearticles.find(x => x.language === app.language && x.id === id);

    if (!article) {
        navigateTo(Route.Articles);
        return null;
    }

    return (
        <Stack tokens={{ childrenGap: 20 }}>
            <Text><h1>{article.title}</h1></Text>
            <Text>
                <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(article.content) }}></div>
            </Text>
        </Stack>
    )
}