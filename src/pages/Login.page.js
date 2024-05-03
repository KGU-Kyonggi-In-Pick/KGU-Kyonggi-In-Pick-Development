import { useState } from "react";
import logo from "../assets/images/logo.png";
import { validateStudentId } from "../utils/validateStudentId"; 
import Wrapper from "../styles/styled/Login.styled";
import FormRow from "../components/FormRow.component";
import Modal from "../components/Modal.component";
import PAGES from "../constants/index";

const [vote] = PAGES;

const Login = ({ setLoggedUser, usersData, setCurrentPage }) => {
  const [values, setValues] = useState({
    StudentID: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [studentIdError, setStudentIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const { StudentID, password } = values;

    if (!StudentID || !validateStudentId(StudentID)) {
      const msg = "Please enter a valid Student ID";
      handleError(msg, setStudentIdError);
    } else {
      setStudentIdError(false);
    }

    if (!password) {
      const msg = "Please enter a password";
      handleError(msg, setPasswordError);
    } else {
      setPasswordError(false);
    }

    if (!StudentID || !validateStudentId(StudentID) || !password) {
      setIsLoading(false);
      setIsError(true);
      return;
    } else {
      const userData = usersData.find((user) => user.StudentID === StudentID);
      if (userData) {
        if (userData.password !== password) {
          const msg = "Password does not match Student ID";
          handleError(msg, setPasswordError);
          setIsError(true);
          setIsLoading(false);
        } else {
          setPasswordError(false);

          setTimeout(() => {
            setCurrentPage(vote);
            setLoggedUser({
              id: userData.id,
              name: userData.name,
              StudentID: userData.StudentID,
              type: userData.type,
            });
          }, 2000);
        }
      } else {
        const msg = "No such Student ID in database";
        handleError(msg, setStudentIdError);
        setIsError(true);
        setIsLoading(false);
      }
    }
  };

  const handleError = (msg, setMethod) => {
    setMethod(true);
    setErrorMessages(prevMessages => [...prevMessages, msg]);
  };

  const closeModal = () => {
    setIsError(false);
    setErrorMessages([]);
  };

  const handleSignUp = () => {
    setCurrentPage(PAGES.SignUp);
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
        />
        <FormRow
          error={passwordError}
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "Login"}
        </button>
        <button type="button" className="btn btn-block btn-secondary" onClick={handleSignUp}>
          Sign up
        </button>
      </form>
      {isError && <Modal closeModal={closeModal} messages={errorMessages} />}
    </Wrapper>
  );
};

export default Login;