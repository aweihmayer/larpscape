import { translate, WidgetField } from "@/core"
import { ConfigValueDto, ConfigValueModel, I18N } from "@/src"

export const CONFIG_VALUE_FIELDS = {
    id: new WidgetField<ConfigValueDto, ConfigValueModel>({
        label: I18N.tables.id,
        condition: x => x.id,
        getter: (x: ConfigValueDto) => x.id
    }),
    value: new WidgetField<ConfigValueDto, ConfigValueModel>({
        label: I18N.tables.value,
        condition: x => x.value,
        setter: (x: ConfigValueModel, v: string) => x.value = v,
        getter: (x: ConfigValueDto) => x.value
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