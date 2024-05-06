import { useEffect, useState } from "react";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "../assets/images/logo.png";

import Wrapper from "../styles/styled/Navbar.styled";

import PAGES from "../constants";

const ADMIN_USER = "admin";

const [vote, login, admin, results, voteLog, main, voteCreate] = PAGES; // voteCreate 페이지 추가

const Navbar = ({ user, setUser, setCurrentPage }) => {
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const closeNavbar = (event) => {
      if (!showLogout) {
        return;
      }
      setShowLogout(false);
    };

    document.body.addEventListener("click", closeNavbar);

    return () => {
      document.body.removeEventListener("click", closeNavbar);
    };
  }, [showLogout]);

  const handleLogout = () => {
    setUser({ name: "", type: "", email: "", id: "" });
  };
  const handleClickedResults = () => setCurrentPage(results);
  const handleClickedVote = () => setCurrentPage(vote);
  const handleClickedVoteLog = () => setCurrentPage(voteLog);
  const handleClickedAdmin = () => setCurrentPage(admin);
  const handleClickedMain = () => setCurrentPage(main); // main 페이지로 이동하는 함수 추가
  const handleClickedCreate = () => setCurrentPage(voteCreate); // 투표생성페이지 이동에 사용

  const isAdmin = () => user.type === ADMIN_USER;
  const adminsBtn = () => (isAdmin() ? "" : "not-admin-btn");

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
            <button
              type="button"
              className="dropdown-btn"
              onClick={handleLogout}
            >
              logout
            </button>
            <button type="button" className="dropdown-btn" onClick={handleClickedResults}>
              투표 결과
            </button>

            <button
              type="button"
              className={"dropdown-btn " + adminsBtn()}
              onClick={handleClickedVote}
            >
              vote
            </button>

            <button
              type="button"
              className={"dropdown-btn " + adminsBtn()}
              onClick={handleClickedAdmin}
            >
              Admin
            </button>
            <button type="button" className={"dropdown-btn"} onClick={handleClickedVoteLog}>
              Vote Log
            </button>
            <button
              type="button"
              className="dropdown-btn"
              onClick={handleClickedMain} // main 페이지로 이동하는 버튼 추가
            >
              Main
            </button>
            <button
              type="button"
              className="dropdown-btn"
              onClick={handleClickedCreate} // vote Create 페이지로 이동하는 버튼 추가
            >
              Vote Create
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;