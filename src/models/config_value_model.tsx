import * as Core from "@/core";
import * as Constants from "@/src/constants";

export class ConfigValueModel {
	id?: Constants.ConfigId
	value?: string

	static fields = {
		id: new Core.TextModelField(),
		value: new Core.TextModelField()
	}
}
