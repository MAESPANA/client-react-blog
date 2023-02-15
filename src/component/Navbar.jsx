import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.jpeg";

const Navbar = () => {
  const { currentUser,logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="container">
        <Link className="link" to="/">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        </Link>
        
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ARTE</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>CIENCIA</h6>
          </Link>
          {/* <Link className= "link" to="/?cat=technology"><h6>TECHNOLOGY</h6></Link> */}
          <Link className="link" to="/?cat=cinema">
            <h6>CINE</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DISENO</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>COMIDA</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          { currentUser ?
          (
            <Link className="link" to={`/write`}>
          <span className="write">Escribe</span>
        </Link>
          )
          :
          (
            <Link className="link" to={`/`}>
          <span className="write"></span>
        </Link>
          )
          
          }

        </div>
      </div>
    </div>
  );
};

export default Navbar;
