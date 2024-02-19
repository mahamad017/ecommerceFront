import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import Api from "../../../tools/api";
import styles from "./style.css";

const CtategoriesAction = () => {
    const [cate, setCate] = useState([]);
    const [load, setLoad] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        fetchcat();
    }, []);
    const fetchcat = async () => {
        try {
            const response = await Api.fetch({
                url: "categories",
                method: "GET",
                token: localStorage.getItem("token"),
            });
            setCate(response.data);
            setLoad(false);
        } catch (error) {
            setErr(error);
            setLoad(false);
        }
    };

    const handleDelete = async (catId) => {
        try {
            const response = await Api.fetch({
                url: `categories/${catId}`,
                method: "DELETE",
                token: localStorage.getItem("token"),
            });

            fetchcat();
        } catch (error) {
            setErr(error);
        }
    };

    if (load) {
        return <div>Loading...</div>;
    }

    if (err) {
        return <div>Error: {err.message}</div>;
    }

    return (
        <div>
            <div className="main-table-containter ">
                <div className="title-table-container">
                    <div className="subtitle">categories</div>
                </div>
                <div>
                    <table>
                        <thead>
                            <th>id</th>
                            <th>name</th>
                        </thead>
                        <tbody>
                            {cate.map((category, index) => (
                                <tr key={index}>
                                    <td> {index + 1}</td>
                                    <td>{category.name}</td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleDelete(category.id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CtategoriesAction;
