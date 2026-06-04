import React, { Component } from "react";
import { Button, Dialog, ItemTable, ItemTableHeaderData, translate } from "@/core"
import { ConfigUpdateDialog, I18N } from "@/src";
import { ConfigService } from "@/src";

const HEADERS = [
    new ItemTableHeaderData(
        I18N.tables.id,
        x => x.id,
        3),
    new ItemTableHeaderData(
        I18N.tables.value,
        x => x.value,
        1),
    new ItemTableHeaderData(
        I18N.tables.description,
        x => x.description,
        2,
        x => translate(I18N.configs[x.id])),
    new ItemTableHeaderData(
        I18N.tables.actions,
        x => null,
        1,
        x => {
            if (x.is_editable) {
                return [
                    <Button onClick={ev => openUpdateDialog(x.id)}>
                        {translate(I18N.buttons.edit)}
                    </Button>,
                    <Button onClick={ev => openUpdateDialog(x.id)}>
                        {translate(I18N.buttons.reset)}
                    </Button>
                ];
            } else {
                return null;
            }
        }),
]

function openUpdateDialog(id: string) {
    Dialog.open(<ConfigUpdateDialog id={id} />)
}

export class ConfigTable extends Component {
    tableRef = React.createRef<ItemTable>();

    componentDidMount() {
        ConfigService.fetchAll()
            .then(x => {
                this.tableRef.current?.setState({ items: x });
            })
    }
    
    render() {
        return <ItemTable ref={this.tableRef} headers={HEADERS} />;
    }
}