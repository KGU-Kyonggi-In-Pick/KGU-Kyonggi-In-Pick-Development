import React, { useState, useEffect } from "react";
import "./styles/App.css"; // 앱 전반에 적용되는 CSS 스타일
import Data from "./Data/Data"; // 사용자 또는 투표 데이터를 관리하는 정적 데이터
import PAGES from "./constants/index"; // 페이지 식별자 상수
import Navbar from "./components/Navbar.component"; // 네비게이션 바 컴포넌트
import Vote from "./pages/Vote.page"; // 투표 페이지 컴포넌트
import VoteData from "./Data/PartyData"; // 정당 또는 후보자 데이터
import Admin from "./pages/Admin.page"; // 관리자 페이지 컴포넌트
import Results from "./pages/Results.page"; // 결과 페이지 컴포넌트
import VoteLog from "./pages/VoteLog.page"; // 투표 로그 페이지 컴포넌트
import Main from "./pages/Main.page"; // 메인 페이지 컴포넌트
import Login from "./pages/Login.page"; // 로그인 페이지 컴포넌트

// 빈 사용자 객체 정의
const EMPTY_USER = {
  StudentID: "",
  name: "",
  password: "",
  type: "user",
};

// 로컬 스토리지에서 로그인한 사용자 정보 읽기 또는 빈 사용자 객체 사용
const userInfo = JSON.parse(localStorage.getItem("loggedUser")) || EMPTY_USER;

// 페이지 상수에서 개별 페이지 추출
const [vote, login, admin, results, voteLog, main] = PAGES;

// 로컬 스토리지에서 투표 데이터 읽기 또는 초기 데이터 사용
const votesLocalData = JSON.parse(localStorage.getItem("voteData")) || VoteData;

function App() {
  const [loggedUser, setLoggedUser] = useState(userInfo); // 로그인한 사용자 상태
  const [currentPage, setCurrentPage] = useState( // 현재 페이지 상태
    userInfo.StudentID === "" ? login : main
  );

  const [votes, setVotes] = useState(votesLocalData); // 투표 데이터 상태

  // 투표 데이터가 변경될 때마다 로컬 스토리지 업데이트
  useEffect(() => {
    localStorage.setItem("voteData", JSON.stringify(votes));
  }, [votes]);

  // 로그인한 사용자가 변경될 때마다 로컬 스토리지 업데이트 및 페이지 이동
  useEffect(() => {
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    if (loggedUser.StudentID === "") {
      setCurrentPage(login); // 사용자가 로그아웃한 경우 로그인 페이지로 이동
    } else {
      setCurrentPage(main); // 사용자가 로그인한 경우 메인 페이지로 이동
    }
  }, [loggedUser]);

  const database = Data; // 데이터베이스 변수에 데이터 할당

  // 현재 페이지 검사 함수
  const isCurrentPage = (page) => page === currentPage;

  return (
    <div className="App">
      {isCurrentPage(login) && (
        <Login
          usersData={database}
          setLoggedUser={setLoggedUser}
          setCurrentPage={setCurrentPage}
        />
      )}
      {!isCurrentPage(login) && (
        <Navbar
          setCurrentPage={setCurrentPage}
          user={loggedUser}
          setUser={setLoggedUser}
        />
      )}
      {isCurrentPage(vote) && (
        <Vote voter={loggedUser} votes={votes} setVotes={setVotes} />
      )}
      {isCurrentPage(results) && (
        <Results
          users={database}
          candidatesList={votes}
          voteTitle={currentPage.voteTitle}
        />
      )}
      {isCurrentPage(admin) && (
        <Admin users={database} candidatesList={votes} />
      )}
      {isCurrentPage(voteLog) && (
        <VoteLog
          votes={votes}
          currentUser={loggedUser}
        />
      )}
      {isCurrentPage(main) && <Main setCurrentPage={setCurrentPage} />}
    </div>
  );
}

export default App;

