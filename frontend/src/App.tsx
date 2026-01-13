import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import BookingPage from './Booking/BookingPage';
import HomePage from './pages/HomePage';

// ส่วนของหน้าสมาชิก (Member View) - ผมแยกออกมาเพื่อให้โค้ดอ่านง่ายขึ้น
const MemberHome = () => {
  const { logout } = useAuth();
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>
      <h1>ยินดีต้อนรับสมาชิก!</h1>
      <p>คุณล็อกอินสำเร็จแล้ว</p>
      <button 
        onClick={logout} 
        style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer', marginTop: '20px' }}
      >
        ออกจากระบบ (Logout)
      </button>
    </div>
  );
};

// ตัวกันประตู (Private Route)
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* --- โซนสาธารณะ (ใครก็เข้าได้) --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<BookingPage />} /> 

        {/* --- โซนสมาชิก (ต้องล็อกอิน) --- */}
        {/* 🚩 แก้ไข: เปลี่ยนจาก path="/" เป็น "/member" เพื่อไม่ให้ชนกับหน้าแรก */}
        <Route 
          path="/member" 
          element={
            <PrivateRoute>
              <MemberHome />
            </PrivateRoute>
          } 
        />
        
        {/* ถ้าล็อกอินแล้วแต่ยังเข้าหน้า /login ให้ดีดมาหน้าสมาชิก (Optional) */}
        {/* คุณสามารถเพิ่ม Logic นี้ทีหลังได้ */}

      </Routes>
    </AuthProvider>
  );
}

export default App;