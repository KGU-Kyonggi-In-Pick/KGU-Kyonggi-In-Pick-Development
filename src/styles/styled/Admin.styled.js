// kyonggi--main/src/styles/styled/Admin.styled.js

import styled from "styled-components";

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-top: 13px;
  gap: 20px;
  min-height: calc(100vh - 6rem);
  align-items: center;
  padding-bottom: 20px;
`;

export const AdminContainer = styled.div`
  padding: 20px;
  margin-top: 0px;
  max-width: 800px;
  justify-content: center;
  background: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const AdminHeader = styled.h1`
  font-weight: 900;
  -webkit-text-stroke: 1.5px rgba(0, 0, 0, 0.632);
  align-items: center;
  justify-content: center;
  margin: 0;
  color: var(--red-dark); /* 텍스트 색상 적용 */
  opacity: 0.9;
`;

export const StyledButtonLarge = styled.button`
  width: 400px;
  height: 60px;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

export const StyledButtonSmall = styled.button`
  width: 100px;
  height: 30px;
  margin-bottom: 20px;
`;

export const StyledDivCenter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
