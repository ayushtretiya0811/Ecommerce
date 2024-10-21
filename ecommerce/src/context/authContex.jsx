import react, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token , setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [authenticate, setAuthenticate] = useState(false);
  const navigate = useNavigate();
  const [userdetail, setUserDetail] = useState()
  console.log("user detail", userdetail);
  // console.log(user?._id)
  useEffect(() => {
    const storedUser  = JSON.parse(localStorage.getItem('user'));
    const storedToken  = JSON.parse(localStorage.getItem('token'));
    // getUser();
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      console.log("userId", user?._id.toString());
      setAuthenticate(true);
      getUser(storedUser?._id);
        // Fetch user details if not available
    }
  }, []);
  
  // useEffect (() => {
  //   if (user && token) {
  //       getUser(user._id);
  //   }
  // }, [user , token])
//   useEffect(() => {
//     const interval = setInterval(async () => {
//         if (user) {
//             await getUser(user._id);
//         }
//     }, 6000); // Check every minute

//     return () => clearInterval(interval); // Clean up on unmount
// }, [user]);

  const getUser = async (userId) => {
   

    try {
      const res = await axios.get( 
        `${import.meta.env.VITE_REACT_APP_API}/api/user/userDetail/${userId.toString()}`,
      
    
        {
          Headers: {
            
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log( "user detail", res.data);
        if (res.data.success) {
            setUserDetail(res.data.user);
            localStorage.setItem('userdetail', JSON.stringify(res.data.user)) // Ensure this is called only if the request was successful
        } else {
            console.error("Failed to fetch user details");
        }

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (user && token) {
      getUser();
     
    }
  },[user])
  const register = async (username, email, password) => {
    setLoading(true);
    try {
      const res = await axios.post( 
        `${import.meta.env.VITE_REACT_APP_API}/api/user/register`,
        { username, email, password },
        {
          Headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setLoading(false);
        // toast.success(res.data.message)
        toast.success("Register successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message);
        setLoading(false);
        navigate("/register");
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message)
    }
  };
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/user/login`,
        { email, password }
      );

      if (res.data.success) {
        setLoading(false);
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        setUser(res.data.user);
        setToken(res.data.token);
        // setAuthenticate(true);
        // toast.success("Login successfully");
        toast.success(res.data.message);
        navigate("/")
      } else {
        setLoading(false);
        toast.error(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      setLoading(false); // Ensure loading state is reset on error
      const errorMessage = error.response?.data?.message || "An error occurred during login."; // Display a generic error message
      console.log(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userdetail");
    setUser(null);
    setToken(null);
    setUserDetail(null);
    // setAuthenticate(false);
    navigate("/login");
    toast.success("Logout successfully");
  }

  return (
    <AuthContext.Provider value={{email, setEmail, getUser, register,userdetail,setUserDetail, login,logout,authenticate, user, setUser , token,setToken, setLoading, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
