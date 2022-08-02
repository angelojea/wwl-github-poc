import { Checkbox, Stack, Text, TextField } from "@fluentui/react";
import { t } from "i18next";
import React, { useContext, useState } from "react";
import { AppContext } from "../app.context";
import { useStyles } from "../services";

interface IFilterProps {
    labelKey: string,
    options: { key: string, label: string }[],
    onSelectedChanged?: (selectedKeys: string[]) => void
}

export function Filter(props: IFilterProps) {
    const app = useContext(AppContext);
    const [search, setSearch] = useState('');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const options = !search ? props.options : props.options.filter(x => x.label.toLowerCase().includes(search.toLowerCase()));

    const styles = useStyles({
        main: {
            padding: '20px',
        },
        label: {
            fontSize: '1.25rem',
            fontWeight: '600'
        },
        container: {
            maxHeight: '300px',
            overflowY: 'auto',
        }
    })();

    const handleChange = (id: string, checked: boolean) => {
        const tempSelectedIds = selectedIds;

        if (checked && !tempSelectedIds.includes(id)) {
            tempSelectedIds.push(id);
        }
        else if (!checked && tempSelectedIds.includes(id)) {
            const index = tempSelectedIds.indexOf(id);
            tempSelectedIds.splice(index, 1);
        }
        
        setSelectedIds(tempSelectedIds);
        if (props.onSelectedChanged) props.onSelectedChanged(tempSelectedIds);
    };


    return <Stack tokens={{ childrenGap: 20 }} className={`${styles.main} ms-depth-4`}>
        <Text className={styles.label}>{t(props.labelKey)}</Text>

        <TextField value={search} onChange={(v) => setSearch(v.currentTarget.value)} />

        <Stack tokens={{ childrenGap: 10 }} className={styles.container}>
            {options.map(x => <Checkbox label={x.label} onChange={(e, checked) => handleChange(x.key, checked!)} />)}
        </Stack>
    </Stack>;
}