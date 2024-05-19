import React from "react";

const VoteLog = ({ userLogs }) => {
  console.log("User Logs:", userLogs);

  if (!userLogs || userLogs.length === 0) {
    return <div>No logs available.</div>;
  }

  return (
    <section className="vote-log-page">
      <h1>Vote Log</h1>
      <div className="vote-log-container">
        {userLogs.map((log, index) => (
          <div key={index} className="vote-log-item">
            <p>{log}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VoteLog;
