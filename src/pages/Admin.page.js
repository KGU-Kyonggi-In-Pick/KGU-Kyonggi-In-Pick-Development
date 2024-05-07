import React, { useState, useEffect } from "react";

const Admin = () => {
  const [votes, setVotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [voteName, setVoteName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [pledge, setPledge] = useState("");
  const [currentVoteIndex, setCurrentVoteIndex] = useState(null);
  const [waitingVotes, setWaitingVotes] = useState([]);
  const [ongoingVotes, setOngoingVotes] = useState([]);
  const [completedVotes, setCompletedVotes] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleToggleCreateForm = () => {
    setShowCreateForm((prev) => !prev);
  };

  const handleAddVote = () => {
    setCurrentVoteIndex(null);
    setShowForm(true);
  };

  const handleCancelVote = () => {
    setShowForm(false);
    setVoteName("");
    setStartTime("");
    setEndTime("");
    setCandidates([]);
  };

  const handleRegisterVote = () => {
    if (voteName && startTime && endTime && candidates.length > 0) {
      const newVote = {
        id: Date.now(),
        voteName,
        startTime,
        endTime,
        candidates,
        status: "대기중인 투표",
      };
      setVotes([...votes, newVote]);
      setWaitingVotes([...waitingVotes, newVote]);
      setShowForm(false);
      setVoteName("");
      setStartTime("");
      setEndTime("");
      setCandidates([]);
    } else {
      alert(
        "투표명, 시작시간, 종료시간 및 후보자 정보를 모두 입력해야 합니다."
      );
    }
  };

  const handleAddCandidate = () => {
    setCandidates([...candidates, { name, image, pledge }]);
    setName("");
    setImage("");
    setPledge("");
  };

  useEffect(() => {
    const currentDate = new Date();
    const updatedVotes = votes.map((vote) => {
      const startDate = new Date(vote.startTime);
      const endDate = new Date(vote.endTime);
      if (currentDate >= startDate && currentDate <= endDate) {
        return { ...vote, status: "진행중인 투표" };
      } else if (currentDate > endDate) {
        return { ...vote, status: "종료된 투표" };
      } else {
        return { ...vote, status: "대기중인 투표" };
      }
    });
    setVotes(updatedVotes);
    setWaitingVotes(
      updatedVotes.filter((vote) => vote.status === "대기중인 투표")
    );
    setOngoingVotes(
      updatedVotes.filter((vote) => vote.status === "진행중인 투표")
    );
    setCompletedVotes(
      updatedVotes.filter((vote) => vote.status === "종료된 투표")
    );
  }, [votes]);

  const handleToggleDetails = (index) => {
    setCurrentVoteIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDeleteVote = (index) => {
    const updatedVotes = [...votes];
    updatedVotes.splice(index, 1);
    setVotes(updatedVotes);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>투표 관리페이지</h1>
      <button
        style={{
          width: "400px",
          height: "60px",
          fontSize: "1.5rem",
          marginBottom: "20px",
        }}
        onClick={handleToggleCreateForm}
      >
        {showCreateForm ? "투표 생성하기" : "투표 생성하기"}
      </button>
      {showCreateForm && (
        <div>
          <input
            type="text"
            placeholder="투표명"
            value={voteName}
            onChange={(e) => setVoteName(e.target.value)}
          />
          <div style={{ marginBottom: "5px" }}></div>
          <input
            type="text"
            placeholder="시작: YYYY-MM/DD TT:TT"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <div style={{ marginBottom: "5px" }}></div>
          <input
            type="text"
            placeholder="종료: YYYY-MM/DD TT:TT"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
          <div style={{ marginBottom: "5px" }}></div>
          <div>
            <h4 style={{ margin: "10px 0" }}>후보자들</h4>
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div style={{ marginBottom: "5px" }}></div>
            <input
              type="text"
              placeholder="사진 URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <div style={{ marginBottom: "5px" }}></div>
            <input
              type="text"
              placeholder="한줄 공약"
              value={pledge}
              onChange={(e) => setPledge(e.target.value)}
            />
            <div style={{ marginBottom: "5px" }}></div>
            <button onClick={handleAddCandidate}>후보자 추가하기</button>
          </div>
          {candidates.map((candidate, index) => (
            <div key={index}>
              <p>이름: {candidate.name}</p>
              <img
                src={candidate.image}
                alt={candidate.name}
                style={{ width: "100px", height: "100px" }}
              />
              <p>한줄 공약: {candidate.pledge}</p>
            </div>
          ))}
          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={handleRegisterVote}
              style={{ width: "100px", height: "30px", marginBottom: "20px" }}
            >
              투표 등록하기
            </button>
            <button
              onClick={handleCancelVote}
              style={{
                width: "100px",
                height: "30px",
                marginBottom: "20px",
                marginLeft: "20px",
              }}
            >
              취소하기
            </button>
          </div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {waitingVotes.map((vote, index) => (
          <div key={index} style={{ marginTop: "20px", width: "400px" }}>
            <button
              style={{ width: "100%", height: "60px", fontSize: "1.5rem" }}
              onClick={() => handleToggleDetails(index)}
            >
              {vote.voteName}
            </button>
            {currentVoteIndex === index && (
              <div>
                <h2>{vote.voteName}</h2>
                <p>시작시간: {vote.startTime}</p>
                <p>종료시간: {vote.endTime}</p>
                <h3>후보자</h3>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {vote.candidates.map((candidate, idx) => (
                    <div key={idx} style={{ marginRight: "20px" }}>
                      <p>이름: {candidate.name}</p>
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  ))}
                </div>
                <button onClick={() => handleDeleteVote(index)}>삭제하기</button>
              </div>
            )}
          </div>
        ))}
        {ongoingVotes.map((vote, index) => (
          <div key={index} style={{ marginTop: "20px", width: "400px" }}>
            <button
              style={{ width: "100%", height: "60px", fontSize: "1.5rem" }}
              onClick={() => handleToggleDetails(index)}
            >
              {vote.voteName}
            </button>
            {currentVoteIndex === index && (
              <div>
                <h2>{vote.voteName}</h2>
                <p>시작시간: {vote.startTime}</p>
                <p>종료시간: {vote.endTime}</p>
                <h3>후보자</h3>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {vote.candidates.map((candidate, idx) => (
                    <div key={idx} style={{ marginRight: "20px" }}>
                      <p>이름: {candidate.name}</p>
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  ))}
                </div>
                <button onClick={() => handleDeleteVote(index)}>삭제하기</button>
              </div>
            )}
          </div>
        ))}
        {completedVotes.map((vote, index) => (
          <div key={index} style={{ marginTop: "20px", width: "400px" }}>
            <button
              style={{ width: "100%", height: "60px", fontSize: "1.5rem" }}
              onClick={() => handleToggleDetails(index)}
            >
              {vote.voteName}
            </button>
            {currentVoteIndex === index && (
              <div>
                <h2>{vote.voteName}</h2>
                <p>시작시간: {vote.startTime}</p>
                <p>종료시간: {vote.endTime}</p>
                <h3>후보자</h3>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {vote.candidates.map((candidate, idx) => (
                    <div key={idx} style={{ marginRight: "20px" }}>
                      <p>이름: {candidate.name}</p>
                      <img
                        src={candidate.image}
                        alt={candidate.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                  ))}
                </div>
                <button onClick={() => handleDeleteVote(index)}>삭제하기</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
