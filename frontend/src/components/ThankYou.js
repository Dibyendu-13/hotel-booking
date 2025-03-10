import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f4f4;
`;

const Card = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
  width: 480px;
`;

const Title = styled.h2`
  margin-bottom: 15px;
  color: #333;
  font-size: 24px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  margin-top: 15px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingId = location.state?.bookingId;

  return (
    <Container>
      <Card>
        <Title>✅ Check-In Successful!</Title>
        <p>Your booking ID: <strong>{bookingId}</strong></p>
        <Button onClick={() => navigate("/")}>Go to Home</Button>
      </Card>
    </Container>
  );
};

export default ThankYou;
