import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  // สร้างตัวแปรเก็บข้อมูล
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); 

  // ฟังก์ชันกดปุ่ม Login (ทำงานตรงนี้แน่นอน)
  const handleLoginClick = () => {
    // 1. เช็คก่อนว่าปุ่มทำงานไหม
    alert("กำลังล็อกอิน... (Button Clicked!)");

    // 2. สั่งระบบล็อกอิน
    login(email);

    // 3. หน่วงเวลา 0.5 วิ แล้วเปลี่ยนหน้า
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="lock-icon">🔒</div>
        <div className="login-header">
          <h2>CINEMA LOGIN</h2>
          <p>เข้าสู่ระบบเพื่อจองตั๋วหนัง</p>
        </div>

        {/* ไม่ต้องใช้ <form> แล้ว ใช้ div ธรรมดาพอ */}
        <div>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="อีเมล / Email" 
              value={email}
              // อัปเดตค่าอีเมลทันทีที่พิมพ์
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <input 
              type="password" 
              placeholder="รหัสผ่าน / Password" 
              value={password}
              // อัปเดตค่ารหัสผ่านทันทีที่พิมพ์
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="actions">
            <a href="#" className="forgot-pass">ลืมรหัสผ่าน?</a>
          </div>

          {/* 🚩 ปุ่มกดแบบ Direct Click (type="button") */}
          <button 
            type="button" 
            className="login-btn"
            onClick={handleLoginClick} 
          >
            เข้าสู่ระบบ
          </button>
        </div>

        <div className="register-link">
          ยังไม่มีบัญชีสมาชิก? <span>สมัครสมาชิก</span>
        </div>
      </div>
    </div>
  );
};

export default Login;