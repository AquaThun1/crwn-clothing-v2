import { useState } from "react";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

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
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign-up with your Email and Password</span>
      <form on onSubmit={handleSubmit}>
        <FormInput
          label={"Display Name"}
          required
          type={"text"}
          name={"displayName"}
          value={displayName}
          onChange={handleChange}
        />

        <FormInput
          label={"Email"}
          required
          type={"email"}
          name={"email"}
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label={"Password"}
          required
          type={"password"}
          name={"password"}
          value={password}
          onChange={handleChange}
        />

        <FormInput
          label={"Confirm Password"}
          required
          type={"password"}
          name={"confirmPassword"}
          value={confirmPassword}
          onChange={handleChange}
        />

        <Button>Sign-up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
