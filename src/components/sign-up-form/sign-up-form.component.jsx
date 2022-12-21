import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (confirmPassword !== password) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      const userDocRef = await createUserDocumentFromAuth(user, {
        displayName,
      });

      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      }
      console.log(error.message);
    }
  };

  return (
    <>
      <h1>Sign-up with your Email and Password</h1>
      <form on onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          required
          type={"text"}
          name={"displayName"}
          value={displayName}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          required
          type={"email"}
          name={"email"}
          value={email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          required
          type={"password"}
          name={"password"}
          value={password}
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          required
          type={"password"}
          name={"confirmPassword"}
          value={confirmPassword}
          onChange={handleChange}
        />

        <button type='submit'>Sign-up</button>
      </form>
    </>
  );
};

export default SignUpForm;
