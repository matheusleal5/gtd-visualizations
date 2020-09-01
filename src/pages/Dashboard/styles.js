import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
  }

  svg {
    color: #999591;
    width: 20px;
    height: 20px;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  h1 {
    margin-left: 50px;
    font-size: 40px;
    color: #dd7250;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Visualizations = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    margin-top: 40px;
    font-size: 36px;
    color: #3e3b47;
  }

  p {
    margin-top: 8px;
    color: #3e3b47;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 18px;
  }
`;

export const Visualization = styled.div` 
  margin-top: 40px;
  display: flex;
  align-items: center;

  h1 {
    margin-top: 40px;
    font-size: 36px;
    color: #3e3b47;
   }

  p {
    margin-top: 8px;
    color: #3e3b47;
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 18px;
  }

  div {
    display: flex;
    flex-direction: column;
    background: #f0f1f2;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
  }
`;