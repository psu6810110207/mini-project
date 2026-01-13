import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BookingPage.css';

interface Seat {
  id: number;
  seatNumber: number;
  isBooked: boolean;
}

const BookingPage = () => {
  const { id } = useParams();

  // กำหนดชื่อหนังตาม ID
  const movieTitle = id === '1' ? "Iron Man 1" : "Avatar: The Way of Water";

  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  // สร้างข้อมูลที่นั่งจำลอง
  useEffect(() => {
    const mockSeats: Seat[] = [];
    for (let i = 1; i <= 40; i++) {
      mockSeats.push({
        id: i,
        seatNumber: i,
        isBooked: Math.random() < 0.3 
      });
    }
    setSeats(mockSeats);
  }, [id]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.isBooked) return;
    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  // ✅ เพิ่มฟังก์ชันนี้กลับมาครับ!
  const handleConfirmBooking = () => {
    if (selectedSeats.length === 0) return;
    
    // แสดง Alert ยืนยัน
    alert(`🎉 จองสำเร็จ!\n\nหนัง: ${movieTitle}\nที่นั่ง: ${selectedSeats.join(', ')}\nราคา: ${selectedSeats.length * 200} บาท`);
    
    // เคลียร์ที่นั่งที่เลือกหลังจองเสร็จ
    setSelectedSeats([]);
  };
  return (
    <div className="container" style={{ textAlign: 'center', color: 'white', paddingTop: '20px' }}>
      
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
         จองตั๋วหนัง: {movieTitle} <span style={{color: 'yellow'}}>(รหัส {id})</span>
      </h2>
      
      <div className="screen" style={{ 
          background: '#ccc', color: 'black', padding: '10px', 
          margin: '0 auto 30px', maxWidth: '600px', fontWeight: 'bold' 
      }}>
        SCREEN
      </div>

      <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(8, 1fr)', 
          gap: '10px',
          maxWidth: '400px',
          margin: '0 auto'
      }}>
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => handleSeatClick(seat)}
            disabled={seat.isBooked}
            style={{
              padding: '10px',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: seat.isBooked ? 'not-allowed' : 'pointer',
              backgroundColor: seat.isBooked 
                ? '#555'       
                : selectedSeats.includes(seat.id) 
                  ? '#E50914'  
                  : '#22c55e', 
              color: 'white'
            }}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '30px' }}>
        <p>ที่นั่งที่เลือก: {selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}</p>
        
        {/* ✅ เพิ่ม onClick ตรงนี้แล้วครับ กดได้แน่นอน! */}
        <button 
          onClick={handleConfirmBooking}
          disabled={selectedSeats.length === 0}
          style={{
            marginTop: '10px',
            padding: '10px 30px',
            backgroundColor: selectedSeats.length > 0 ? '#E50914' : '#555',
            color: 'white',
            border: 'none',
            fontSize: '16px',
            cursor: selectedSeats.length > 0 ? 'pointer' : 'not-allowed', // เปลี่ยนเมาส์ให้รู้ว่ากดได้
            transition: '0.3s'
          }}
        >
          ยืนยันการจอง
        </button>
      </div>
    </div>
  );
};

export default BookingPage;