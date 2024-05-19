import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Data from "./Data/Data";
import PAGES from "./constants/index";
import Navbar from "./components/Navbar.component";
import Vote from "./pages/Vote.page";
import VoteData from "./Data/PartyData";
import Admin from "./pages/Admin.page";
import Results from "./pages/Results.page";
import VoteLog from "./pages/VoteLog.page";
import Main from "./pages/Main.page";
import Login from "./pages/Login.page";

const EMPTY_USER = {
  StudentID: "",
  name: "",
  password: "",
  type: "user",
};

const userInfo = JSON.parse(localStorage.getItem("loggedUser")) || EMPTY_USER;

const [vote, login, admin, results, voteLog, main] = PAGES;

const votesLocalData = JSON.parse(localStorage.getItem("voteData")) || VoteData;
const userLogsLocalData = JSON.parse(localStorage.getItem("userLogs")) || [];

function App() {
  const [loggedUser, setLoggedUser] = useState(userInfo);
  const [currentPage, setCurrentPage] = useState(
    userInfo.StudentID === "" ? login : main
  );
  const [votes, setVotes] = useState(votesLocalData);
  const [voteTitle, setVoteTitle] = useState(""); // 선택된 투표 제목 상태 관리
  const [userLogs, setUserLogs] = useState(userLogsLocalData);

  // 페이지가 처음 로드될 때 로컬 스토리지의 데이터를 초기화
  useEffect(() => {
    console.log("Initializing storage and clearing cache");
    localStorage.removeItem("userLogs");
    localStorage.removeItem("voteData");
    localStorage.setItem("voteData", JSON.stringify(VoteData));
    localStorage.setItem("userLogs", JSON.stringify([]));
    setUserLogs([]);
    setVotes(VoteData);
  }, []);

  useEffect(() => {
    localStorage.setItem("voteData", JSON.stringify(votes));
  }, [votes]);

  useEffect(() => {
    localStorage.setItem("userLogs", JSON.stringify(userLogs));
  }, [userLogs]);

  useEffect(() => {
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    if (loggedUser.StudentID === "") {
      setCurrentPage(login);
    } else {
      setCurrentPage(main);
    }
  }, [loggedUser]);

  const database = Data;

  const isCurrentPage = (page) => page === currentPage;

  // WebSocket 연결 설정
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000/ws');
    
    ws.onopen = () => {
      console.log('WebSocket connection opened');
      ws.send('Hello Server!');
    };
    
    ws.onmessage = (event) => {
      console.log('Message from server ', event.data);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
    
    return () => {
      ws.close();
    };
  }, []);

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
        <Vote
          voter={loggedUser}
          votes={votes}
          setVotes={setVotes}
          setUserLogs={setUserLogs}
        />
      )}
      {isCurrentPage(results) && (
        <Results
          voteTitle={voteTitle} // voteTitle 전달
        />
      )}
      {isCurrentPage(admin) && (
        <Admin users={database} candidatesList={votes} />
      )}
      {isCurrentPage(voteLog) && (
        <VoteLog userLogs={userLogs} />
      )}
      {isCurrentPage(main) && (
        <Main setCurrentPage={setCurrentPage} setVoteTitle={setVoteTitle} /> // setVoteTitle 전달
      )}
      {/* 강제로 Results 페이지를 렌더링 */}
      <Results voteTitle="학생회 투표" />

    </div>
  );
}

export default App;
