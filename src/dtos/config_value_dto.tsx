import * as Constants from "@/src/constants";

export class ConfigValueDto {
	data_type?: string
	id?: Constants.ConfigId
	initial_value?: string
	is_editable?: boolean
	is_secret?: boolean
	options?: string[]
	value?: string

	static fromJson(data: any) : ConfigValueDto {
		const dto = new ConfigValueDto()
		if (typeof data.data_type != 'undefined') dto.data_type = data.data_type;
		if (typeof data.id != 'undefined') dto.id = data.id;
		if (typeof data.initial_value != 'undefined') dto.initial_value = data.initial_value;
		if (typeof data.is_editable != 'undefined') dto.is_editable = data.is_editable;
		if (typeof data.is_secret != 'undefined') dto.is_secret = data.is_secret;
		if (typeof data.options != 'undefined') dto.options = data.options;
		if (typeof data.value != 'undefined') dto.value = data.value;
		return dto;
	}
}
