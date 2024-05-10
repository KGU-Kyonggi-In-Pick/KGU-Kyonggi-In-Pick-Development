// Main.page.js
import React, { useState } from "react";
import {
  MainPageContainer,
  TemporaryVoteList,
  TemporaryVoteItem,
  Button,
} from "../styles/styled/MainStyles";

const Main = ({ setCurrentPage }) => {
  const [selectedTemporaryVote, setSelectedTemporaryVote] = useState(null);
  const temporaryVotes = [
    "드래곤볼인기투표",
    "컴퓨터공학과 학생회",
    "산업공학과 학생회",
    "경영학과 학생회",
    "시각디자인과 학생회",
    "연극영화과 학생회",
  ];

  const handleTemporaryVoteClick = (vote) => {
    setSelectedTemporaryVote(vote);
  };

  const handleVoteButtonClick = () => {
    if (selectedTemporaryVote) {
      setCurrentPage("vote");
    } else {
      alert("투표할 항목을 선택하세요.");
    }
  };

  const handleResultsButtonClick = () => {
    if (selectedTemporaryVote) {
      setCurrentPage("results");
    } else {
      alert("투표할 항목을 선택하세요.");
    }
  };

  return (
    <MainPageContainer>
      <TemporaryVoteList>
        {temporaryVotes.map((vote, index) => (
          <TemporaryVoteItem
            key={index}
            isSelected={selectedTemporaryVote === vote}
            onClick={() => handleTemporaryVoteClick(vote)}
          >
            {vote}
          </TemporaryVoteItem>
        ))}
      </TemporaryVoteList>
      <Button
        isDisabled={selectedTemporaryVote === null}
        onClick={handleVoteButtonClick}
        aria-disabled={selectedTemporaryVote === null}
        aria-label={
          selectedTemporaryVote ? "Click to vote" : "Select a vote option first"
        }
      >
        투표하기
      </Button>
      <Button
        isDisabled={selectedTemporaryVote === null}
        onClick={handleResultsButtonClick}
        aria-disabled={selectedTemporaryVote === null}
        aria-label={
          selectedTemporaryVote
            ? "Click to view results"
            : "Select a vote option first"
        }
      >
        결과보기
      </Button>
    </MainPageContainer>
  );
};

export default Main;