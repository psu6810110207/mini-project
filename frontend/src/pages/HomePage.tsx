import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Search, User, Trash2, Edit, PlusCircle, X } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  img: string;
  description?: string;
}

const HomePage = () => {
  const { isAuthenticated, logout, user } = useAuth();

  // State เก็บข้อมูลหนังและ Loading
  const [movies, setMovies] = useState<Movie[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);

  // State สำหรับ Modal เพิ่ม/แก้ไข หนัง
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newImg, setNewImg] = useState('');
  
  // ✅ State ใหม่: เอาไว้จำว่า "กำลังแก้ไข ID ไหนอยู่" (ถ้าเป็น null แปลว่ากำลังเพิ่มใหม่)
  const [editId, setEditId] = useState<number | null>(null);

  // ฟังก์ชันโหลดข้อมูล
  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:3000/movies'); 
      if (!response.ok) throw new Error('ดึงข้อมูลไม่สำเร็จ');
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // ฟังก์ชันลบหนัง
  const handleDeleteMovie = async (id: number) => {
    if (!window.confirm("คุณแน่ใจไหมว่าจะลบหนังเรื่องนี้? (ลบแล้วหายเลยนะ)")) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/movies/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('ลบข้อมูลไม่สำเร็จ');

      setMovies(movies.filter(m => m.id !== id));
      alert("🗑️ ลบหนังเรียบร้อยแล้ว!");
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("❌ เกิดข้อผิดพลาด: ไม่สามารถลบหนังได้");
    }
  };

  // ✅ ฟังก์ชันเปิด Modal แบบ "เพิ่มหนังใหม่" (เคลียร์ค่า)
  const openAddModal = () => {
    setEditId(null); // บอกระบบว่า "ฉันจะเพิ่มใหม่นะ ไม่ได้แก้ไข"
    setNewTitle('');
    setNewImg('');
    setIsModalOpen(true);
  };

  // ✅ ฟังก์ชันเปิด Modal แบบ "แก้ไข" (ดึงค่าเก่ามาใส่)
  const openEditModal = (movie: Movie) => {
    setEditId(movie.id); // จำ ID ที่จะแก้ไว้
    setNewTitle(movie.title); // เอาชื่อเก่ามาใส่ช่อง
    setNewImg(movie.img);     // เอารูปเก่ามาใส่ช่อง
    setIsModalOpen(true);     // เปิด Modal
  };

  // ✅ ฟังก์ชันบันทึก (รวมทั้ง เพิ่ม และ แก้ไข ไว้ในตัวเดียว)
  const handleSaveMovie = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImg) {
      alert("กรุณากรอกข้อมูลให้ครบ!");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      // ถ้า editId มีค่า => แก้ไข (PATCH), ถ้าไม่มี => เพิ่มใหม่ (POST)
      const method = editId ? 'PATCH' : 'POST';
      const url = editId 
        ? `http://localhost:3000/movies/${editId}` 
        : 'http://localhost:3000/movies';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          title: newTitle, 
          img: newImg,
          description: "รายละเอียดภาพยนตร์..." 
        })
      });

      if (!response.ok) throw new Error('บันทึกข้อมูลไม่สำเร็จ');

      const savedData = await response.json(); // ข้อมูลหนังที่เพิ่งบันทึกเสร็จ

      if (editId) {
        // กรณีแก้ไข: อัปเดตข้อมูลใน State โดยการแทนที่ตัวเก่า
        setMovies(movies.map(m => m.id === editId ? savedData : m));
        alert("✏️ แก้ไขข้อมูลเรียบร้อย!");
      } else {
        // กรณีเพิ่มใหม่: เอาไปต่อท้าย
        setMovies([...movies, savedData]);
        alert("🎉 เพิ่มหนังเรียบร้อย!");
      }

      // ปิด Modal และเคลียร์ค่า
      setIsModalOpen(false);
      setNewTitle('');
      setNewImg('');
      setEditId(null);

    } catch (error) {
      console.error("Error saving movie:", error);
      alert("❌ เกิดข้อผิดพลาด: ไม่สามารถบันทึกข้อมูลได้");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between relative">
      
      {/* --- Navbar --- */}
      <nav className="flex items-center justify-between px-8 py-4 bg-black/90 sticky top-0 z-40 border-b border-gray-800">
        <div className="flex items-center gap-8">
          <div className="text-3xl font-bold text-yellow-500 tracking-widest cursor-pointer">MAJOI</div>
          <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-300">
            <li className="hover:text-yellow-500 cursor-pointer transition">MAIN MENU</li>
          </ul>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-yellow-500 font-bold hidden md:block">
                 สวัสดี {user?.username} <span className="text-xs text-gray-400">({user?.role})</span>
              </span>
              <button onClick={logout} className="bg-gray-700 text-white px-4 py-1 rounded hover:bg-gray-600 transition text-sm">
                ออกจากระบบ
              </button>
            </div>
          ) : (
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

      {/* --- Main Content --- */}
      <main className="flex-grow px-8 py-6">
        <div className="flex justify-between items-center mb-6 border-l-4 border-yellow-500 pl-4">
           <h1 className="text-3xl font-bold">Showing</h1>
           
           {/* ปุ่มเพิ่มหนัง (เรียก openAddModal) */}
           {user?.role === 'admin' && (
             <button 
               onClick={openAddModal}
               className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition text-sm"
             >
                <PlusCircle size={18} /> เพิ่มหนังใหม่
             </button>
           )}
        </div>

        {loading ? (
          <div className="text-center text-gray-400 mt-20 text-lg">
            กำลังโหลดข้อมูลภาพยนตร์...
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="group relative block">
                {/* ปุ่ม Admin (แก้ไข/ลบ) */}
                {user?.role === 'admin' && (
                  <div className="absolute top-2 right-2 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* ✅ ปุ่มแก้ไข (เรียก openEditModal) */}
                    <button 
                      className="bg-blue-600 p-2 rounded-full text-white hover:bg-blue-700 shadow-lg" 
                      onClick={() => openEditModal(movie)}
                      title="แก้ไข"
                    >
                      <Edit size={14} />
                    </button>

                    <button 
                      className="bg-red-600 p-2 rounded-full text-white hover:bg-red-700 shadow-lg"
                      onClick={(e) => {
                        e.preventDefault(); 
                        handleDeleteMovie(movie.id);
                      }} 
                      title="ลบหนัง"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}

                <Link to={`/booking/${movie.id}`}>
                  <div className="aspect-[2/3] overflow-hidden rounded-lg bg-gray-800 relative">
                    <img 
                      src={movie.img} 
                      alt={movie.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {e.currentTarget.src = "https://via.placeholder.com/300x450?text=No+Image"}} 
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 pointer-events-none">
                      <span className="border border-white px-4 py-2 rounded text-sm hover:bg-yellow-500 hover:border-yellow-500 hover:text-black font-bold uppercase tracking-wider transition">
                        Buy Ticket
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-3 text-sm font-medium text-gray-300 group-hover:text-white truncate transition-colors">
                    {movie.title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* --- Footer --- */}
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
        <Link to="/booking/1" className="w-full md:w-auto">
          <button className="w-full bg-[#E50914] hover:bg-red-700 text-white font-bold py-2 px-8 rounded shadow-lg whitespace-nowrap transition-colors">
            รอบฉาย
          </button>
        </Link>
      </div>

      {/* --- Modal (ใช้ร่วมกันทั้ง เพิ่ม และ แก้ไข) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-md relative shadow-2xl">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            {/* เปลี่ยนหัวข้อตามสถานะ */}
            <h2 className="text-2xl font-bold text-yellow-500 mb-6 flex items-center gap-2">
              {editId ? <Edit /> : <PlusCircle />} 
              {editId ? 'แก้ไขข้อมูลหนัง' : 'เพิ่มหนังใหม่'}
            </h2>

            <form onSubmit={handleSaveMovie} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-1">ชื่อภาพยนตร์</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                  placeholder="เช่น Spider-Man"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-300 mb-1">ลิงก์รูปภาพ (URL)</label>
                <input 
                  type="text" 
                  value={newImg}
                  onChange={(e) => setNewImg(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-yellow-500"
                  placeholder="https://..."
                />
              </div>

              <button 
                type="submit"
                className={`w-full font-bold py-2 rounded mt-4 transition text-white
                  ${editId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}
                `}
              >
                {editId ? 'อัปเดตข้อมูล' : 'บันทึกข้อมูล'}
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default HomePage;