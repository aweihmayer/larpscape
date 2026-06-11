import { Component, SubmitEvent } from "react";
import { Button, Dialog, FloatInput, FloatModelField, IntegerInput, IntegerModelField, SelectInput, TextInput, TextModelField, translate, WidgetField } from "@/core";
import { CONFIG_VALUE_FIELDS, ConfigService, ConfigValueDto, ConfigValueModel, DataType, I18N } from "@/src";
import { Pencil } from "lucide-react";

interface Props {
    config: ConfigValueDto
    callback: ((x: any) => any)
}

interface State {
    isLoading: boolean
}

export class ConfigValueUpdateDialog extends Component<Props, State> {
    data = new ConfigValueModel()

    constructor(props: Props) {
        super(props)
        this.state = { isLoading: false };
    }

    render() {
        const field = new WidgetField({
            label: CONFIG_VALUE_FIELDS.value.label,
            getter: CONFIG_VALUE_FIELDS.value.getter,
            setter: CONFIG_VALUE_FIELDS.value.setter,
            model: new TextModelField()
        })

        let input;
        if (this.props.config.options) {
            field.model!.options = this.props.config.options
            input = <SelectInput field={field} data={this.data} />
        } else {
            switch (this.props.config.data_type) {
                case DataType.STRING:
                    input = <TextInput field={field} data={this.data} />
                    break
                case DataType.BOOLEAN:
                    input = <TextInput field={field} data={this.data} />
                    break
                case DataType.INTEGER:
                    input = <IntegerInput field={field} data={this.data} />
                    break
                case DataType.FLOAT:
                    input = <FloatInput field={field} data={this.data} />
                    break
            }
        }

        return <dialog>
            <h1>
                <Pencil />
                <span>{this.props.config.id}</span>
            </h1>
            <form
                onSubmit={ev => this.handleSubmit(ev)}
            >
                <div>
                    {input}
                </div>
                <Button type="submit" className="btn blue full">
                    {translate(I18N.buttons.update)}
                </Button>
                <Button className="btn blue-solid full" onClick={() => Dialog.close()}>
                    {translate(I18N.buttons.cancel)}
                </Button>
            </form>
        </dialog>;
    }

    handleSubmit(ev: SubmitEvent) {
        ev.preventDefault();
        if (this.state.isLoading) return
        ConfigService.update(this.props.config, this.data)
            .then(x => {
                this.props.callback(ev)
                Dialog.close()
            })
    }
}