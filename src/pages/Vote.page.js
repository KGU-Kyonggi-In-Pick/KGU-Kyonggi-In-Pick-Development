
import React, { useState } from "react";
import PartyCard from "../components/PartyCard.component";

// 투표 제거 시 사용할 상수 값 설정
const REMOVE_VOTE = -1;

// 유권자가 이미 투표했는지 확인하는 헬퍼 함수
export const isVotedBefore = (voter, votes) => {
  let isVoted = false; // 투표 여부 초기화
  // 모든 후보자 목록을 순회하면서 유권자의 ID가 포함되어 있는지 확인
  votes.forEach((candidate) => {
    if (candidate.voters.includes(voter.id)) {
      isVoted = true; // 유권자가 투표한 경우 true로 설정
    }
  });
  return isVoted; // 투표 여부 반환
};

// Vote 컴포넌트 정의
const Vote = ({ setVotes, votes, voter }) => {
  
  // 유권자가 투표할 수 있는지 여부를 저장하는 상태 변수
  const [isAbleToVote, setIsAbleToVote] = useState(!isVotedBefore(voter, votes));
  // 유권자가 현재 투표 중인지 여부를 저장하는 상태 변수
  const [isCurrentlyVoting, setIsCurrentlyVoting] = useState(false);

  // 투표를 제거하는 함수
  const removeVote = () => {
    // 모든 후보자 목록을 순회하면서 유권자의 ID가 포함되어 있는지 확인
    votes.forEach((candidate) => {
      if (candidate.voters.includes(voter.id)) {
        const index = candidate.voters.indexOf(voter.id); // 유권자의 ID 위치 찾기
        if (index > -1) {
          candidate.voters.splice(index, 1); // 유권자의 ID를 voters 배열에서 제거
          candidate.votes += REMOVE_VOTE; // 투표 수 감소
          setIsAbleToVote(true); // 다시 투표할 수 있도록 상태 업데이트
          setVotes([...votes]); // 상태를 업데이트하여 변경 사항 반영
        }
      }
    });
  };

  // 컴포넌트의 JSX 렌더링 부분
  return (
    <main className="vote-page">
      <h1>Vote Page</h1> {/* 페이지 제목 */}
      <div className="vote-card-container">
        {votes.map((party) => ( // 각 후보자를 나타내는 PartyCard 컴포넌트를 렌더링
          <PartyCard
            key={party.id} // 각 후보자에게 고유 키를 부여
            voter={voter} // 유권자 정보 전달
            party={party} // 후보자 정보 전달
            allVotes={votes} // 전체 투표 정보 전달
            setVote={setVotes} // 투표 상태를 업데이트하는 함수 전달
            isAbleToVote={isAbleToVote} // 유권자가 투표할 수 있는지 여부 전달
            setIsAbleToVote={setIsAbleToVote} // 투표 가능 여부 상태를 업데이트하는 함수 전달
            removeVote={removeVote} // 투표 제거 함수 전달
            isCurrentlyVoting={isCurrentlyVoting} // 유권자가 현재 투표 중인지 여부 전달
            setIsCurrentlyVoting={setIsCurrentlyVoting} // 투표 중인지 여부 상태를 업데이트하는 함수 전달
          />
        ))}
      </div>
    </main>
  );
};

// 컴포넌트를 기본으로 내보내기
export default Vote;
