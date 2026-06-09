import { Routes, UserModel } from "@/src";

export class UserService {
    static create(data: UserModel) {
        return Routes.api.user.create.fetch(data);
    }
}