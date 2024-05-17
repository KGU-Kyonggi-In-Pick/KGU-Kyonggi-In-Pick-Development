import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Data from "./Data/Data"; // 사용자 데이터 임포트
import PAGES from "./constants/index"; // 페이지 상수 임포트
import Navbar from "./components/Navbar.component"; // 네비게이션 바 컴포넌트 임포트
import Vote from "./pages/Vote.page"; // 투표 페이지 컴포넌트 임포트
import VoteData from "./Data/PartyData"; // 투표 데이터 임포트
import Admin from "./pages/Admin.page"; // 관리자 페이지 컴포넌트 임포트
import Results from "./pages/Results.page"; // 결과 페이지 컴포넌트 임포트
import VoteLog from "./pages/VoteLog.page"; // 투표 로그 페이지 컴포넌트 임포트
import Main from "./pages/Main.page"; // 메인 페이지 컴포넌트 임포트
import Login from "./pages/Login.page"; // 로그인 페이지 컴포넌트 임포트

const EMPTY_USER = {
  StudentID: "",
  name: "",
  password: "",
  type: "user",
}; // 초기 빈 사용자 객체

const userInfo = JSON.parse(localStorage.getItem("loggedUser")) || EMPTY_USER; // 로컬 스토리지에서 사용자 정보 가져오기

const [vote, login, admin, results, voteLog, main] = PAGES; // 페이지 상수 배열 해체 할당

const votesLocalData = JSON.parse(localStorage.getItem("voteData")) || VoteData; // 로컬 스토리지에서 투표 데이터 가져오기

function App() {
  const [loggedUser, setLoggedUser] = useState(userInfo); // 사용자 상태 관리
  const [currentPage, setCurrentPage] = useState(
    userInfo.StudentID === "" ? login : main // 사용자가 로그인되어 있는지에 따라 초기 페이지 설정
  );

  const [votes, setVotes] = useState(votesLocalData); // 투표 데이터 상태 관리

  useEffect(() => {
    localStorage.setItem("voteData", JSON.stringify(votes)); // 투표 데이터가 변경될 때마다 로컬 스토리지에 저장
  }, [votes]);

  useEffect(() => {
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser)); // 로그인된 사용자가 변경될 때마다 로컬 스토리지에 저장
    if (loggedUser.StudentID === "") {
      setCurrentPage(login); // 사용자 정보가 없으면 로그인 페이지로 이동
    } else {
      setCurrentPage(main); // 로그인된 사용자가 있으면 메인 페이지로 이동
    }
  }, [loggedUser]);

  const database = Data; // 데이터베이스로 사용할 사용자 데이터

  const isCurrentPage = (page) => page === currentPage; // 현재 페이지를 확인하는 함수

  return (
    <div className="App">
      {isCurrentPage(login) && (
        <Login
          usersData={database}
          setLoggedUser={setLoggedUser}
          setCurrentPage={setCurrentPage}
        />
      )} {/* 로그인 페이지가 현재 페이지인 경우 */}
      {!isCurrentPage(login) && (
        <Navbar
          setCurrentPage={setCurrentPage}
          user={loggedUser}
          setUser={setLoggedUser}
        />
      )} {/* 로그인 페이지가 아닌 경우 네비게이션 바 표시 */}
      {isCurrentPage(vote) && (
        <Vote voter={loggedUser} votes={votes} setVotes={setVotes} />
      )} {/* 투표 페이지가 현재 페이지인 경우 */}
      {isCurrentPage("results") && (
        <Results
          users={database}
          candidatesList={votes}
          voteTitle={currentPage.voteTitle}
        />
      )} {/* 결과 페이지가 현재 페이지인 경우 */}
      {isCurrentPage(admin) && (
        <Admin users={database} candidatesList={votes} />
      )} {/* 관리자 페이지가 현재 페이지인 경우 */}
      {isCurrentPage(voteLog) && <VoteLog votes={votes} />} {/* 투표 로그 페이지가 현재 페이지인 경우 */}
      {isCurrentPage(main) && <Main setCurrentPage={setCurrentPage} />} {/* 메인 페이지가 현재 페이지인 경우 */}
    </div>
  );
}

export default App;
