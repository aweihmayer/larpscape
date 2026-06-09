import { createPromise } from "@/core";
import { ConfigValueDto, Routes } from "@/src";

export class ConfigService {
    static configs: object[] | null = null;

    static fetchAll() {
        if (ConfigService.configs) { return createPromise(ConfigService.configs); }
        return Routes.api.config.list.fetch().then(x => {
            if (x.response.ok) {
                ConfigService.configs = x.data.map((v: any) => ConfigValueDto.fromJson(v));
            }
            return x.data;
        });
    }

    static find(id: string) {
        return Routes.api.config.read.fetch(null, { id: id }).then(x => {
            return ConfigValueDto.fromJson(x.data);
        });
    }
}