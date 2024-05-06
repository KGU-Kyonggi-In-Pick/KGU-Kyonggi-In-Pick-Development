import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
    width: 100px; // 로고의 폭을 100px로 설정
    height: auto; // 로고의 높이를 자동으로 조절하여 비율을 유지
  }
  .form {
    max-width: 400px;
    margin: auto;
    padding: 2rem;
    border-top: 5px solid var(--red-dark);
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .input-group {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
  }
  .input-field {
    flex-grow: 1;
    border: none;
    padding: 8px 12px;
    outline: none;
  }
  .verify-btn {
    background-color: #808080;
    color: white;
    border: none;
    padding: 8px 15px;
    cursor: pointer;
    outline: none;
  }
  h3, p {
    text-align: center;
    margin-top: 1rem;
  }
  p {
    margin: 0;
  }
  .btn, .btn-light {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
  }
  .btn-light {
    background: var(--white);
    color: var(--red-dark);
    border: 1px solid var(--red-dark);
  }
  .btn-light:hover {
    background: var(--grey-50);
    color: var(--black);
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--red-dark);
    letter-spacing: var(--letterSpacing);
  }
`;

export default Wrapper;

