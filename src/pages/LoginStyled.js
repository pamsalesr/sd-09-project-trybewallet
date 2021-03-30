import Styled from 'styled-components';

export const LoginContainer = Styled.div` border: 2px solid gray;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  margin: 10% auto;
  max-width: 300px;
  padding: 20px;

  .link {
    margin: 0 auto;
    margin-top: 15px;
    min-width: 208px;
    text-align: center;
  }
`;

export const Img = Styled.img` margin: 0 auto;
  margin-bottom: 20px;
  max-width: 200px;
`;

export const Input = Styled.input` border: 1px solid gray;
  border-radius: 7px;
  height: 30px;
  margin: 0 auto;
  min-width: 200px;
  text-align: center;
`;

export const Button = Styled.button` border-radius: 7px;
  height: 30px;
  margin: 0 auto;
  min-width: 208px;
  text-align: center;
`;
