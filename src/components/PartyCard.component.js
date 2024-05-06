import React, { useState } from "react";

const PartyCard = ({
  party,
  allVotes,
  setVote,
  voter,
  setIsAbleToVote,
  isAbleToVote,
  removeVote,
  isCurrentlyVoting,
  setIsCurrentlyVoting
}) => {
  const [voteStatusMessage, setVoteStatusMessage] = useState(""); // 투표 상태 메시지 상태

  // 투표 추가 함수
  const handleAddVote = () => {
    const updatedVotes = allVotes.map(candidate => {
      if (candidate.id === party.id) {
        candidate.votes += 1;  // 투표 수 증가
        candidate.voters.push(voter.id);  // 투표자 ID 추가
      }
      return candidate;
    });
  
    setVote(updatedVotes);  // 상태 업데이트
    setIsAbleToVote(false); // 투표 불가 상태로 변경
    setVoteStatusMessage("투표완료");  // 투표 완료 메시지 설정
    setIsCurrentlyVoting(false); // 현재 투표 상태 비활성화
  };

  // 투표 확정 시작 함수
  const startConfirmVote = () => {
    setIsCurrentlyVoting(true);
  };

  // 투표 취소 함수
  const cancelVote = () => {
    setIsCurrentlyVoting(false);
    setVoteStatusMessage(""); // 메시지 초기화
  };

  // 투표 취소 함수 (기존 투표 제거)
  const handleRemoveVote = () => {
    const updatedVotes = allVotes.map(candidate => {
      if (candidate.voters.includes(voter.id)) {
        const index = candidate.voters.indexOf(voter.id);
        if (index > -1) {
          candidate.voters.splice(index, 1);
          candidate.votes -= 1; // 투표 수 감소
        }
      }
      return candidate;
    });

    setVote(updatedVotes); // 전체 투표 상태 업데이트
    setIsAbleToVote(true); // 투표 가능 상태로 변경
    setVoteStatusMessage(""); // "투표완료" 메시지 초기화
  };

  return (
    <div className="card">
      <h4>{voteStatusMessage}</h4>
      <img src={party.img} alt={party.name} />
      <h3>{party.name}</h3>
      <div className="additional-info">
        <p>한줄소개해주세요 {party.additionalInfo}</p>
      </div>
      {!isCurrentlyVoting && isAbleToVote && (
        <button onClick={startConfirmVote} className="btn">
          Vote
        </button>
      )}
      {isCurrentlyVoting && (
        <div className="currently-vote-container">
          <button onClick={handleAddVote} className="btn">
            I'm Sure
          </button>
          <button onClick={cancelVote} className="btn">
            Cancel
          </button>
        </div>
      )}
      {!isAbleToVote && (
        <button onClick={handleRemoveVote} className="btn">
          Change my Vote!
        </button>
      )}
    </div>
  );
};

export default PartyCard;
