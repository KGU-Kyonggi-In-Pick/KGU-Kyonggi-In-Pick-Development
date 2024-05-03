import { useState } from "react";
import logo from "../assets/images/logo.png";
import { validateStudentId } from "../utils/validateStudentId";
import Wrapper from "../styles/styled/SignUp.styled";
import FormRow from "../components/FormRow.component";
import Modal from "../components/Modal.component";
import PAGES from "../constants/index";

const [vote, loginPage] = PAGES; // 로그인 페이지 추가

const SignUp = ({ setLoggedUser, usersData, setCurrentPage }) => {
  const [values, setValues] = useState({
    StudentID: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [studentIdError, setStudentIdError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
    if (name === "StudentID") {
      setIsVerified(false); // Reset verification status when ID changes
    }
  };

  const handleVerifyStudentId = () => {
    if (validateStudentId(values.StudentID)) {
      setTimeout(() => {  // Simulate an API call
        setIsVerified(true);
        alert("Student ID verified successfully!");
      }, 1000);
    } else {
      setIsVerified(false);
      alert("Invalid Student ID format.");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearErrors();

    const { StudentID, name, password, confirmPassword } = values;

    if (!isVerified) {
      handleError("Please verify your student ID before registering.", setStudentIdError);
      setIsLoading(false);
      return;
    }

    if (!name) {
      handleError("Name is required.", setNameError);
    }

    if (password !== confirmPassword) {
      handleError("Passwords do not match.", setConfirmPasswordError);
    }

    if (!password) {
      handleError("Password is required.", setPasswordError);
    }

    if (studentIdError || nameError || passwordError || confirmPasswordError || isError) {
      setIsLoading(false);
      return;
    }

    const userExists = usersData.some(user => user.StudentID === StudentID);
    if (userExists) {
      handleError("Student ID already registered.", setStudentIdError);
      setIsLoading(false);
      return;
    }

    const newUser = { StudentID, name, password, type: "user" };
    usersData.push(newUser);
    setLoggedUser(newUser);
    setCurrentPage(vote);
    setIsLoading(false);
  };

  const handleError = (msg, setMethod) => {
    setMethod(true);
    setErrorMessages(prev => [...prev, msg]);
  };

  const clearErrors = () => {
    setStudentIdError(false);
    setNameError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setIsError(false);
    setErrorMessages([]);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
        <FormRow
          error={studentIdError}
          type="text"
          name="StudentID"
          value={values.StudentID}
          handleChange={handleChange}
          placeholder="Enter your student ID"
        />
        <button type="button" className="verify-btn" onClick={handleVerifyStudentId} disabled={isLoading}>
          Verify ID
        </button>
        <FormRow
          error={nameError}
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
          placeholder="Enter your name"
        />
        <FormRow
          error={passwordError}
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          placeholder="Enter your password"
        />
        <FormRow
          error={confirmPasswordError}
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          handleChange={handleChange}
          placeholder="Confirm your password"
        />
        <button type="submit" className="btn btn-block" disabled={isLoading || !isVerified}>
          {isLoading ? "Registering..." : "Register"}
        </button>
        {/* 로그인 페이지로의 이동 버튼 */}
        <button type="button" className="btn btn-block btn-secondary" onClick={() => setCurrentPage(loginPage)}>
          Login
        </button>
      </form>
      {isError && <Modal closeModal={() => clearErrors()} messages={errorMessages} />}
    </Wrapper>
  );
};

export default SignUp;
