// VoteLog.page.js
import React from "react";
import users from "../Data/Data.js";         // Data.js에서 사용자들 데이터를 import
import { isVotedBefore } from "./Vote.page"; // Vote 페이지를 import해서 isVotedBefore 함수를 가져옴

const VoteLog = ({ votes }) => {             // votes 프롭스를 받는다 votes는 사용자의 투표정보를 담음
  return (
    <section className="vote-log-page">
      <h1>Vote Log</h1>
      <div className="vote-log-container">
        {users.map((user) => (              // users.map을 통해 각 사용자의 정보를 순회
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
