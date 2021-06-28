import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import scc from "../assets/success.png";
const UserModal = (props) => {
  const [success, setSuccess] = useState(false);

  const { handleSubmit, register } = useForm();
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={() => {
        props.close();
        setSuccess(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {success ? (
            <h2>Utilisateur Ajouté</h2>
          ) : (
            <h2>Ajouter Un Utlisateur</h2>
          )}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!success && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="forme-group form-fields">
              <label htmlFor="username">Nom d'utilisateur:</label>
              <input
                className="form-control"
                name="username"
                placeholder="Nom d'utilisateur"
                type="text"
                {...register("username", { required: true })}
              />
            </div>
            <div className="forme-group form-fields">
              <label htmlFor="password">Mot de Passe:</label>
              <input
                className="form-control"
                name="password"
                placeholder="Mot de Passe"
                type="password"
                {...register("password", { required: true })}
              />
            </div>
            <p></p>
            <div className="button-form">
              <button type="submit" className="btn btn-success add-btn">
                Enregistrer
              </button>
            </div>
          </form>
        )}
        {success && (
          <div className="success-vector">
            <img src={scc} alt="" />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.close();
            setSuccess(false);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
