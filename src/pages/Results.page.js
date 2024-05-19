import React from "react";
import StatisticsChart from "../components/StatisticsChart.component";

const Results = (props) => {
  const { voteTitle } = props;
  const defaultVoteData = [
    { name: "Candidate 1", votes: 10 },
    { name: "Candidate 2", votes: 20 },
  ];

  // 로컬 스토리지에서 voteData를 가져오거나 기본값 사용
  const voteData = JSON.parse(localStorage.getItem("voteData")) || defaultVoteData;

  // 최다 득표자 찾기
  const maxVotesCandidate = voteData.reduce((prev, curr) =>
    prev.votes > curr.votes ? prev : curr
  );

  return (
    <section className="results-page">
      <h1>{voteTitle || "Vote"} 결과</h1> {/* 선택된 투표 제목 표시 */}
      <StatisticsChart partiesData={voteData} />
      <div>
        <h3>최다 득표자: {maxVotesCandidate.name}</h3>
        <p>득표 수: {maxVotesCandidate.votes}</p>
      </div>
      <div>
        <h2>전체 후보자 득표 수</h2>
        <ul>
          {voteData.map((candidate, index) => (
            <li key={index}>
              {candidate.name}: {candidate.votes} votes
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Results;
