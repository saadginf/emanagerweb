import React, { useState } from "react";

import { useForm } from "react-hook-form";

import "./Login.css";
import logo from "../assets/logo.jpeg";
import Footer from "../Layout/Footer";
import { getToken } from "../api/auth";
import { StoreToken } from "../auth/storage";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [error, seterror] = useState();

  const onSubmit = async (values) => {
    const result = await getToken(values.username, values.password);

    if (!result.ok) {
      seterror("Erreur D'Authentification");

      return;
    }
    console.log(result);
    StoreToken(result.data.token, result.data.refreshToken);
    window.location.reload();
  };

  return (
    <div className="login-container">
      <div id="login">
        <h2 className="text-center text-white pt-5">
          Gestion des Activités <br />
          de la Division Technique
        </h2>

        <div className="container">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form
                  id="login-form"
                  className="form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="logo-container">
                    <img src={logo} alt="logo" height="100px" />
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                  <div className="form-group">
                    <label className="text-info">Nom d'Utilisateur:</label>
                    <br />
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="form-control"
                      {...register("username", { required: true })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-info">Mot de Passe:</label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      {...register("password", { required: true })}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      name="submit"
                      className="btn btn-info btn-md"
                      value="Connexion"
                    />
                  </div>
                </form>
                <div className="login-footer">
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
