import React, { useState } from "react";
import PartyCard from "../components/PartyCard.component";

// 투표 제거 시 사용할 상수 값 설정
const REMOVE_VOTE = -1;

// 유권자가 이미 투표했는지 확인하는 헬퍼 함수
export const isVotedBefore = (voter, votes) => {
  return votes.some(candidate => candidate.voters.includes(voter.StudentID));
};

// Vote 컴포넌트 정의
const Vote = ({ setVotes, votes, voter, setUserLogs }) => {
  
  const [isAbleToVote, setIsAbleToVote] = useState(!isVotedBefore(voter, votes));
  const [isCurrentlyVoting, setIsCurrentlyVoting] = useState(false);

  const removeVote = () => {
    votes.forEach((candidate) => {
      if (candidate.voters.includes(voter.StudentID)) {
        const index = candidate.voters.indexOf(voter.StudentID);
        if (index > -1) {
          candidate.voters.splice(index, 1);
          candidate.votes += REMOVE_VOTE;
          setIsAbleToVote(true);
          setVotes([...votes]);
        }
      }
    });
  };

  const addVote = (candidateId) => {
    const updatedVotes = votes.map((candidate) => {
      if (candidate.id === candidateId) {
        candidate.voters.push(voter.StudentID);
        candidate.votes += 1;
        setIsAbleToVote(false);
      }
      return candidate;
    });
    setVotes(updatedVotes);

    // 로그 업데이트
    const logMessage = `${voter.name}님이 투표를 완료했습니다.`;
    setUserLogs((prevLogs) => {
      let updatedLogs = Array.isArray(prevLogs) ? [...prevLogs] : [];

      // 로그 메시지가 이미 존재하는지 확인
      const logMessageExists = updatedLogs.includes(logMessage);

      // 로그 메시지가 존재하지 않는 경우 추가
      if (!logMessageExists) {
        updatedLogs.push(logMessage);
      }

      localStorage.setItem("userLogs", JSON.stringify(updatedLogs));
      return updatedLogs;
    });
  };

  return (
    <main className="vote-page">
      <h1>Vote Page</h1>
      <div className="vote-card-container">
        {votes.map((party) => (
          <PartyCard
            key={party.id}
            voter={voter}
            party={party}
            allVotes={votes}
            setVote={addVote}
            isAbleToVote={isAbleToVote}
            setIsAbleToVote={setIsAbleToVote}
            removeVote={removeVote}
            isCurrentlyVoting={isCurrentlyVoting}
            setIsCurrentlyVoting={setIsCurrentlyVoting}
          />
        ))}
      </div>
    </main>
  );
};

export default Vote;

