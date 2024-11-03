import apiClient from "./api-client.ts";
import User from "../User.ts";

class UserService {
    getAllUsers()  {
        const controller = new AbortController();
        const request = apiClient
            .get('/users',{signal: controller.signal});

        return {request, cancel: () => controller.abort()};
    }

    deleteUser(id: number) {
        return apiClient.delete("/users/" + id);
    }

    createUser(user: User) {
        return apiClient.post("/users", user);
    }

    updateUser(user: User) {
        return apiClient.put("/users/" + user.id, user);
    }
}

export default new UserService();