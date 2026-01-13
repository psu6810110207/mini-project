import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Search, User } from 'lucide-react';

// 1. ต้องประกาศฟังก์ชัน Component ก่อนเสมอ
const HomePage = () => {
  
  // 2. เรียกใช้ Hooks และตัวแปรต่างๆ ตรงนี้ (ก่อน return)
  const { isAuthenticated, logout } = useAuth();

  // ข้อมูลจำลองหนัง (Mock Data)
  const movies = [
    { id: 1, title: "Avatar: The Way of Water", img: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg" },
    { id: 2, title: "Avatar: The Way of Water", img: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg" },
    { id: 3, title: "Avatar: The Way of Water", img: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg" },
    { id: 4, title: "Avatar: The Way of Water", img: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg" },
    { id: 5, title: "Avatar: The Way of Water", img: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg" }

  ];

  // 3. ส่วนแสดงผล (JSX) ต้องอยู่ใน return เท่านั้น
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between">
      
      {/* --- 1. Navbar (ส่วนหัว) --- */}
      <nav className="flex items-center justify-between px-8 py-4 bg-black/90 sticky top-0 z-50 border-b border-gray-800">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="text-3xl font-bold text-yellow-500 tracking-widest cursor-pointer">
            MAJOI
          </div>
          
          {/* Menu Links */}
          <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-300">
            <li className="hover:text-yellow-500 cursor-pointer transition">MAIN MENU</li>
          </ul>
        </div>

        {/* Right Icons & Login Button */}
        <div className="flex items-center gap-4">
          <button className="text-gray-300 hover:text-white transition"><Search size={20} /></button>
          <button className="text-gray-300 hover:text-white text-sm font-bold">EN/TH</button>

          {/* ✅ จุดเช็ค Login: วาง Logic ตรงนี้ เพื่อเปลี่ยนแค่ปุ่ม */}
          {isAuthenticated ? (
            // 🟢 ถ้าล็อกอินแล้ว: โชว์ปุ่ม Logout
            <div className="flex items-center gap-4">
              <span className="text-yellow-500 font-bold hidden md:block">สวัสดีสมาชิก!</span>
              <button 
                onClick={logout} 
                className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-600 transition text-sm"
              >
                ออกจากระบบ
              </button>
            </div>
          ) : (
            // 🔴 ถ้ายังไม่ล็อกอิน: โชว์ปุ่ม Login
            <Link to="/login">
              <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition font-medium text-sm">
                เข้าสู่ระบบ
              </button>
            </Link>
          )}

          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-500 transition">
            <User size={16} />
          </div>
        </div>
      </nav>

      {/* --- 2. Main Content (รายการหนัง) --- */}
      <main className="flex-grow px-8 py-6">
        <h1 className="text-3xl font-bold mb-6 border-l-4 border-yellow-500 pl-4">
          Showing 
        </h1>

        {/* Movie Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link to="/booking" key={movie.id} className="group relative block">
              <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-800 relative">
                <img 
                  src={movie.img} 
                  alt={movie.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {e.currentTarget.src = "https://via.placeholder.com/300x450?text=No+Image"}} 
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="border border-white px-4 py-2 rounded text-sm hover:bg-yellow-500 hover:border-yellow-500 hover:text-black font-bold uppercase tracking-wider transition">
                    Buy Ticket
                  </span>
                </div>
              </div>

              <h3 className="mt-3 text-sm text-center text-gray-400 group-hover:text-white truncate transition-colors">
                {movie.title}
              </h3>
            </Link>
          ))}
        </div>
      </main>

      {/* --- 3. Footer Booking Bar --- */}
      <div className="sticky bottom-0 bg-[#D4AF37] text-black py-4 px-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_-5px_15px_rgba(0,0,0,0.5)] z-40">
        
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter border-r border-black/20 pr-6 hidden md:flex">
          <span>BUY TICKET</span>
        </div>

        <div className="flex-grow flex gap-4 w-full md:w-auto">
          <div className="flex-1 relative">
             <select className="w-full bg-white/20 border border-black/30 px-4 py-2 rounded focus:outline-none focus:border-black font-medium appearance-none cursor-pointer">
              <option>เลือกภาพยนตร์...</option>
              <option>Avatar: The Way of Water</option>
              <option>ธี่หยด 4</option>
            </select>
          </div>
          
          <div className="flex-1 relative">
            <select className="w-full bg-white/20 border border-black/30 px-4 py-2 rounded focus:outline-none focus:border-black font-medium appearance-none cursor-pointer">
              <option>เลือกโรงภาพยนตร์...</option>
              <option>Hat Yai Cineplex</option>
            </select>
          </div>
        </div>

        <Link to="/booking" className="w-full md:w-auto">
          <button className="w-full bg-[#E50914] hover:bg-red-700 text-white font-bold py-2 px-8 rounded shadow-lg whitespace-nowrap transition-colors">
            รอบฉาย
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;