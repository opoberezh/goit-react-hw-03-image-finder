import styled from 'styled-components';

export const Button = styled.button`
  box-sizing: border-box;
  width: 127px;
  height: 45px;

  margin: 10px 24px;
  border-radius: 4px;
  background-color: #0047AB;
  border: 1px solid #0047AB;
  color: #f8f8f8;
  font-size: 19px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
   0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: #f8f8f8;
    border: 1px solid #0047AB;
    color:#0047AB;
`;