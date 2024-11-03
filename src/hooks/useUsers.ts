import {useEffect, useState} from "react";
import userService from "../services/user-service.ts";
import User from "../User.ts";
import {CanceledError} from "../services/api-client.ts";

export default function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        setLoading(true);
        const {request, cancel} = userService.getAll<User[]>();
        request
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => {
                if(err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            })
        return () => cancel();
    }, []);

    return {name, users, isLoading, error, setName, setUsers, setLoading, setError};
}