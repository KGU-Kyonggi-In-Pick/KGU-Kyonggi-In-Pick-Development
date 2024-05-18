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

// Admin 페이지 컴포넌트
const Admin = () => {
  // 투표 정보 및 상태를 관리하는 상태 변수들
  const [votes, setVotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [voteName, setVoteName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 관련 상태 추가
  const [pledge, setPledge] = useState("");
  const [currentVoteIndex, setCurrentVoteIndex] = useState(null);
  const [waitingVotes, setWaitingVotes] = useState([]);
  const [ongoingVotes, setOngoingVotes] = useState([]);
  const [completedVotes, setCompletedVotes] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // 투표 생성 폼 토글 함수
  const handleToggleCreateForm = () => {
    setShowCreateForm((prev) => !prev);
  };

  // 투표 추가 버튼 클릭 시 실행되는 함수
  const handleAddVote = () => {
    setCurrentVoteIndex(null);
    setShowForm(true);
  };

  // 투표 취소 함수
  const handleCancelVote = () => {
    setShowForm(false);
    setVoteName("");
    setStartTime("");
    setEndTime("");
    setCandidates([]);
  };

  // 투표 등록 함수
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

  // 후보자 추가 함수
  const handleAddCandidate = () => {
    // 이미지 파일이 선택되었는지 확인
    if (imageFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = () => {
        setCandidates([...candidates, { name, image: reader.result, pledge }]);
        setName("");
        setImageFile(null); // 후보자 추가 후 이미지 파일 상태 초기화
        setPledge("");
      };
    } else {
      // 이미지 파일이 선택되지 않았을 경우 알림 표시
      alert("이미지를 선택하세요.");
    }
  };

  // 투표 상태 업데이트 함수
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

  // 투표 상세 정보 렌더링 함수
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

  // 투표 상세 정보 토글 함수
  const handleToggleDetails = (index) => {
    setCurrentVoteIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // 투표 삭제 함수
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
          {/* 투표 생성 버튼 */}
          <StyledButtonLarge onClick={handleToggleCreateForm}>
            {showCreateForm ? "투표 생성하기" : "투표 생성하기"}
          </StyledButtonLarge>
          {showCreateForm && (
            <div>
              {/* 투표 정보 입력 폼 */}
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
                {/* 파일 선택 input */}
                <input
                  type="file" // 파일 입력 타입으로 변경
                  onChange={(e) => setImageFile(e.target.files[0])} // 선택된 이미지 파일 상태로 설정
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
              {/* 추가된 후보자 목록 표시 */}
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
              {/* 투표 등록 및 취소 버튼 */}
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
          {/* 투표 목록 표시 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* 대기중인 투표 */}
            {waitingVotes.map((vote, index) => (
              <div key={index} style={{ marginTop: "20px", width: "400px" }}>
                <StyledButtonLarge onClick={() => handleToggleDetails(index)}>
                  {vote.voteName}
                </StyledButtonLarge>
                {currentVoteIndex === index && renderVoteDetails(vote, index)}
              </div>
            ))}
            {/* 진행중인 투표 */}
            {ongoingVotes.map((vote, index) => (
              <div key={index} style={{ marginTop: "20px", width: "400px" }}>
                <StyledButtonLarge onClick={() => handleToggleDetails(index)}>
                  {vote.voteName}
                </StyledButtonLarge>
                {currentVoteIndex === index && renderVoteDetails(vote, index)}
              </div>
            ))}
            {/* 종료된 투표 */}
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
