import styled from 'styled-components';

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const TemporaryVoteList = styled.div`
  height: 200px; /* Set a fixed height */
  width: 900px; /* Set a fixed width */
  overflow: auto;
  padding: 5px;
  background-color: #ffffff;
  border-radius: 5px; /* Add border radius */
  border: 1px solid #ccc; /* Add border */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const TemporaryVoteItem = styled.div`
  height: 50px; /* Set a fixed height for list items */
  display: flex;
  align-items: center;
  justify-content: center; /* Center text vertically */
  padding: 5px;
  background-color: ${(props) => (props.isSelected ? "var(--red-dark)" : "transparent")};
  color: ${(props) => (props.isSelected ? "#fff" : "#333")};
  cursor: pointer;
  border-bottom: 1px solid #ccc; /* Add border bottom */

  /* Hover effect */
  &:hover {
    background-color: var(--red-dark);
  }
`;


export const Button = styled.button`
  padding: 10px 20px;
  background-color: var(--red-dark);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px; /* Add margin bottom to separate buttons */
`;