import { WidgetField } from "@/core"
import { Gender, I18N, Role, UserDto, UserModel } from "@/src"

export const USER_FIELDS = {
    date_of_birth: new WidgetField<UserDto, UserModel>({
        label: I18N.models.date_of_birth,
        condition: x => x.date_of_birth,
        setter: (x: UserModel, v: Date) => x.date_of_birth = v,
        getter: (x: UserDto) => x.date_of_birth
    }),
    email: new WidgetField<UserDto, UserModel>({
        label: I18N.models.email,
        condition: x => x.email,
        setter: (x: UserModel, v: string) => x.email = v,
        getter: (x: UserDto) => x.email
    }),
    first_name: new WidgetField<UserDto, UserModel>({
        label: I18N.models.first_name,
        condition: x => x.first_name,
        setter: (x: UserModel, v: string) => x.first_name = v,
        getter: (x: UserDto) => x.first_name
    }),
    gender: new WidgetField<UserDto, UserModel>({
        label: I18N.models.gender,
        optionLabels: I18N.constants.gender,
        condition: x => x.gender,
        setter: (x: UserModel, v: Gender) => x.gender = v,
        getter: (x: UserDto) => x.gender
    }),
    id: new WidgetField<UserDto, UserModel>({
        label: I18N.models.id,
        condition: x => x.id,
        setter: (x: UserModel, v: number) => x.id = v,
        getter: (x: UserDto) => x.id
    }),
    last_name: new WidgetField<UserDto, UserModel>({
        label: I18N.models.last_name,
        condition: x => x.last_name,
        setter: (x: UserModel, v: string) => x.last_name = v,
        getter: (x: UserDto) => x.last_name
    }),
    password: new WidgetField<UserDto, UserModel>({
        label: I18N.models.password,
        condition: x => false,
        setter: (x: UserModel, v: string) => x.password = v
    }),
    phone: new WidgetField<UserDto, UserModel>({
        label: I18N.models.phone,
        condition: x => x.phone,
        setter: (x: UserModel, v: string) => x.phone = v,
        getter: (x: UserDto) => x.phone
    }),
    role: new WidgetField<UserDto, UserModel>({
        label: I18N.models.role,
        optionLabels: I18N.constants.role,
        condition: x => x.role,
        setter: (x: UserModel, v: Role) => x.role = v,
        getter: (x: UserDto) => x.role
    }),
    username: new WidgetField<UserDto, UserModel>({
        label: I18N.models.username,
        condition: x => x.username,
        setter: (x: UserModel, v: string) => x.username = v,
        getter: (x: UserDto) => x.username
    })
}