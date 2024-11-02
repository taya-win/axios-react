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

    const deleteUser = (user: User) => {
        const originalUsers = [...users];
        setUsers(users.filter(u => u.id !== user.id));

        axios.delete('http://localhost:3000/users/' + user.id)
            .catch(err => {
                setError(err.message);
                setUsers(originalUsers);
            });
    };

    return <div className="p-5">
        {error && <p className="text-danger">{error}</p>}
        {isLoading && (<div className="spinner-border"></div>)}
        <ul className="list-group">
            {users.map((user: User) => <li key={user.id} className="list-group-item d-flex justify-content-between">
                {user.name}
                <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>Delete</button>
            </li>)}
        </ul>
    </div>;
}