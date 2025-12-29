import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';

// Component หน้า Home (คนล็อกอินแล้วถึงจะเห็น)
const Home = () => {
  const { logout } = useAuth();
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>ยินดีต้อนรับสู่ระบบจองตั๋วหนัง! 🎬</h1>
      <p>คุณล็อกอินสำเร็จแล้ว (User View)</p>
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;