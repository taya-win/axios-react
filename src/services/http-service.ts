import apiClient from "./api-client.ts";
import User from "../User.ts";

class HttpService {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll<T>() {
        const controller = new AbortController();
        const request = apiClient
            .get<T>(this.endpoint,{signal: controller.signal});

        return {request, cancel: () => controller.abort()};
    }

    delete(id: number) {
        return apiClient.delete(this.endpoint + "/" + id);
    }

    create<T>(entity: T) {
        return apiClient.post("/users", entity);
    }

    updateUser<T extends User>(entity: T) {
        return apiClient.patch("/users" + "/" + entity.id, entity);
    }
}

const create = (endpoint: string) => new HttpService(endpoint);

export  default  create;