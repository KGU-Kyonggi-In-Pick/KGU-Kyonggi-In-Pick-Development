import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--red-dark);
    padding: 2rem;
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
  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .btn-light {
    background: var(--white);
    color: var(--red-dark);
    border: 1px solid var(--red-dark);
    border-radius: 5px;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s, color 0.3s;
  }
  .btn-light:hover {
    background: var(--grey-50);
    color: var(--black);
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--red-dark);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;
export default Wrapper;