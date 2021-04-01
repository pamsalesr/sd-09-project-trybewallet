import Styled from 'styled-components';

export const Header = Styled.header` align-items: center;
  display: flex;
  justify-content: space-evenly;
  padding: 20px;
`;

export const EmailContainer = Styled.span` font-size: 20px;
`;

export const TotalContainer = Styled.span` font-size: 20px;
`;

export const SectionInputs = Styled.section` align-items: center;

  /* verdeTrybe #2fc18c; */
  background-color: gray;
  color: white;
  display: flex;
  height: 70px;
  justify-content: space-evenly;

  input {
    height: 25px;
    margin-left: 5px;
    max-width: 100px;
  }

  select {
    height: 31px;
    margin-left: 5px;
  }
`;

export const Button = Styled.button` display: inline-block;
  height: 31px;
`;
