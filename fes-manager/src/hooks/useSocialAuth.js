import { useState, useEffect } from "react";
import { onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, OAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";  // Import auth instance from firebase
import { useNavigate } from "react-router-dom";

const useSocialAuth = () => {
  const [userName, setUserName] = useState(null);  // Add state to store user name
  const navigate = useNavigate();  // Initialize navigate function

  // Listen for changes in authentication state and update userName
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        setUserName(user.displayName);  // Store user's name
        navigate("/LiveProjects");  // Redirect to profile page or dashboard
      } else {
        console.log("No user is logged in");
        navigate("/");  // Redirect to signup if not logged in
      }
    });

    return () => unsubscribe();  // Clean up listener on component unmount
  }, [navigate]);

  // Function to check user login status explicitly
  const checkUserLoggedIn = () => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName);  // Store user name if already logged in
      navigate("/LiveProjects");  // Navigate to profile page
    } else {
      navigate("/");  // Navigate to signup page if no user is logged in
    }
  };

  // Handle social login for different providers
  const handleProviderLogin = async (providerName, role) => {
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
      console.log("Social Login Success:", user);
      setUserName(user.displayName);  // Set user name after successful login

      // Navigate to the appropriate page based on the role
      if (role === "Admin") {
        navigate("/AdminDashboard");
      } else if (role === "Altruist") {
        navigate("/LiveProjects");
      } else {
        navigate("/CreateProfile");
      }

      return { success: true, user };
    } catch (error) {
      console.error("❌ Social Login Error", error);
      return { success: false, error };
    }
  };

  return { handleProviderLogin, userName, checkUserLoggedIn };  // Return checkUserLoggedIn
};

export default useSocialAuth;
