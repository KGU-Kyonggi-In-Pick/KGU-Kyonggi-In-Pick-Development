import React, { useState } from "react";
import { MainPageContainer, TemporaryVoteList, TemporaryVoteItem, Button, } from "../styles/styled/MainStyles";

// Main 컴포넌트 정의
const Main = ({ setCurrentPage }) => {
  // selectedTemporaryVote 상태와 업데이트 함수 선언
  const [selectedTemporaryVote, setSelectedTemporaryVote] = useState(null);

  // temporaryVotes 배열에 투표 항목들 정의
  const temporaryVotes = [
    "드래곤볼인기투표",
    "컴퓨터공학과 학생회",
    "산업공학과 학생회",
    "경영학과 학생회",
    "시각디자인과 학생회",
    "연극영화과 학생회",
  ];

  // 투표 항목 클릭 시 selectedTemporaryVote 상태 업데이트
  const handleTemporaryVoteClick = (vote) => {
    setSelectedTemporaryVote(vote);
  };

  // 투표하기 버튼 클릭 시 실행되는 함수
  const handleVoteButtonClick = () => {
    if (selectedTemporaryVote) {
      // 투표 항목이 선택된 경우 vote 페이지로 이동
      setCurrentPage("vote");
    } else {
      // 투표 항목이 선택되지 않은 경우 경고 메시지 출력
      alert("투표할 항목을 선택하세요.");
    }
  };

  // 결과보기 버튼 클릭 시 실행되는 함수
  const handleResultsButtonClick = () => {
    if (selectedTemporaryVote) {
      // 투표 항목이 선택된 경우 results 페이지로 이동
      setCurrentPage("results");
    } else {
      // 투표 항목이 선택되지 않은 경우 경고 메시지 출력
      alert("투표할 항목을 선택하세요.");
    }
  };

  return (
    <MainPageContainer>
      {/* 투표 항목 목록 렌더링 */}
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

      {/* 투표하기 버튼 렌더링 */}
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

      {/* 결과보기 버튼 렌더링 */}
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
