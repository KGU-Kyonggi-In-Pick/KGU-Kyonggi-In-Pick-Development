import React, { useState } from 'react';
import logo from "../assets/images/logo.png"; // 로고 이미지 임포트
import Wrapper from '../styles/styled/Login.styled'; // 로그인 페이지 스타일링을 위한 Wrapper 컴포넌트 임포트
import { validateStudentId } from "../utils/validateStudentId"; // 학생 ID 검증 함수 임포트
import FormRow from "../components/FormRow.component"; // 입력 필드 컴포넌트 임포트
import Modal from "../components/Modal.component"; // 에러 메시지를 표시할 모달 컴포넌트 임포트
import PAGES from "../constants/index"; // 페이지 경로 상수 임포트

const Login = ({ setLoggedUser, usersData, setCurrentPage }) => {
  // 로그인과 회원가입 모드를 관리하는 상태
  const [isSignUp, setIsSignUp] = useState(false);

  // 폼 입력 값들을 관리하는 상태
  const [values, setValues] = useState({
    StudentID: "",
    name: "",
    password: "",
    confirmPassword: ""
  });

  // 에러 상태 및 메시지 배열 관리
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [verified, setVerified] = useState(false);

  // 입력 값 변경 시 해당 값을 상태에 반영
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // 학생 ID 유효성 검증 함수
  const handleVerifyStudentId = () => {
    if (validateStudentId(values.StudentID)) {
      setVerified(true);
      alert("Student ID verified successfully!");
    } else {
      setVerified(false);
      alert("Invalid Student ID format.");
    }
  };

  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearErrors(); // 에러 메시지 초기화

    if (isSignUp) { // 회원가입 로직
      if (!verified) {
        handleError("Please verify your student ID before registering.");
        setIsLoading(false);
        return;
      }
      if (!values.name) handleError("Name is required.");
      if (values.password !== values.confirmPassword) handleError("Passwords do not match.");
      if (!values.password) handleError("Password is required.");

      const userExists = usersData.some(user => user.StudentID === values.StudentID);
      if (userExists) {
        handleError("Student ID already registered.");
        setIsLoading(false);
        return;
      }

      if (!isError) {
        const newUser = { ...values, type: "user" };
        usersData.push(newUser); // 새 사용자 데이터를 배열에 추가
        setLoggedUser(newUser); // 로그인 사용자 상태 업데이트
        setCurrentPage(PAGES.main); // 메인 페이지로 이동
      }
    } else { // 로그인 로직
      const user = usersData.find(u => u.StudentID === values.StudentID && u.password === values.password);
      if (!user) {
        handleError("Invalid credentials.");
        setIsLoading(false);
      } else {
        setLoggedUser(user);
        setCurrentPage(PAGES.main); // 메인 페이지로 이동
      }
    }

    setIsLoading(false);
  };

  // 에러 메시지 처리 함수
  const handleError = (message) => {
    setIsError(true);
    setErrorMessages(prev => [...prev, message]);
  };

  // 에러 메시지 배열 및 에러 상태 초기화
  const clearErrors = () => {
    setIsError(false);
    setErrorMessages([]);
  };

  // JSX를 반환하는 렌더링 부분
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <FormRow
          error={!verified}
          type="text"
          name="StudentID"
          value={values.StudentID}
          handleChange={handleChange}
          placeholder="Enter your student ID"
        />
        {isSignUp && <button type="button" onClick={handleVerifyStudentId} className="btn btn-block">Verify ID</button>}
        {isSignUp && <FormRow
          error={!values.name}
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
          placeholder="Enter your name"
        />}
        <FormRow
          error={!values.password}
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          placeholder="Enter your password"
        />
        {isSignUp && <FormRow
          error={values.password !== values.confirmPassword}
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          handleChange={handleChange}
          placeholder="Confirm your password"
        />}
        <button type="submit" className="btn btn-block">
          {isLoading ? "Processing..." : isSignUp ? "Sign Up" : "Log In"}
        </button>
        <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="btn btn-block">
          {isSignUp ? "Already registered? Log in" : "Need an account? Sign up"}
        </button>
      </form>
      {isError && <Modal closeModal={clearErrors} messages={errorMessages} />}
    </Wrapper>
  );
};

export default Login;
