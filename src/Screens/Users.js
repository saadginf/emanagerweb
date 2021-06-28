import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { getUsers } from "../api/auth";
import LieuxModal from "../modals/LieuxModel";
import ThemeModal from "../modals/ThemeModal";
import UserModal from "../modals/UserModal";
import "./Users.css";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [show, setshow] = useState(false);
  const [showTheme, setshowTheme] = useState(false);
  const [showLieux, setshowLieux] = useState(false);
  const getAllUsers = async (value) => {
    let result = await getUsers();
    if (!result.ok) {
      console.log("Error Guetting Users check Your Internet Connection");
      return;
    }
    setUsers(result.data);
    console.log(result.data);
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div>
      <UserModal show={show} close={() => setshow(false)} />
      <ThemeModal show={showTheme} close={() => setshowTheme(false)} />
      <LieuxModal show={showLieux} close={() => setshowLieux(false)} />
      <div className="sugg-act">
        <h5>Users</h5>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>id</th>
              <th>Username</th>
              <th>Roles</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.username}</td>
                  <td>
                    {u.appRoles.map((r) => (
                      <p key={r.id}>{r.roleName}</p>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="sugg-act">
        <h5>Settings</h5>
        <div className="settings-users">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setshowTheme(true)}
          >
            Ajouter un Thème
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setshowLieux(true)}
          >
            Ajouter un Lieux
          </Button>
          <Button variant="secondary" size="lg" onClick={() => setshow(true)}>
            Ajouter un Utilisateurs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Users;
