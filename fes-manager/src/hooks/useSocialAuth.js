// src/hooks/useSocialAuth.js
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, OAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";

const useSocialAuth = () => {
  const handleProviderLogin = async (providerName) => {
    let provider;

    switch (providerName) {
      case "google":
        provider = new GoogleAuthProvider();
        break;
      case "facebook":
        provider = new FacebookAuthProvider();
        break;
      case "twitter":
        provider = new TwitterAuthProvider();
        break;
      case "microsoft":
        provider = new OAuthProvider("microsoft.com");
        break;
      case "yahoo":
        provider = new OAuthProvider("yahoo.com");
        break;
      default:
        throw new Error("Unknown provider");
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      greet("Social Login Success", user);
      return { success: true, user };
    } catch (error) {
      console.error("❌ Social Login Error", error);
      return { success: false, error };
    }
  };

  return { handleProviderLogin };
};

export default useSocialAuth;
