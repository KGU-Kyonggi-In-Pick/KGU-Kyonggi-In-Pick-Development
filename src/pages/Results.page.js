// Results.js
import StatisticsChart from "../components/StatisticsChart.component";

const Results = (props) => {
  const { candidatesList } = props; // props 객체에서 candidatesList 속성을 추출하여 변수 candidatesList에 할당

  // 최다 득표자 찾기
  const maxVotesCandidate = candidatesList.reduce((prev, curr) =>
    prev.votes > curr.votes ? prev : curr
  );

  return (
    <section className="results-page">
      <h1>Vote Results</h1>
      <StatisticsChart partiesData={candidatesList} />
      <div>
        <h3>최다 득표자: {maxVotesCandidate.name}</h3>
        <p>득표 수: {maxVotesCandidate.votes}</p>
      </div>
    </section>
  );
};

export default Results;
