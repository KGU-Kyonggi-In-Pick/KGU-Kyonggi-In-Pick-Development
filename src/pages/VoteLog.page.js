import React from "react";
import { isVotedBefore } from "./Vote.page"; // Vote 페이지에서 isVotedBefore 함수 import

const VoteLog = ({ votes, voter }) => {
  console.log("Voter object:", voter);

  // voter 프롭스가 undefined이거나 StudentID가 없는 경우 처리
  if (!voter || !voter.StudentID) {
    console.error("Voter information is missing or invalid:", voter);
    return <div>Error: Voter information is missing or invalid.</div>;
  }

  // 로그인한 사용자의 투표 여부에 따른 메시지 설정
  const userMessage = isVotedBefore(voter, votes)
    ? `${voter.name}님이 투표를 완료했습니다.`
    : ``;

  return (
    <section className="vote-log-page">
      <h1>Vote Log</h1>
      <div className="vote-log-container">
        <div key={voter.StudentID} className="vote-log-item">
          <p>{userMessage}</p>
        </div>
      </div>
    </section>
  );
};

export default VoteLog;
