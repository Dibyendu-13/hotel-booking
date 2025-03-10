import React from "react";
import styled from "styled-components";

const Foot = styled.footer`
  background: #333;
  color: white;
  padding: 15px 20px;
  text-align: center;
  font-size: 1rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    position: relative;
    padding: 10px;
    font-size: 0.85rem;
  }
`;

const Footer = () => {
  return <Foot>© {new Date().getFullYear()} Hotel Booking Inc.</Foot>;
};

export default Footer;
