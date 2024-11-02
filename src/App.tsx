import {useEffect, useState} from "react";
import axios, {CanceledError} from "axios";
import User from "./User.ts";

export default function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
        axios.get<User[]>('http://localhost:3000/users', {signal: controller.signal})
            .then(res => setUsers(res.data))
            .catch(err => {
                if(err instanceof CanceledError) return;
                setError(err.message);
            });

        return () => controller.abort();
    }, []);

    return <>
        {error && <p className="text-danger">{error}</p>}
        <ul>
            {users.map((user: User) => <li key={user.id}>{user.name}</li>)}
        </ul>
    </>;
}