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

function App() {
  const [loggedUser, setLoggedUser] = useState(userInfo);
  const [currentPage, setCurrentPage] = useState(
    userInfo.StudentID === "" ? login : main
  );

  const [votes, setVotes] = useState(votesLocalData);

  useEffect(() => {
    localStorage.setItem("voteData", JSON.stringify(votes));
  }, [votes]);

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
      {isCurrentPage("results") && (
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
      {isCurrentPage(main) && <Main setCurrentPage={setCurrentPage} />}{" "}
    </div>
  );
}

export default App;
