import {useEffect, useState} from "react";
import axios from "axios";
import User from "./User.ts";

export default function App() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get<User[]>('http://localhost:3000/users')
            .then(res => setUsers(res.data))
    }, []);

    return <ul>
        {users.map((user: User) => <li key={user.id}>{user.name}</li>)}
    </ul>;
}