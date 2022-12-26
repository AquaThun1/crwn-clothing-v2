import { useState } from "react";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithEmailAndPasswordAnonymously,
} from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const loginGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPasswordAnonymously(email, password);
      resetFormFields();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={"sign-in-container"}>
      <h2>I already have an account</h2>
      <span>Sign-in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Email"}
          name={"email"}
          value={email}
          onChange={handleChange}
          required
          type={"email"}
        />
        <FormInput
          label={"Password"}
          name={"password"}
          value={password}
          onChange={handleChange}
          required
          type={"password"}
        />
        <div className='buttons-container'>
          <Button type={"submit"}>Sign-in</Button>
          <Button
            type={"button"}
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={() => loginGoogleUser()}
          >
            Sign-in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
