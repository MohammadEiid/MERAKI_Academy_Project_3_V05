// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import "./style.css";

// import { AuthContext } from "../../contexts/authContext";

// //===============================================================

// const NavBar = () => {
//   const { logout, isLoggedIn } = useContext(AuthContext);

//   //===============================================================

//   return (
//     <>
//       <div className="NavBar">
//         {isLoggedIn ? (
//           <>
//             <Link className="Link" to="/dashboard">
//               Dashboard
//             </Link>
//             <Link className="Link" to="/newArticle">
//               Add New Article
//             </Link>
//             <button className="logout" onClick={logout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link className="Link" to="/">
//               Register
//             </Link>
//             <Link to="/login">Login</Link>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default NavBar;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/reducers/auth";
import "./style.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <div className="NavBar">
      {isLoggedIn ? (
        <>
          <Link className="Link" to="/dashboard">
            Dashboard
          </Link>
          <Link className="Link" to="/newArticle">
            Add New Article
          </Link>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link className="Link" to="/">
            Register
          </Link>
          <Link className="Link" to="/login">
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default NavBar;
