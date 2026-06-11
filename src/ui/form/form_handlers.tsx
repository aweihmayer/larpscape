import { Toast } from "@/core";
import { I18N } from "@/src";

export function handleFormResponse(promise: Promise<{ response: Response, data: any }>) {
    return promise
        .then(x => {
            Toast.success(I18N.toasts.codes[x.response.status].title)
            if (!x.response.ok) throw x
        });
}