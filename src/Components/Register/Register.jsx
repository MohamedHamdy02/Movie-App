import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const [errorList, setErrorList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function userDataHandler(e) {
    const myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }

  async function sendReisterDataToApi() {
    const { data } = await axios.post(
      `https://route-movies-api.vercel.app/signup`,
      user
    );
    if (data.message === "success") {
      setIsLoading(false);
      setError(null)
      navigate("/login");
    } else {
      setIsLoading(false);
      setError(data.message);
    }
  }

  function submitRegisterForm(e) {
    e.preventDefault();
    setIsLoading(true);

    const validation = validateRegisterForm();
    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);
    } else {
      sendReisterDataToApi();
    }
  }

  function validateRegisterForm() {
    const schema = Joi.object({
      first_name: Joi.string()
        .pattern(/^[A-Z][a-z]/)
        .min(3)
        .max(10)
        .required()
        .messages({
          "string.empty": '"First Name" is required and can not be empty',
          "string.pattern.base":
            "You have to enter a capital letter and at least 3 letters",
        }),
      last_name: Joi.string()
        .pattern(/^[A-Z][a-z]/)
        .min(3)
        .max(10)
        .required()
        .messages({
          "string.empty": '"Last Name" is required and can not be empty',
          "string.pattern.base":
            "You have to enter a capital letter and at least 3 letters",
        }),
      age: Joi.number().min(16).max(99).required().messages({
        "number.min": '"Age" must be more than 16 years old.',
      }),
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
        .pattern(/^[a-zA-Z0-9_]{0,15}$/)
        .messages({
          "string.min":
            '"Password" must contains only letters and numbers at least 6',
          'string.pattern.base': '"Password" must contains only letters and numbers at least 6'
        }),
    });
    return schema.validate(user, { abortEarly: false });
  }

  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Registration Page</title>
      </Helmet>
      <div className="w-100 p-2 mt-4 bg-info text-center">
        <h3 className="my-4">Registration Form</h3>
      </div>

      {error && <div className="alert alert-danger mt-4">{error}</div>}

      <form onSubmit={submitRegisterForm} className="mt-4">
        <label htmlFor="first_name">First name :</label>
        <input
          onChange={userDataHandler}
          type="text"
          name="first_name"
          id="first_name"
          className="form-control my-input my-3 mt-2"
        />
        {errorList.filter((err) => err.context.label == "first_name")[0]
          ?.message ? (
          <div className="alert alert-danger my-3">
            {
              errorList.filter((err) => err.context.label == "first_name")[0]
                ?.message
            }
          </div>
        ) : (
          ""
        )}

        <label htmlFor="last_name">Last name :</label>
        <input
          onChange={userDataHandler}
          type="text"
          name="last_name"
          id="last_name"
          className="form-control my-input my-3 mt-2"
        />
        {errorList.filter((err) => err.context.label == "last_name")[0]
          ?.message ? (
          <div className="alert alert-danger my-3">
            {
              errorList.filter((err) => err.context.label == "last_name")[0]
                ?.message
            }
          </div>
        ) : (
          ""
        )}

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
          className="form-control my-input my-3"
        />
        {errorList.filter((err) => err.context.label == "password")[0]
          ?.message ? (
          <div className="alert alert-danger my-3 mt-2">
            {
              errorList.filter((err) => err.context.label == "password")[0]
                ?.message
            }
          </div>
        ) : (
          ""
        )}

        <label htmlFor="age">Age :</label>
        <input
          onChange={userDataHandler}
          type="number"
          name="age"
          id="age"
          className="form-control my-input my-3 mt-2"
        />
        {errorList.filter((err) => err.context.label == "age")[0]?.message ? (
          <div className="alert alert-danger my-3">
            {errorList.filter((err) => err.context.label == "age")[0]?.message}
          </div>
        ) : (
          ""
        )}

        <button type="submit" className="btn btn-info">
          {isLoading === true ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            "Sign Up"
          )}
        </button>
        <p className="text-center mt-4 mb-5">Already have an account? <Link className="text-info" to="/login">Login</Link></p>
      </form>
    </>
  );
}
