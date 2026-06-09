import { translate, WidgetField } from "@/core"
import { ConfigValueDto, ConfigValueModel, I18N } from "@/src"

export const CONFIG_VALUE_FIELDS = {
    id: new WidgetField<ConfigValueDto, ConfigValueModel>({
        label: I18N.tables.id,
        condition: x => x.id,
        getter: (x: ConfigValueDto) => x.id
    }),
    data_type: new WidgetField<ConfigValueDto, ConfigValueModel>({
        label: I18N.tables.data_type,
        condition: x => x.data_type,
        render: x => translate(I18N.constants.data_type[x.data_type]),
    }),
    value: new WidgetField<ConfigValueDto, ConfigValueModel>({
        label: I18N.tables.value,
        condition: x => x.value,
        setter: (x: ConfigValueModel, v: string) => x.value = v,
        getter: (x: ConfigValueDto) => x.value
    }),
    initial_value: new WidgetField<ConfigValueDto, ConfigValueModel>({
        label: I18N.tables.initial_value,
        condition: x => x.initial_value,
        render: x => x.initial_value,
    }),
    is_secret: new WidgetField<ConfigValueDto, ConfigValueModel>({
        label: I18N.tables.is_secret,
        condition: x => x.is_secret,
        render: x => translate(I18N.boolean[x.is_secret]),
    }),
    is_editable: new WidgetField<ConfigValueDto, ConfigValueModel>({
        label: I18N.tables.is_editable,
        condition: x => x.is_editable,
        render: x => translate(I18N.boolean[x.is_editable]),
    }),
    description: new WidgetField<ConfigValueDto, ConfigValueModel>({
        label: I18N.tables.description,
        condition: x => true,
        render: x => translate(I18N.constants.configs[x.id]),
    }),
    actions: new WidgetField<ConfigValueDto, ConfigValueModel>({
        label: I18N.tables.actions,
        condition: x => true
    })
}