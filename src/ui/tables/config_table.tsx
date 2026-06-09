import React, { Component } from "react";
import { ItemTable, Link, translate, ItemTableField } from "@/core"
import { CONFIG_VALUE_FIELDS, ConfigValueDto, I18N, Routes } from "@/src";
import { ConfigService } from "@/src";

const FIELDS = [
    new ItemTableField<ConfigValueDto>({
        widget: CONFIG_VALUE_FIELDS.id,
        size: 3,
    }),
    new ItemTableField<ConfigValueDto>({
        widget: CONFIG_VALUE_FIELDS.value,
        size: 1,
    }),
    new ItemTableField<ConfigValueDto>({
        widget: CONFIG_VALUE_FIELDS.description,
        size: 2,
    }),
    new ItemTableField<ConfigValueDto>({
        widget: CONFIG_VALUE_FIELDS.actions,
        render: x => <Link route={Routes.app.config.read} params={x} className="btn blue-solid">
            {translate(I18N.buttons.select)}
        </Link>,
        size: 1,
    })
]

export class ConfigTable extends Component {
    tableRef = React.createRef<ItemTable<ConfigValueDto>>();

    componentDidMount() {
        ConfigService.fetchAll()
            .then(x => {
                this.tableRef.current?.setState({ items: x });
            })
    }
    
    render() {
        return <ItemTable
            ref={this.tableRef}
            fields={FIELDS}
            k={(v, i) => v.id}
        />;
    }
}