import { useState } from 'react';
import { motion } from 'framer-motion';

// --- 1. สร้างข้อมูลหนังตัวอย่าง (Mockup Data) ---
// คุณสามารถเปลี่ยน src เป็น URL รูปโปสเตอร์หนังจริงที่คุณต้องการได้เลยครับ
// ข้อมูลหนัง (แก้ชื่อไฟล์ตรง src ให้ตรงกับที่คุณตั้งชื่อไว้)
const movies = [
  {
    id: 1,
    title: "อวตาร: อัคนีและธุลีดิน",
    date: "17 DEC 2025",
    // สังเกตว่าขึ้นต้นด้วย /images/ ได้เลย
    src: "/images/Avatar.jpg" 
  },
  {
    id: 2,
    title: "RENTAL FAMILY ครอบครัวให้เช่า",
    date: "08 JAN 2026",
    src: "/images/family.jpg"
  },
  {
    id: 3,
    title: "ปันหยี I SEA YOU",
    date: "08 JAN 2026",
    src: "/images/see.jpg"
  },
  {
    id: 4,
    title: "ข้างบ้าน",
    date: "04 DEC 2025",
    src: "/images/neighbor.jpg" 
  },
  {
    id: 5,
    title: "บันทึก หนานจิง",
    date: "08 JAN 2026",
    src: "/images/nanjing.jpg"
  },
   {
    id: 6,
    title: "Coming Soon...",
    date: "XXXX 2026",
    src: "/images/soon.jpg"
  },
];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('เข้าสู่ระบบสำเร็จ (จำลอง)');
    }, 2000);
  };

  const inputClasses = "peer w-full pl-4 pr-4 pt-5 pb-2 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 backdrop-blur-sm font-medium";
  const labelClasses = "absolute left-4 top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3.5 peer-focus:top-1 peer-focus:text-red-400 peer-focus:text-xs pointer-events-none";

  return (
    // --- 2. ปรับ Main Container เป็น Flex แบบแบ่งคอลัมน์ ---
    <div className="min-h-screen w-full relative bg-black font-['Kanit'] selection:bg-red-500/30 overflow-x-hidden">
      
      {/* Background Motion (อยู่ชั้นหลังสุด) */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="fixed inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop" 
          alt="Cinema Background" 
          className="w-full h-full object-cover opacity-30 filter blur-[5px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-black/60"></div>
      </motion.div>

      {/* Content Container (แบ่งซ้าย-ขวา) */}
      {/* ใช้ flex-col บนมือถือ และ flex-row บนจอใหญ่ (lg) */}
      <div className="relative z-10 min-h-screen w-full flex flex-col lg:flex-row">

        {/* ========= ส่วนซ้าย: Login Section ========= */}
        {/* กว้างเต็มบนมือถือ, กว้าง 5/12 (ประมาณ 41%) บนจอใหญ่ */}
        <div className="w-full lg:w-5/12 flex items-center justify-center p-4 lg:p-8 lg:min-h-screen shrink-0">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative w-full max-w-md p-10 bg-gray-900/60 backdrop-blur-xl border border-gray-800/50 rounded-[2rem] shadow-[0_0_40px_-10px_rgba(220,38,38,0.3)] overflow-hidden group"
            >
              {/* ... โค้ด Login Card เดิม ... */}
              <div className="absolute inset-0 rounded-[2rem] border-2 border-red-500/0 transition-all duration-700 group-hover:border-red-500/20 pointer-events-none"></div>
              <div className="text-center mb-10">
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block p-4 rounded-full bg-gradient-to-br from-red-500/20 to-red-900/20 text-red-500 mb-4 shadow-lg shadow-red-500/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </motion.div>
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-gray-300 tracking-wider drop-shadow-sm">
                  CINEMA LOGIN
                </h2>
                <p className="text-gray-400 text-sm mt-3 tracking-wide font-light">ดำดิ่งสู่โลกแห่งภาพยนตร์ที่ไร้ขีดจำกัด</p>
              </div>
              <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="relative">
                      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses} placeholder="name@example.com" required />
                      <label htmlFor="email" className={labelClasses}>อีเมล / Email</label>
                  </div>
                  <div className="relative">
                      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClasses} placeholder="••••••••" required />
                      <label htmlFor="password" className={labelClasses}>รหัสผ่าน / Password</label>
                      <div className="flex justify-end mt-2"><a href="#" className="text-xs text-red-400 hover:text-red-300 transition-colors duration-200 underline-offset-4 hover:underline">ลืมรหัสผ่าน?</a></div>
                  </div>
                  <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -10px rgba(220, 38, 38, 0.6)" }} whileTap={{ scale: 0.97 }} className={`w-full py-4 px-4 bg-gradient-to-r from-red-600 via-red-700 to-red-900 hover:from-red-500 hover:to-red-800 text-white font-bold text-lg rounded-xl shadow-lg shadow-red-600/30 transition-all duration-300 relative overflow-hidden flex items-center justify-center ${isLoading ? 'cursor-not-allowed opacity-80' : ''}`}>
                    {isLoading ? (<svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>) : (<span className="relative z-10 tracking-wider">เข้าสู่ระบบ</span>)}<div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-500 group-hover:scale-100 group-hover:bg-white/10"></div>
                  </motion.button>
              </form>
              <p className="mt-10 text-center text-sm text-gray-500">ยังไม่มีบัญชีสมาชิก? <a href="#" className="font-medium text-red-500 hover:text-red-400 transition-colors duration-200 ml-1 underline-offset-4 hover:underline">สมัครสมาชิกเลย</a></p>
            </motion.div>
        </div>


        {/* ========= ส่วนขวา: Movie Grid Section (ใหม่) ========= */}
        {/* กว้างเต็มบนมือถือ, กว้าง 7/12 (ประมาณ 59%) บนจอใหญ่ */}
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
           className="w-full lg:w-7/12 p-6 lg:p-12 flex flex-col justify-center"
        >
           <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-red-600 pl-3">
             โปรแกรมหน้า / NOW SHOWING
           </h3>
           
           {/* Grid Container: 2 คอลัมน์บนมือถือ, 3 คอลัมน์บนจอ Tablet ขึ้นไป */}
           <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
             {movies.map((movie, index) => (
               // Movie Card Item
               <motion.div 
                 key={movie.id}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: 0.5 + (index * 0.1) }} // ยิง Animation ทีละอัน (Stagger)
                 whileHover={{ y: -10, scale: 1.05 }}
                 className="group relative cursor-pointer"
               >
                 {/* กรอบรูปภาพ */}
                 <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-lg mb-3 relative">
                   <img 
                     src={movie.src} 
                     alt={movie.title} 
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-75"
                     loading="lazy"
                   />
                    {/* ปุ่มจองเมื่อ Hover */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                       จองตั๋ว
                     </span>
                   </div>
                 </div>
                 
                 {/* ข้อมูลหนัง */}
                 <h4 className="text-white font-semibold text-base line-clamp-1 group-hover:text-red-400 transition-colors">
                   {movie.title}
                 </h4>
                 <p className="text-gray-400 text-xs mt-1">
                   {movie.date}
                 </p>
               </motion.div>
             ))}
           </div>
        </motion.div>

      </div>
    </div>
  );
}

export default App;