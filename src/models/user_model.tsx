import { CharModelField } from "@/core"
import { I18N } from "@/src"

export const UserModel = {
    username: new CharModelField('username', I18N.inputs.username),
    password: new CharModelField('password', I18N.inputs.password)
}