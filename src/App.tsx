import {useEffect, useState} from "react";
import axios, {CanceledError} from "axios";
import User from "./User.ts";

export default function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        axios.get<User[]>('https://jsonplaceholder.typicode.com/users', {signal: controller.signal})
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

        axios.delete('https://jsonplaceholder.typicode.com/users/' + user.id)
            .catch(err => {
                setError(err.message);
                setUsers(originalUsers);
            });
    };

    const addUser = () => {
        const originalUsers = [...users];
        const newUser: User = {id: users.length + 1, name};
        setUsers([...users, newUser]);

        axios.post('https://jsonplaceholder.typicode.com/users', newUser)
            .then(res => {
                setUsers([...users, res.data]);
                setName("");
            })
            .catch(err => {
                setError(err.message);
                setUsers(originalUsers);
            });
    };

    return <div className="p-5">
        {error && <p className="text-danger">{error}</p>}
        {isLoading && (<div className="spinner-border"></div>)}
        <div className="d-flex mb-3">
            <input required value={name} type="text" className="form-control me-3" onChange={(e) => setName(e.target.value)}/>
            <button className="btn btn-primary" onClick={addUser}>Add</button>
        </div>
        <ul className="list-group">
            {users.map((user: User) => <li key={user.id} className="list-group-item d-flex justify-content-between">
                {user.name}
                <button className="btn btn-outline-danger" onClick={() => deleteUser(user)}>Delete</button>
            </li>)}
        </ul>
    </div>;
}