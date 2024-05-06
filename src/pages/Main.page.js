import React, { useState } from "react";
import {
  MainPageContainer,
  TemporaryVoteList,
  TemporaryVoteItem,
  Button,
} from "../styles/styled/MainStyles";
import Vote from "./Vote.page"; // 상대 경로를 사용하여 Vote 컴포넌트 임포트

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

  // 드래곤볼인기투표에 대한 결과 보기 기능 허용 여부 (true: 허용, false: 불허용)
  const allowDragonBallResultsView = false;

  const voteActions = {
    드래곤볼인기투표: {
      vote: () => setCurrentPage(<Vote />),
      showResults: allowDragonBallResultsView
        ? () => alert("드래곤볼 인기 투표 결과")
        : undefined,
    },
    default: {
      vote: () => alert("아직 준비되지 않은 투표입니다."),
      showResults: () => alert("아직 준비되지 않은 투표입니다."),
    },
  };

  const handleTemporaryVoteClick = (vote) => {
    setSelectedTemporaryVote(vote);
  };

  const handleVoteButtonClick = () => {
    if (selectedTemporaryVote) {
      const action = voteActions[selectedTemporaryVote] || voteActions.default;
      action.vote();
    } else {
      alert("투표할 항목을 선택하세요.");
    }
  };

  const handleResultsButtonClick = () => {
    if (selectedTemporaryVote) {
      const action = voteActions[selectedTemporaryVote] || voteActions.default;
      if (action.showResults) {
        action.showResults();
      } else {
        alert("투표결과를 볼 수 있는 기간이 아닙니다.");
      }
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
