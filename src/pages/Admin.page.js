// kyonggi--main/src/Pages/Admin.page.js

import React, { useState, useEffect } from "react";
import {
  AdminHeader,
  AdminContainer,
  ContainerWrapper,
  StyledButtonLarge,
  StyledButtonSmall,
  StyledDivCenter,
} from "../styles/styled/Admin.styled";

const Admin = () => {
  const [votes, setVotes] = useState(
    JSON.parse(localStorage.getItem("votes")) || []
  );
  const [showForm, setShowForm] = useState(false);
  const [voteName, setVoteName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null); // Updated state for image file
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
      localStorage.setItem("votes", JSON.stringify([...votes, newVote]));
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
    // Check if an image file is selected
    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        setCandidates([...candidates, { name, image: reader.result, pledge }]);
        setName("");
        setImageFile(null); // Reset image file state after adding candidate
        setPledge("");
      };
    } else {
      // If no image file is selected, display an alert
      alert("이미지를 선택하세요.");
    }
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

  const renderVoteDetails = (vote, index) => {
    return (
      <div key={index}>
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
              <p>한줄 공약: {candidate.pledge}</p>
            </div>
          ))}
        </div>
        <button onClick={() => handleDeleteVote(index)}>삭제하기</button>
      </div>
    );
  };

  const handleToggleDetails = (index) => {
    setCurrentVoteIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDeleteVote = (index) => {
    const updatedVotes = [...votes];
    updatedVotes.splice(index, 1);
    setVotes(updatedVotes);
  };

  return (
    <ContainerWrapper>
      <AdminHeader> 투표 관리 페이지 </AdminHeader>
      <AdminContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <StyledButtonLarge onClick={handleToggleCreateForm}>
            {showCreateForm ? "투표 생성하기" : "투표 생성하기"}
          </StyledButtonLarge>
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
                  type="file" // Change input type to file
                  onChange={(e) => setImageFile(e.target.files[0])} // Set selected image file to state
                />
                <div style={{ marginBottom: "5px" }}></div>

                <input
                  type="text"
                  placeholder="한줄 소개"
                  value={pledge}
                  onChange={(e) => setPledge(e.target.value)}
                />
                <div style={{ marginBottom: "5px" }}></div>
                <StyledButtonSmall onClick={handleAddCandidate}>
                  후보자 추가
                </StyledButtonSmall>
              </div>
              {candidates.map((candidate, index) => (
                <div key={index}>
                  <p>이름: {candidate.name}</p>
                  <img
                    src={candidate.image}
                    alt={candidate.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <p>한줄 소개: {candidate.pledge}</p>
                </div>
              ))}
              <StyledDivCenter>
                <StyledButtonSmall onClick={handleRegisterVote}>
                  투표 등록하기
                </StyledButtonSmall>
                <StyledButtonSmall onClick={handleCancelVote}>
                  취소하기
                </StyledButtonSmall>
              </StyledDivCenter>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {waitingVotes.map((vote, index) => (
              <div key={index} style={{ marginTop: "20px", width: "400px" }}>
                <StyledButtonLarge onClick={() => handleToggleDetails(index)}>
                  {vote.voteName}
                </StyledButtonLarge>
                {currentVoteIndex === index && renderVoteDetails(vote, index)}
              </div>
            ))}
            {ongoingVotes.map((vote, index) => (
              <div key={index} style={{ marginTop: "20px", width: "400px" }}>
                <StyledButtonLarge onClick={() => handleToggleDetails(index)}>
                  {vote.voteName}
                </StyledButtonLarge>
                {currentVoteIndex === index && renderVoteDetails(vote, index)}
              </div>
            ))}
            {completedVotes.map((vote, index) => (
              <div key={index} style={{ marginTop: "20px", width: "400px" }}>
                <StyledButtonLarge onClick={() => handleToggleDetails(index)}>
                  {vote.voteName}
                </StyledButtonLarge>
                {currentVoteIndex === index && renderVoteDetails(vote, index)}
              </div>
            ))}
          </div>
        </div>
      </AdminContainer>
    </ContainerWrapper>
  );
};

export default Admin;