import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { addListing, getEventFields, planEvent } from "../api/event";
const Add = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [error, seterror] = useState();

  const [fields, setfields] = useState();

  const onSubmit = async (values) => {
    const sDate = new Date(values.startDate);
    const eDate = new Date(values.endDate);
    const diffDays = sDate.getTime() - eDate.getTime();
    if (diffDays > 0) {
      seterror("Erreur de Date");
      return;
    }
    if (values.file[0]) {
      const result = await addListing(values, values.file[0]);
      if (!result.ok) {
        seterror("Erreur Serveur");

        return;
      }
      alert("Ajouter avec Succès");
      window.location.reload();
    } else {
      delete values["file"];
      planEvent(values);
      alert("Ajouter avec Succès");
      window.location.reload();
    }
  };
  const getFields = async () => {
    const result = await getEventFields();
    if (!result.ok) {
      console.log("erreur de connection");
    }
    setfields(result.data);
  };
  useEffect(() => {
    getFields();
  }, []);

  return (
    <div>
      <form id="login-form" className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="logo-container">
          {error && <p className="text-danger">{error}</p>}
          {Object.keys(errors).length != 0 && (
            <p className="text-danger">{"Formulaire Invalide"}</p>
          )}
        </div>
        <Row>
          <Col>
            <div className="form-group">
              <label className="text-info">Référence</label>
              <br />
              <input
                type="text"
                name="reference"
                id="reference"
                className="form-control"
                {...register("reference", { required: true })}
              />
            </div>

            <div className="form-group">
              <label className="text-info">Objet</label>
              <br />
              <input
                type="text"
                name="objet"
                id="objet"
                className="form-control"
                {...register("objet", { required: true })}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label className="text-info">Edition</label>
              <br />
              <input
                type="text"
                name="eventEdition"
                id="eventEdition"
                className="form-control"
                {...register("eventEdition", { required: true })}
              />
            </div>

            <div className="form-group">
              <label className="text-info">Couleur</label>
              <br />
              <select
                {...register("bgColor", { required: true })}
                className="form-control"
              >
                <option value="#179DE0">Bleu</option>
                <option value="#FC3545"> Rouge</option>
                <option value="#F4D511">Jaune</option>
                <option value="#52C652">Vert</option>
              </select>
            </div>
          </Col>

          <Col>
            <div className="form-group">
              <label className="text-info">Date Début</label>
              <br />
              <input
                type="date"
                name="startDate"
                id="startDate"
                className="form-control"
                {...register("startDate", { required: true })}
              />
            </div>

            <div className="form-group">
              <label className="text-info">Date Fin</label>
              <br />
              <input
                type="date"
                name="endDate"
                id="endDate"
                className="form-control"
                {...register("endDate", { required: true })}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="form-group">
              <label className="text-info">Lieux</label>
              <br />
              <Controller
                name="lieux"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select {...field} options={fields ? fields.lieux : []} />
                )}
              />
            </div>
            <div className="form-group">
              <label className="text-info">Représentant</label>
              <br />
              <Controller
                name="representants"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={fields ? fields.representants : []}
                    isMulti
                  />
                )}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label className="text-info">Thème</label>
              <br />
              <Controller
                name="themEvent"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select {...field} options={fields ? fields.themes : []} />
                )}
              />
            </div>
            <div className="form-group">
              <label className="text-info">Fichier</label>
              <br />
              <input
                type="file"
                name="file"
                multiple
                id="file"
                className="form-control"
                {...register("file", { required: false })}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="form-group">
              <label className="text-info">Activités</label>
              <br />

              <textarea
                type="textarea"
                name="activites"
                id="activites"
                className="form-control"
                {...register("activites", { required: false })}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label className="text-info">Suggestions</label>
              <br />
              <textarea
                type="textarea"
                name="suggestions"
                id="suggestions"
                className="form-control"
                {...register("suggestions", { required: false })}
              />
            </div>
          </Col>
        </Row>
        <div className="form-group">
          <input
            type="submit"
            name="submit"
            className="btn btn-info btn-md"
            value="Enregistrer"
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
