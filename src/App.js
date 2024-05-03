import { useState, useEffect } from "react";
import { Login, Vote, Admin, SignUp } from "./pages";  // Import all page components
import "./styles/App.css";
import Data from "./Data/Data";
import VoteData from "./Data/PartyData";
import PAGES from "./constants/index";
import Navbar from "./components/Navbar.component";

const EMPTY_USER = {
  id: "",
  name: "",
  email: "",
  type: "user",
};

// Retrieve user info and vote data from local storage or set to default values
const userInfo = JSON.parse(localStorage.getItem("loggedUser")) || EMPTY_USER;
const votesLocalData = JSON.parse(localStorage.getItem("voteData")) || VoteData;

// Deconstruct PAGES array to get individual page identifiers
const [vote, login, admin, signUp] = PAGES;

function App() {
  const [loggedUser, setLoggedUser] = useState(userInfo);
  const [currentPage, setCurrentPage] = useState(userInfo.id === "" ? login : vote);
  const [votes, setVotes] = useState(votesLocalData);

  // Effect for updating localStorage whenever votes or loggedUser changes
  useEffect(() => {
    localStorage.setItem("voteData", JSON.stringify(votes));
  }, [votes]);

  useEffect(() => {
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    setCurrentPage(loggedUser.id === "" ? login : vote);
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

      {isCurrentPage(signUp) && (
        <SignUp
          setLoggedUser={setLoggedUser}
          setCurrentPage={setCurrentPage}
          usersData={database}
        />
      )}

      {!isCurrentPage(login) && !isCurrentPage(signUp) && (
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
        />
      )}

      {isCurrentPage(admin) && (
        <Admin
          users={database}
          candidatesList={votes}
        />
      )}
    </div>
  );
}

export default App;
