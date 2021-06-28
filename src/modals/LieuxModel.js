import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import scc from "../assets/success.png";
import { addLieux } from "../api/themes";
const LieuxModal = (props) => {
  const [success, setSuccess] = useState(false);
  const [serverError, setserverError] = useState();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = async (values) => {
    let result = await addLieux(values);
    if (!result.ok) {
      setserverError("Erreur Serveur");
      return;
    }
    setSuccess(true);
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
          {success ? <h2>Lieux Ajouté</h2> : <h2>Ajouter Un Lieux</h2>}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {!success && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="forme-group form-fields">
              <label htmlFor="label">Lieux:</label>
              <input
                className="form-control"
                name="label"
                placeholder="Lieux"
                type="text"
                {...register("label", { required: true })}
              />
            </div>

            <p></p>
            <div className="button-form">
              <button type="submit" className="btn btn-success add-btn">
                Enregistrer
              </button>
            </div>
            {Object.keys(errors).length != 0 && (
              <p className="text-danger">{"Formulaire Invalide"}</p>
            )}
            {serverError && <p className="text-danger">{serverError}</p>}
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

export default LieuxModal;
