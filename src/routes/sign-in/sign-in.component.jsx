import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const loginGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  const loginGoogleRedirectUser = async () => {
    const { user } = await signInWithGoogleRedirect();
    console.log({ user });
  };

  return (
    <>
      <h1>Sign In Page</h1>
      <button onClick={() => loginGoogleUser()}>Sign-in</button>
      <button onClick={() => loginGoogleRedirectUser()}>
        Sign-in with google redirect
      </button>
    </>
  );
};

export default SignIn;
