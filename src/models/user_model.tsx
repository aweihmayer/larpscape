import * as Core from "@/core";
import * as Constants from "@/src/constants";

export class UserModel {
	date_of_birth?: Date
	email?: string
	first_name?: string
	gender?: Constants.Gender
	id?: number
	last_name?: string
	password?: string
	phone?: string
	role?: Constants.Role
	username?: string

	static fields = {
		date_of_birth: new Core.DateModelField({}),
		email: new Core.TextModelField({}),
		first_name: new Core.TextModelField({}),
		gender: new Core.TextModelField({ options: ["male", "female", "non_binary", "undisclosed"]}),
		id: new Core.IntegerModelField({}),
		last_name: new Core.TextModelField({}),
		password: new Core.TextModelField({}),
		phone: new Core.TextModelField({}),
		role: new Core.IntegerModelField({ options: [10, 20, 30, 40, 60, 80]}),
		username: new Core.TextModelField({ max: 25})
	}
}
