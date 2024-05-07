import styled from 'styled-components';

// Container for the entire main page
export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #8420283a;  // Light red background to match other pages
`;

// Container for a list of temporary votes
export const TemporaryVoteList = styled.div`
  height: 200px; // Fixed height
  width: 900px; // Fixed width
  overflow: auto; // Enable scrolling
  padding: 5px;
  background-color: #ffffff; // White background for contrast
  border-radius: 5px; // Rounded corners
  border: 1px solid #ccc; // Subtle border
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Soft shadow for depth
  margin-bottom: 20px; // Space below the container
`;

// Individual items in the vote list
export const TemporaryVoteItem = styled.div`
  height: 50px; // Fixed height for each item
  display: flex;
  align-items: center;
  justify-content: center; // Center content horizontally
  padding: 5px;
  background-color: ${props => (props.isSelected ? "var(--red-dark)" : "transparent")}; // Highlight if selected
  color: ${props => (props.isSelected ? "#fff" : "#333")}; // Text color contrast
  cursor: pointer; // Pointer cursor on hover
  border-bottom: 1px solid #ccc; // Separator between items

  &:hover {
    background-color: var(--red-dark); // Dark red on hover
    color: #fff; // White text on hover
  }
`;

// Styled button for actions
export const Button = styled.button`
  padding: 10px 20px;
  background-color: var(--red-dark); // Consistent button color
  color: #fff; // Text color for readability
  border: none;
  border-radius: 5px; // Rounded corners
  cursor: pointer; // Pointer on hover
  margin-bottom: 10px; // Space below button
`;
