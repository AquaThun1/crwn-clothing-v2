import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const loginGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };
  return (
    <>
      <h1>Sign In Page</h1>
      <button onClick={() => loginGoogleUser()}>Sign-in</button>
    </>
  );
};

export default SignIn;
