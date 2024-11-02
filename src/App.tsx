import {useEffect, useState} from "react";
import axios from "axios";
import User from "./User.ts";

export default function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get<User[]>('http://localhost:3000/xusers')
            .then(res => setUsers(res.data))
            .catch(err => setError(err.message));
    }, []);

    return <>
        {error && <p className="text-danger">{error}</p>}
        <ul>
            {users.map((user: User) => <li key={user.id}>{user.name}</li>)}
        </ul>
    </>;
}