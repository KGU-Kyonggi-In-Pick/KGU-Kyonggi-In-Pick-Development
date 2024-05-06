// VoteLog.page.js
import React from "react";
import VoteData from "../components/VoteData.component";

const getEvenClass = (number) => (number % 2 ? "row-even" : "");

const VoteLog = () => {
  const votes = VoteData(); // 투표 데이터 가져오기

  return (
    <section className="vote-log-page">
      <h1>Vote Log</h1>
      <div className="vote-log-container">
        {votes.map((vote, index) => (
          <div key={index} className={"vote-log-item " + getEvenClass(index)}>
            <p>{vote.StudentID}님이
            {vote.Voted ? " 투표했습니다." : " 투표하지 않았습니다."}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VoteLog;
