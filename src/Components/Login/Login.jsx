import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { Helmet } from "react-helmet";

export default function Login({ saveUserData }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [errorList, setErrorList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function userDataHandler(e) {
    const myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function sendLoginDataToApi() {
    const { data } = await axios.post(
      "https://route-movies-api.vercel.app/signin",
      user
    );
    if (data.message == "success") {
      setIsLoading(false);
      localStorage.setItem("userToken", data.token);
      saveUserData();
      navigate("/");
    } else {
      setIsLoading(false);
      setError(data.message);
    }
  }

  function submitLoginForm(e) {
    e.preventDefault();
    setIsLoading(true);

    const validation = validateLoginForm();
    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);
    } else {
      sendLoginDataToApi();
    }
  }

  function validateLoginForm() {
    const scheme = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .pattern(
          /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        )
        .required()
        .messages({
          "string.empty":
            "Please enter your email adress in format: yourname@example.com",
        }),
      password: Joi.string()
        .min(6)
        .max(20)
        .pattern(/^[a-zA-Z0-9_]{0,9}$/)
        .messages({
          "string.min":
            '"Password" must contains only letters and numbers at least 6',
        }),
    });
    return scheme.validate(user, { abortEarly: false });
  }

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Login Page</title>
      </Helmet>
      <div className="w-100 p-2 mt-4 bg-info text-center">
        <h3 className="my-4">Login Form</h3>
      </div>

      {error && <div className="alert alert-danger mt-4">{error}</div>}

      <form onSubmit={submitLoginForm} className="mt-4">
        <label htmlFor="email">Email :</label>
        <input
          onChange={userDataHandler}
          type="email"
          name="email"
          id="email"
          className="form-control my-input my-3 mt-2"
        />
        {errorList.filter((err) => err.context.label == "email")[0]?.message ? (
          <div className="alert alert-danger my-3">
            {
              errorList.filter((err) => err.context.label == "email")[0]
                ?.message
            }
          </div>
        ) : (
          ""
        )}

        <label htmlFor="password">Password :</label>
        <input
          onChange={userDataHandler}
          type="password"
          name="password"
          id="password"
          className="form-control my-input my-3 mt-2"
        />
        {errorList.filter((err) => err.context.label == "password")[0]
          ?.message ? (
          <div className="alert alert-danger my-3">
            {
              errorList.filter((err) => err.context.label == "password")[0]
                ?.message
            }
          </div>
        ) : (
          ""
        )}

        <button type="submit" className="btn btn-info">
          {isLoading === true ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </>
  );
}
