import { Link, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import "../components/index.css";
const Header = () => {
    let path = useLocation()
    return (
        <>
            <div className="container-fluid d-flex">
                {/* <span className="navbar-brand"><img src="../images/logo.png" alt="logo" /></span> */}
                <Nav className="justify-content-center navbar " >
                    <Nav.Item>
                        <Link className="active" to="/home">Home </Link>
                        {/* <Link className={path.pathname === "/home" ? "active" : ""} to="/home">HOme </Link> */}
                    </Nav.Item>
                </Nav>
            </div>
        </>
    )
}
export default Header