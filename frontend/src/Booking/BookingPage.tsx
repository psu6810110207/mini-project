import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// ประกาศ Type ให้ตรงกับข้อมูลที่ Backend ส่งมา
interface Seat {
  id: number;
  seatNumber: number;
  isBooked: boolean;
}

interface Movie {
  id: number;
  title: string;
  img: string;
  seats: Seat[];
}

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State สำหรับเก็บข้อมูลหนัง (รวมที่นั่ง) ที่ดึงมาจาก Backend
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. ดึงข้อมูลจาก Backend
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/movies/${id}`);
        
        if (!response.ok) {
           throw new Error('ไม่พบข้อมูลภาพยนตร์');
        }

        const data = await response.json();
        setMovie(data); 
      } catch (error) {
        console.error("Error:", error);
        alert("ไม่พบข้อมูลภาพยนตร์ หรือ Backend ยังไม่เปิด");
        navigate('/'); 
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id, navigate]);

  // ฟังก์ชันเลือกที่นั่ง
  const handleSelectSeat = (seatId: number, isBooked: boolean) => {
    if (isBooked) return; // ถ้าจองแล้ว ห้ามกด

    if (selectedSeats.includes(seatId)) {
      // ถ้าเลือกไว้อยู่แล้ว -> เอาออก
      setSelectedSeats(selectedSeats.filter(sid => sid !== seatId));
    } else {
      // ถ้ายังไม่เลือก -> ใส่เพิ่ม
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  // ✅ แก้ไขใหม่: ฟังก์ชันกดยืนยันการจอง (ยิง API ไปหา Backend)
  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) return;

    // ถามยืนยันก่อนส่งข้อมูล
    if (!window.confirm(`ยืนยันการจองที่นั่งจำนวน ${selectedSeats.length} ที่ ใช่หรือไม่?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token'); // ดึง Token
      
      // 1. ส่งข้อมูลไปที่ Backend (POST /bookings)
      const response = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ seatIds: selectedSeats }) // ส่ง ID ที่นั่งที่เลือกไป
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'จองไม่สำเร็จ');
      }

      // 2. ถ้าสำเร็จ
      alert("🎉 จองสำเร็จเรียบร้อย! ขอบคุณที่ใช้บริการ");
      
      // 3. ดีดกลับไปหน้าแรก (เพื่อให้ข้อมูลรีเฟรชใหม่)
      navigate('/'); 

    } catch (error: any) {
      console.error("Booking Error:", error);
      alert(`❌ เกิดข้อผิดพลาด: ${error.message}`);
      
      // กรณีจองชนกัน (มีคนตัดหน้า) ให้โหลดหน้าใหม่เพื่อดูสถานะล่าสุด
      window.location.reload(); 
    }
  };

  if (loading) return <div className="text-white text-center mt-20">กำลังโหลดผังที่นั่ง...</div>;
  if (!movie) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      
      {/* Header */}
      <div className="w-full max-w-4xl flex items-center mb-8 relative">
        <button 
          onClick={() => navigate('/')}
          className="absolute left-0 text-gray-400 hover:text-white flex items-center gap-2"
        >
          <ArrowLeft /> กลับหน้าหลัก
        </button>
        <h1 className="text-3xl font-bold text-yellow-500 mx-auto">
          {movie.title}
        </h1>
      </div>

      {/* Screen */}
      <div className="w-full max-w-2xl mb-10">
        <div className="h-2 bg-yellow-500 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.5)] mb-4"></div>
        <p className="text-center text-gray-500 text-sm uppercase tracking-widest">SCREEN</p>
      </div>

      {/* 🪑 Grid ที่นั่ง */}
      <div className="grid grid-cols-5 gap-4 mb-10">
        {movie.seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat.id);
          
          return (
            <button
              key={seat.id}
              disabled={seat.isBooked}
              onClick={() => handleSelectSeat(seat.id, seat.isBooked)}
              className={`
                w-12 h-12 rounded-t-lg rounded-b-md flex items-center justify-center font-bold text-sm transition-all duration-200 shadow-md
                ${seat.isBooked 
                  ? 'bg-red-900/50 text-gray-500 cursor-not-allowed border border-red-900' // จองแล้ว
                  : isSelected 
                    ? 'bg-yellow-500 text-black scale-110 shadow-[0_0_10px_#EAB308]' // กำลังเลือก
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300' // ว่าง
                }
              `}
            >
              {seat.seatNumber}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mb-12 text-sm text-gray-400">
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gray-700 rounded"></div> ว่าง</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-yellow-500 rounded"></div> ที่เลือก</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 bg-red-900/50 border border-red-900 rounded"></div> จองแล้ว</div>
      </div>

      {/* Footer Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 border-t border-gray-700 p-4 shadow-2xl">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">ที่นั่งที่เลือก: <span className="text-white font-bold">{selectedSeats.length} ที่นั่ง</span></p>
            <p className="text-2xl font-bold text-yellow-500">{(selectedSeats.length * 200).toLocaleString()} บาท</p>
          </div>
          
          <button 
            onClick={handleConfirmBooking}
            disabled={selectedSeats.length === 0}
            className={`
              px-8 py-3 rounded-lg font-bold text-lg transition
              ${selectedSeats.length > 0 
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg cursor-pointer' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'}
            `}
          >
            ยืนยันการจอง
          </button>
        </div>
      </div>

    </div>
  );
};

export default BookingPage;