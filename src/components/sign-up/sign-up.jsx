import React, { useState } from "react";
import FormInput from "../../components/form-input/form-input-component";
import Button from "../../components/custom-button/custom-button";
import { auth, createUserProfileDocument } from "../../Firebase/firebase.utils";

import "./sign-up.style.scss";

export default function Signup() {
  const [signUp, setSignUp] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (signUp.password !== signUp.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        signUp.email,
        signUp.password
      );
      await createUserProfileDocument(user, {
        displayName: signUp.displayName,
      });

      setSignUp({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setSignUp({ ...signUp, [name]: value });
  }

  return (
    <div className="sign-up">
      <h2 className="title"> I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={signUp.displayName}
          onChange={handleChange}
          label="displayname"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={signUp.email}
          onChange={handleChange}
          label="email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={signUp.password}
          onChange={handleChange}
          label="password"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={signUp.confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          required
        />
        <Button type="submit"> SIGN UP </Button>
      </form>
    </div>
  );
}
