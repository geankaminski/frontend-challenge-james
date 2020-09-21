import styled from 'styled-components';

export const Header = styled.header`
  background: #ffffff;
  height: 50px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 42px;
    height: 21.32px;
  }
`;

export const Establishments = styled.div`
  margin-top: 30px;
  max-width: 950px;
  height: 90px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    height: 90px;
    padding: 10px;
    display: block;
    text-decoration: none;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 6px;
    }

    &:last-child {
      margin-bottom: 28px;
    }

    img {
      width: 74px;
      height: 74px;
      border-radius: 3px;
    }

    div {
      margin-left: 16px;
      display: flex;

      strong {
        font-size: 18px;
        line-height: 21px;
        color: #4c5164;
        align-self: center;
        margin: 10px 0px;
        padding-bottom: 20px;
      }

      span {
        font-size: 14px;
        line-height: 16px;
        color: #81879c;
        align-self: center;
        margin-left: 12px;
        padding-bottom: 18px;
      }

      p {
        display: inline-block;
        font-size: 15px;
        color: #81879c;
        line-height: 17px;
        align-self: center;
        padding-right: 150px;
        padding-top: 24px;
      }
    }
  }
`;
