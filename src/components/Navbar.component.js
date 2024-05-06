import { useEffect, useState } from "react";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "../assets/images/logo.png";
import Wrapper from "../styles/styled/Navbar.styled";
import PAGES from "../constants";

const ADMIN_USER = "admin";
const [vote, login, admin, results, voteLog, main] = PAGES;
const EMPTY_USER = { StudentID: "", name: "", password: "" };

const Navbar = ({ user, setUser, setCurrentPage }) => {
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const closeNavbar = (event) => {
      const dropdownElement = document.querySelector(".dropdown");
      const logoutButton = document.querySelector(".dropdown-btn[onClick*='handleLogout']");

      if (
        !dropdownElement.contains(event.target) &&
        !event.target.matches(".dropdown-btn[onClick*='handleLogout']") &&
        !logoutButton?.contains(event.target)
      ) {
        setShowLogout(false);
      }
    };

    document.body.addEventListener("click", closeNavbar);

    return () => {
      document.body.removeEventListener("click", closeNavbar);
    };
  }, [showLogout]);

  const handleLogout = () => {
    setUser(EMPTY_USER);
  };

  const handleClickedResults = () => setCurrentPage(results);
  const handleClickedVote = () => setCurrentPage(vote);
  const handleClickedVoteLog = () => setCurrentPage(voteLog);
  const handleClickedAdmin = () => setCurrentPage(admin);
  const handleClickedMain = () => setCurrentPage(main);

  const isAdmin = () => user.type === ADMIN_USER;

  return (
    <Wrapper>
      <div className="nav-center">
        <img src={Logo} height="60" alt="logo" />
        <div className="btn-container">
          <button
            type="button"
            className="btn drop-down-main-btn"
            onClick={(event) => {
              event.stopPropagation();
              setShowLogout(!showLogout);
            }}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={handleLogout}>
              logout
            </button>
            <button type="button" className="dropdown-btn" onClick={handleClickedMain}>
              Main
            </button>
            <button type="button" className="dropdown-btn" onClick={handleClickedVote}>
              vote
            </button>
            <button type="button" className="dropdown-btn" onClick={handleClickedResults}>
              투표 결과
            </button>
            <button type="button" className="dropdown-btn" onClick={handleClickedVoteLog}>
              Vote Log
            </button>
            <button type="button" className={"dropdown-btn " + (isAdmin() ? "" : "not-admin-btn")} onClick={handleClickedAdmin}>
              Admin
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;