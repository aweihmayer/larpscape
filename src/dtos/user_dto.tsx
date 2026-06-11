import * as Constants from "@/src/constants";

export class UserDto {
	date_of_birth?: Date
	email?: string
	first_name?: string
	gender?: Constants.Gender
	id?: number
	is_active?: boolean
	last_name?: string
	phone?: string
	role?: Constants.Role
	username?: string

    isSelf(user: UserDto) : boolean {
        return this.id == user.id
	}
    
    hasPermissions(role: Constants.Role) : boolean {
        return !!this.role && this.role >= role
	}

	isGuest() : boolean {
		return this.role == Constants.Role.GUEST
	}
    
	static fromJson(data: any) : UserDto {
		const dto = new UserDto()
		if (typeof data.date_of_birth != 'undefined') dto.date_of_birth = new Date(data.date_of_birth);
		if (typeof data.email != 'undefined') dto.email = data.email;
		if (typeof data.first_name != 'undefined') dto.first_name = data.first_name;
		if (typeof data.gender != 'undefined') dto.gender = data.gender;
		if (typeof data.id != 'undefined') dto.id = data.id;
		if (typeof data.is_active != 'undefined') dto.is_active = data.is_active;
		if (typeof data.last_name != 'undefined') dto.last_name = data.last_name;
		if (typeof data.phone != 'undefined') dto.phone = data.phone;
		if (typeof data.role != 'undefined') dto.role = data.role;
		if (typeof data.username != 'undefined') dto.username = data.username;
		return dto;
	}
}
