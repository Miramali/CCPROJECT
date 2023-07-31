import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SidaNav2() {
    const user = useSelector(state => state.currentUser)
    const userRole = user.role
    return (
        <div className="SidaNav2 d-flex gap-4 justify-content-start align-items-start m-0 p-0 text-left ">
            <div className="container-fluid">
                <div className="sidnav-top d-flex justify-content-start align-items-start ">
                    <ul>
                        <li className="py-1 ">
                            {" "}
                            <Link to="#" className="text-dark fw-bold text-decoration-none">

                                edit profile
                            </Link>
                        </li>
                        <li className="py-1">
                            {" "}
                            <Link to="#" className="text-dark fw-bold text-decoration-none">
                                {" "}
                                settings{" "}
                            </Link>{" "}
                        </li>
                        <li className="py-1">
                            {" "}
                            <Link to="#" className="text-dark fw-bold text-decoration-none">
                                {" "}
                                Terms and privecy{" "}
                            </Link>{" "}
                        </li>
                    </ul>
                </div>{" "}
                {/** end sidnav-top */}
                <ul className="sidnavt-bottom d-flex gap-2 myReq">
                    <Link
                        to="/PostRequest"
                        className="text-dark fw-bold text-decoration-none"
                    >
                        <li className="sidnavt-bottom-left">
                            {
                                userRole ? 'My requests' : 'My oppertunities'
                            }
                        </li>
                    </Link>
                </ul>
                <ul className="sidnavt-bottom d-flex gap-2 myReq">
                    <Link
                        to="/PostRequest"
                        className="text-dark fw-bold text-decoration-none"
                    >
                        <li className="sidnavt-bottom-left">
                            {
                                userRole ? 'new mentoring request' : 'new mentoring oppertunity'
                            }
                        </li>
                    </Link>

                    <Link to="#" className="text-dark fw-bold text-decoration-none">
                        <li className="sidnavt-bottom-Right flex-shrink-1 bg-blue">+</li>{" "}
                    </Link>
                </ul>
            </div>{" "}
        </div> /** end SidaNav2 */
    );
}

export default SidaNav2;
