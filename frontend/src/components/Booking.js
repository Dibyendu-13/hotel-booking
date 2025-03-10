import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import InputField from "./InputField";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background: #f4f4f4;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 15px; /* Consistent spacing */

  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  margin-bottom: 15px;
  color: #333;
  font-size: 1.8rem;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  background: #fff;

  @media (max-width: 480px) {
    padding: 10px;
    font-size: 0.9rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; /* Space between inputs */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* Center button horizontally */
  gap: 10px; /* Ensure space between buttons */
  margin-top: 15px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;


const FamilyMemberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
`;

const BookHotelButton = styled(Button)`
  background-color: #007bff;
  color: white;
  font-size: 1.5rem; /* Larger text */
  padding: 16px 32px; /* Larger padding */
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 123, 255, 0.8), 0 0 20px rgba(0, 123, 255, 0.6), 0 0 30px rgba(0, 123, 255, 0.4); /* Glowing text effect */
  
  &:hover {
    background-color: #0056b3;
    text-shadow: 0 0 20px rgba(0, 123, 255, 1), 0 0 40px rgba(0, 123, 255, 0.8), 0 0 60px rgba(0, 123, 255, 0.6); /* Brighter glow on hover */
  }

  &:active {
    background-color: #004085;
    text-shadow: 0 0 30px rgba(0, 123, 255, 1), 0 0 50px rgba(0, 123, 255, 0.8), 0 0 70px rgba(0, 123, 255, 0.6); /* Even brighter glow on click */
  }
`;



const RemoveButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;

  &:hover {
    background: darkred;
  }
`;



const Booking = () => {
  const [hotels, setHotels] = useState([]);
  const [booking, setBooking] = useState({
    userId: "",
    hotelId: "",
    checkInDate: "",
    checkOutDate: "",
    familyMembers: [],
  });

  const [loading, setLoading] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", aadhaar: "" });

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      setBooking((prev) => ({ ...prev, userId: storedUser.id }));
    }
  }, []);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/hotels");
        setHotels(response.data);
      } catch (error) {
        toast.error("Failed to fetch hotels.");
      }
    };
    fetchHotels();
  }, []);

  const addFamilyMember = () => {
    if (!newMember.name.trim() || newMember.aadhaar.length !== 12) {
      toast.warn("Enter a valid name and 12-digit Aadhaar number.");
      return;
    }
    setBooking((prev) => ({
      ...prev,
      familyMembers: [...prev.familyMembers, { ...newMember, id: Date.now() }],
    }));
    setNewMember({ name: "", aadhaar: "" });
  };

  const removeFamilyMember = (id) => {
    setBooking((prev) => ({
      ...prev,
      familyMembers: prev.familyMembers.filter((member) => member.id !== id),
    }));
  };

  const handleBooking = async () => {
    if (!booking.userId || !booking.hotelId || !booking.checkInDate || !booking.checkOutDate) {
      toast.warn("Please fill all booking details.");
      return;
    }
    if (booking.familyMembers.length === 0) {
      toast.warn("Please add at least one family member.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/api/booking", booking);
      const bookingId = response.data.booking.id;
      toast.success("Hotel booked successfully!");
      navigate("/checkin", { state: { bookingId } });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error booking hotel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title>Book a Hotel</Title>

        <Select
          value={booking.hotelId}
          onChange={(e) => setBooking({ ...booking, hotelId: e.target.value })}
        >
          <option value="">Select a Hotel</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name}
            </option>
          ))}
        </Select>

        <FormGroup>
          <InputField
            type="date"
            value={booking.checkInDate}
            onChange={(e) => setBooking({ ...booking, checkInDate: e.target.value })}
          />
          <InputField
            type="date"
            value={booking.checkOutDate}
            onChange={(e) => setBooking({ ...booking, checkOutDate: e.target.value })}
          />
        </FormGroup>

        <div>
          <h3>Add Family Members</h3>
          <FormGroup>
            <InputField
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            />
            <InputField
              type="number"
              placeholder="Aadhaar Number"
              value={newMember.aadhaar}
              onChange={(e) => {
                if (/^\d{0,12}$/.test(e.target.value)) {
                  setNewMember({ ...newMember, aadhaar: e.target.value });
                }
              }}
            />
          </FormGroup>
          <ButtonContainer>
            <Button style={{marginRight:"auto"}} onClick={addFamilyMember}>Add Member</Button>
          </ButtonContainer>

          {booking.familyMembers.map((member) => (
            <FamilyMemberContainer key={member.id}>
              <span>{member.name} - {member.aadhaar}</span>
              <RemoveButton onClick={() => removeFamilyMember(member.id)}>❌</RemoveButton>
            </FamilyMemberContainer>
          ))}
        </div>

        <ButtonContainer>
  <BookHotelButton onClick={handleBooking} disabled={loading}>
    {loading ? "Booking..." : "Book Hotel"}
  </BookHotelButton>
</ButtonContainer>

      </Card>
    </Container>
  );
};

export default Booking;
