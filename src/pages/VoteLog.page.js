// VoteLog.page.js
import React from "react";
import users from "../Data/Data.js";
import { isVotedBefore } from "./Vote.page"; // Vote 페이지를 import

const VoteLog = ({ votes }) => {
  return (
    <section className="vote-log-page">
      <h1>Vote Log</h1>
      <div className="vote-log-container">
        {users.map((user) => (
          <div key={user.StudentID} className="vote-log-item">
            <p>
              {/* 각 사용자의 투표 여부 확인 */}
              {isVotedBefore(user, votes)
                ? `${user.name}님이 투표를 완료했습니다.`
                : `${user.name}님이 투표하지 않았습니다.`}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VoteLog;
