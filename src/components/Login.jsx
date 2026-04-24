import React, { useState } from 'react';
import logo from '../assets/images/DT_Logo.png';
import './Login.css';

function Login({ onSignUp }) {
  const [formData, setFormData] = useState({
    dtNumber: 'DT-',
    password: '',
    role: ''
  });
  const [focused, setFocused] = useState({
    dtNumber: false,
    password: false,
    role: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [dtNumberError, setDtNumberError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'dtNumber') {
      // Auto-format to uppercase and enforce DT- prefix
      let formattedValue = value.toUpperCase();
      
      if (!formattedValue.startsWith('DT-')) {
        formattedValue = 'DT-' + formattedValue;
      }
      
      const suffix = formattedValue.substring(3);
      if (suffix.length > 5) {
        formattedValue = 'DT-' + suffix.substring(0, 5);
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
      
      // Clear DT Number error when user types
      if (dtNumberError) setDtNumberError('');
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    if (error) setError('');
  };

  const handleFocus = (field) => {
    setFocused(prev => ({ ...prev, [field]: true }));
    if (field === 'dtNumber' && dtNumberError) setDtNumberError('');
  };

  const handleBlur = (field) => {
    setFocused(prev => ({ ...prev, [field]: false }));
    
    if (field === 'dtNumber' && formData.dtNumber && formData.dtNumber !== 'DT-') {
      const dtNumberPattern = /^DT-\d{5}$/;
      if (!dtNumberPattern.test(formData.dtNumber)) {
        setDtNumberError('Invalid DT Number format');
      } else {
        setDtNumberError('');
      }
    } else if (field === 'dtNumber') {
      setDtNumberError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dtNumberPattern = /^DT-\d{5}$/;
    if (!formData.dtNumber || !dtNumberPattern.test(formData.dtNumber)) {
      setDtNumberError('Invalid DT Number format');
      return;
    }
    
    if (!formData.password) {
      setError('Please enter your password');
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      console.log('Login attempt:', { 
        dtNumber: formData.dtNumber, 
        password: formData.password, 
        role: formData.role,
        rememberMe 
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <img src={logo} alt="DT Logo" className="login-logo" />
            <h1>Welcome Back</h1>
            <p className="subtitle">Sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={`input-group ${focused.dtNumber || formData.dtNumber ? 'filled' : ''} ${dtNumberError ? 'error' : ''}`}>
              <input
                type="text"
                name="dtNumber"
                value={formData.dtNumber}
                onChange={handleChange}
                onFocus={() => handleFocus('dtNumber')}
                onBlur={() => handleBlur('dtNumber')}
                required
              />
              <label>DT Number</label>
              <div className="input-border"></div>
              {dtNumberError && <div className="field-error">{dtNumberError}</div>}
            </div>

            <div className={`input-group ${focused.password || formData.password ? 'filled' : ''}`}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                required
              />
              <label>Password</label>
              <div className="input-border"></div>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            <div className={`input-group select-group ${focused.role || formData.role ? 'filled' : ''}`}>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                onFocus={() => handleFocus('role')}
                onBlur={() => handleBlur('role')}
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Production">Production</option>
                <option value="Travelshoot">Travelshoot</option>
              </select>
              <label>Role</label>
              <div className="input-border"></div>
              <div className="select-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-options">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="material-loader"></div>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="signup-prompt">
              Don't have an account? <button type="button" className="link-button" onClick={onSignUp}>Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;