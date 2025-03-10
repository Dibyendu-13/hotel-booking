import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const Card = styled.div`
  width: 400px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
`;

const FamilyInputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const InputField = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const RemoveButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: darkred;
  }
`;

const CheckIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingId = location.state?.bookingId;
  console.log("🚪 Check-in page opened with booking ID:", bookingId);

  const [familyMembers, setFamilyMembers] = useState([]);
  const [aadhaarNumbers, setAadhaarNumbers] = useState({});
  const [name, setName] = useState("");

  const addMember = () => {
    if (name.trim()) {
      setFamilyMembers([...familyMembers, { id: Date.now(), name: name.trim() }]);
      setName("");
    }
  };

  const removeMember = (id) => {
    setFamilyMembers(familyMembers.filter((member) => member.id !== id));
  };

  const handleAadhaarChange = (id, value) => {
    if (/^\d{0,12}$/.test(value)) {
      setAadhaarNumbers({ ...aadhaarNumbers, [id]: value });
    }
  };

  const handleCheckIn = async () => {
    const isValid = familyMembers.every(
      (member) => aadhaarNumbers[member.id] && aadhaarNumbers[member.id].length === 12
    );

    if (!isValid) {
      toast.warn("Please enter valid 12-digit Aadhaar numbers.");
      return;
    }

    try {
      await axios.post("http://localhost:5001/api/checkin", {
        members: familyMembers.map((member) => ({
          name: member.name,
          aadhaar: aadhaarNumbers[member.id],
        })),
        bookingId,
      });

      toast.success("Check-in successful!");
      navigate("/thank-you", { state: { bookingId } });

    } catch (error) {
      toast.error("Error during check-in.");
    }
  };

  return (
    <Container>
      <Card>
        <Title>Web Check-In</Title>
        <FamilyInputContainer>
          <InputField
            type="text"
            placeholder="Family Member Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={addMember}>Add</Button>
        </FamilyInputContainer>
        <List>
          {familyMembers.map((member) => (
            <ListItem key={member.id}>
              <span>{member.name}</span>
              <InputField
                type="number"
                placeholder="Aadhaar Number"
                value={aadhaarNumbers[member.id] || ""}
                onChange={(e) => handleAadhaarChange(member.id, e.target.value)}
              />
              <RemoveButton onClick={() => removeMember(member.id)}>❌</RemoveButton>
            </ListItem>
          ))}
        </List>
        <Button onClick={handleCheckIn}>Confirm Check-In</Button>
      </Card>
    </Container>
  );
};

export default CheckIn;
