import {useEffect, useState} from "react";
import axios, {CanceledError} from "axios";
import User from "./User.ts";

export default function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        axios.get<User[]>('http://localhost:3000/users', {signal: controller.signal})
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => {
                if(err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            });

        return () => controller.abort();
    }, []);

    return <>
        {error && <p className="text-danger">{error}</p>}
        {isLoading && (<div className="spinner-border"></div>)}
        <ul>
            {users.map((user: User) => <li key={user.id}>{user.name}</li>)}
        </ul>
    </>;
}