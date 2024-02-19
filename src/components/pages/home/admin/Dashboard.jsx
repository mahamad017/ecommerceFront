import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Api from "../../../../tools/api";
import styles from "../style.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);
    const fetchUsers = async () => {
        try {
            const response = await Api.fetch({
                url: "users",
                method: "GET",
                token: localStorage.getItem("token"),
            });
            setUsers(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        try {
            const response = await Api.fetch({
                url: `users/${userId}`,
                method: "DELETE",
                token: localStorage.getItem("token"),
            });

            fetchUsers();
        } catch (error) {
            setError(error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <div className="main-table-containter ">
                <div className="title-table-container">
                    <div className="subtitle">USERS</div>
                </div>
                <div>
                    <table>
                        <thead>
                            <th>id</th>
                            <th>email</th>
                            <th>name</th>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td> {index + 1}</td>

                                    <td>
                                        <div className="pendiente">{user.email}</div>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleDelete(user.id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ position: "fixed", bottom: "70px", right: "40px", zIndex: "1000" }}>
                        <Link to="adduser">
                            <button className="btn btn-secondary shadow-lg rounded btn-lg " pill style={{ width: "50px", height: "50px" }}>
                                +
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
