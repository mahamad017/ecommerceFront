import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Api from "../../../tools/api";
import styles from "./style.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Api.fetch({
          url: "users",
          method: "GET",
          token: localStorage.getItem("token"),

        });
        console.log(response.data)
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div class="main-table-containter ">
        <div class="title-table-container">
          <div class="subtitle">USERS</div>
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
                    <div class="pendiente">{user.email}</div>
                  </td>
                  <td>{user.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 
      <h1>Dashboard</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </Table> */}
    </div>
  );
};

export default Dashboard;
