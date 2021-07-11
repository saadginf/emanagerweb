import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { editListing, getEvent, getEventFields, planEvent } from "../api/event";
const Edit = () => {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const [error, seterror] = useState();
  const [event, setevent] = useState();
  const [fields, setfields] = useState();
  let { id } = useParams();
  const getEventDetails = async (value) => {
    let result = await getEvent(value);
    if (!result.ok) {
      console.log("Error Guetting Events check Your Internet Connection");
      return;
    }
    setevent(result.data);
    console.log(result.data);
  };
  const onSubmit = async (values) => {
    console.log(values);
    const result = await editListing(values, values.file[0]);
    if (!result.ok) {
      seterror("Erreur Serveur");

      return;
    }
    alert("Modifié avec Succès");
    // window.location.reload();
    history.push("/search/" + id);
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
    getEventDetails(id);
  }, []);

  if (event) {
    if (event.fileLink) {
      return (
        <div>
          <p>Page non Autorisée</p>
        </div>
      );
    }
  }

  return (
    <div>
      {event && (
        <form
          id="login-form"
          className="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="logo-container">
            {error && <p className="text-danger">{error}</p>}
            {Object.keys(errors).length != 0 && (
              <p className="text-danger">{"Formulaire Invalide"}</p>
            )}
          </div>
          <input
            type="text"
            name="id"
            id="id"
            className="form-control"
            value={event.id}
            hidden
            {...register("id", { required: true })}
          />
          <Row>
            <Col>
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
                <label className="text-info">Fichier</label>
                <br />
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="form-control"
                  {...register("file", { required: true })}
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
                  {...register("activites", { required: true })}
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
                  {...register("suggestions", { required: true })}
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
      )}
    </div>
  );
};

export default Edit;
