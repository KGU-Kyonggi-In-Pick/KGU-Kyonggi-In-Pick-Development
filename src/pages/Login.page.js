import React, { useState } from 'react';
import logo from "../assets/images/logo.png";
import Wrapper from '../styles/styled/Login.styled';
import { validateStudentId } from "../utils/validateStudentId";
import FormRow from "../components/FormRow.component";
import Modal from "../components/Modal.component";
import PAGES from "../constants/index";

const Login = ({ setLoggedUser, usersData, setCurrentPage }) => {
  const [isSignUp, setIsSignUp] = useState(false); // 회원가입 모드 여부 상태
  const [values, setValues] = useState({
    StudentID: "",
    name: "",
    password: "",
    confirmPassword: ""
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [verified, setVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleVerifyStudentId = () => {
    if (validateStudentId(values.StudentID)) {
      setVerified(true);
      alert("Student ID verified successfully!");
    } else {
      setVerified(false);
      alert("Invalid Student ID format.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearErrors();

    if (isSignUp) {
      // 회원가입 로직
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
        usersData.push(newUser);
        setLoggedUser(newUser);
        setCurrentPage(PAGES.main); // 로그인 성공 시 메인 페이지로 전환
      }
    } else {
      // 로그인 로직
      const user = usersData.find(u => u.StudentID === values.StudentID && u.password === values.password);
      if (!user) {
        handleError("Invalid credentials.");
        setIsLoading(false);
      } else {
        setLoggedUser(user);
        setCurrentPage(PAGES.main); // 로그인 성공 시 메인 페이지로 전환
      }
    }

    setIsLoading(false);
  };

  const handleError = (message) => {
    setIsError(true);
    setErrorMessages(prev => [...prev, message]);
  };

  const clearErrors = () => {
    setIsError(false);
    setErrorMessages([]);
  };

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