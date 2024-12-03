import React, { useState } from 'react';
import './PhoneAuth.css';

const PhoneAuth = ({ onLogin }) => {
  const [phone, setPhone] = useState('+998');
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode] = useState('12345'); // Hardcoded verification code
  const [error, setError] = useState('');

  const handleSendCode = () => {
    if (phone.length === 13 && phone.startsWith('+998')) {
      alert(`Tasdiqlash kodi yuborildi: ${sentCode}`);
      setError('');
      setStep(2);
    } else {
      setError('Telefon raqami noto‘g‘ri kiritilgan.');
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode === sentCode) {
      alert('Tasdiqlash muvaffaqiyatli o‘tdi!');
      onLogin(phone);
    } else {
      setError('Tasdiqlash kodi noto‘g‘ri!');
    }
  };

  return (
    <div className="auth-container">
      {step === 1 && (
        <div className="step-1">
          <h2>Telefon raqamini kiriting</h2>
          <input
            type="text"
            className="phone-input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button className="send-code-btn" onClick={handleSendCode}>
            Kodni oling
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="step-2">
          <h2>Tasdiqlash kodi</h2>
          <input
            type="text"
            maxLength="5"
            className="code-input"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button className="verify-code-btn" onClick={handleVerifyCode}>
            Davom etish
          </button>
        </div>
      )}
    </div>
  );
};

export default PhoneAuth;
