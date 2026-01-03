import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import BookingPage from './Booking/BookingPage'; // 👈 แก้ Path ให้ถูกต้อง (เช็คว่าไฟล์ชื่อนี้อยู่ข้างๆ App.tsx ไหม)

// 1. สร้างหน้า Home กลับมาใหม่ (เพราะของเก่าหายไป)
const Home = () => {
  const { logout } = useAuth();
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>ยินดีต้อนรับสู่ระบบจองตั๋วหนัง! 🎬</h1>
      <p>คุณล็อกอินสำเร็จแล้ว (User View)</p>
      
      {/* ปุ่มกดไปหน้าจอง */}
      <Link to="/booking" style={{ display: 'inline-block', margin: '20px', padding: '10px 20px', backgroundColor: 'green', color: 'white', textDecoration: 'none', borderRadius: '5px', fontSize: '18px' }}>
        ไปจองตั๋วหนังกันเลย 🍿
      </Link>
      <br />
      <br />

      <button onClick={logout} style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
        ออกจากระบบ (Logout)
      </button>
    </div>
  );
};

// ตัวกั้นประตู: ถ้ายังไม่ Login ให้ดีดไปหน้า Login
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public View: เข้าได้ทุกคน */}
          <Route path="/login" element={<Login />} />

          {/* User View: ต้องล็อกอินก่อน */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          
          {/*Route หน้าจองตั๋ว */}
          <Route
            path="/booking"
            element={
              <PrivateRoute>
                <BookingPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;