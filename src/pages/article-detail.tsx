import { Link, Stack, Text } from "@fluentui/react";
import { useContext } from "react";
import { useParams } from "react-router-dom";

import { AppContext } from "../app.context";
import { Separator } from "../components";
import { Route } from "../contants";
import { knowledgearticles as knowledgearticleData } from "../data";
import { formatRoute, navigateTo } from "../services";

export function ArticleDetail() {
    const app = useContext(AppContext);
    const { id } = useParams<{ id: string }>();

    const article = knowledgearticleData.find(x => x.language === app.language && x.id === id);

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