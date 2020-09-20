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

export const Details = styled.div`
  background: #fff;
  margin-top: 30px;
  max-width: 950px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  border: 1px solid #f9f9f9;

  div {
    display: flex;
    align-items: center;
    margin-top: 20px;

    a {
      display: flex;
      text-decoration: none;
      color: #363840;
      transition: color 0.2s;

      &:hover {
        color: #666;
      }

      svg {
        margin-left: 32px;
        margin-right: 30px;
      }
    }

    img {
      width: 74px;
      height: 74px;
      border-radius: 3px;
    }

    div {
      margin-left: 22px;
      display: block;
      padding-bottom: 15px;

      strong {
        font-size: 21px;
        line-height: 24px;
        color: #4c5164;
      }

      p {
        font-size: 14px;
        line-height: 16px;
        color: #81879c;
        margin-top: 4px;
      }
    }
  }
`;

export const DataInput = styled.div`
  Form {
    padding-left: 30px;
    padding-right: 30px;

    p {
      font-weight: 500;
      font-size: 16px;
      font-style: bold;
      line-height: 18px;
      color: #4c5164;
      padding-top: 15px;
      padding-bottom: 15px;
    }

    hr {
      border: 1px solid #e6e8f0;
    }

    section {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      div {
        max-width: 260px;
      }
    }

    button {
      margin-top: 94px;
      margin-bottom: 30px;
      background: #28cc9b;
      border-radius: 100px;
      width: 111px;
      height: 41px;
      border: 1px solid #28cc9b;
      float: right;
      cursor: pointer;
      color: #ffffff;
      font-size: 13px;
      text-align: center;
      text-decoration: none;
      letter-spacing: 0.05em;

      &:hover {
        background: #5cbf2a;
      }
    }

    input,
    select {
      width: 260px;
      display: inline-block;
      padding: 12px 20px;
      margin: 8px 0;
      border: 1px solid #e6e8f0;
      border-radius: 5px;
      box-sizing: border-box;
      background: linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.5),
          rgba(255, 255, 255, 0.5)
        ),
        #f8f9fd;
    }

    label {
      font-weight: 500;
      font-size: 13px;
      line-height: 15px;
      color: #4c5164;
      display: inline-block;
    }
  }
`;
