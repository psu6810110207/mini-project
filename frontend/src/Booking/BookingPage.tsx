import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingPage.css';

// 1. สร้าง "แม่พิมพ์" (Interface) เพื่อบอกว่าข้อมูลที่นั่งหน้าตาเป็นยังไง
interface Seat {
  id: number;
  seatNumber: number;
  isBooked: boolean;
}

const BookingPage = () => {
  // 2. ระบุ Type ใน useState (<Seat[]> และ <number[]>)
  const [seats, setSeats] = useState<Seat[]>([]); 
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]); 
  const movieId = 1;

  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/seats/movie/${movieId}`);
      // TypeScript จะรู้แล้วว่า a และ b คือ Seat
      const sortedSeats = response.data.sort((a: Seat, b: Seat) => a.seatNumber - b.seatNumber);
      setSeats(sortedSeats);
    } catch (error) {
      console.error("Error fetching seats:", error);
      alert("ไม่สามารถดึงข้อมูลที่นั่งได้");
    }
  };

  // 3. ระบุว่าตัวแปร seat ที่รับเข้ามา ต้องมีหน้าตาเหมือนแม่พิมพ์ Seat
  const handleSeatClick = (seat: Seat) => {
    if (seat.isBooked) return;

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const handleConfirmBooking = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนจองตั๋ว!");
      return;
    }

    try {
      await axios.post('http://localhost:3000/bookings', 
        { seatIds: selectedSeats },
        { 
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("🎉 จองตั๋วสำเร็จเรียบร้อย!");
      setSelectedSeats([]);
      fetchSeats();

    } catch (error: any) { // 4. ใส่ : any เพื่อให้เข้าถึง error.response ได้โดยไม่ฟ้อง Error
      console.error(error);
      const errorMessage = error.response?.data?.message || "เกิดข้อผิดพลาดในการจอง";
      alert(`❌ จองไม่สำเร็จ: ${errorMessage}`);
    }
  };

  return (
    <div className="container">
      <h2>จองตั๋วหนัง: Avatar The Way of Water</h2>
      
      <div className="screen">SCREEN</div>

      <div className="seats-grid">
        {seats.map((seat) => (
          <button
            key={seat.id}
            className={`seat ${
              seat.isBooked 
                ? 'booked'
                : selectedSeats.includes(seat.id) 
                  ? 'selected'
                  : 'available'
            }`}
            onClick={() => handleSeatClick(seat)}
            disabled={seat.isBooked}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '20px' }}>
        <p>ที่นั่งที่เลือก: {selectedSeats.length > 0 ? selectedSeats.length : '-'}</p>
        <button 
          className="confirm-btn"
          onClick={handleConfirmBooking}
          disabled={selectedSeats.length === 0}
        >
          ยืนยันการจอง
        </button>
      </div>
    </div>
  );
};

export default BookingPage;