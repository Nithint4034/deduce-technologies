import React, { useState, useEffect } from 'react';
import './Registration.css';

function Registration({ onSignIn }) {
  const [formData, setFormData] = useState({
    dtNumber: '',
    email: '',
    userName: '',
    role: '',
    password: '',
    confirmPassword: ''
  });
  
  const [focused, setFocused] = useState({
    dtNumber: false,
    email: false,
    userName: false,
    role: false,
    password: false,
    confirmPassword: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    dtNumber: '',
    email: '',
    userName: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  // Clear any autofilled values on component mount
  useEffect(() => {
    setFormData({
      dtNumber: '',
      email: '',
      userName: '',
      role: '',
      password: '',
      confirmPassword: ''
    });
    setFocused({
      dtNumber: false,
      email: false,
      userName: false,
      role: false,
      password: false,
      confirmPassword: false
    });
  }, []);

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
      
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
      if (fieldErrors.dtNumber) setFieldErrors(prev => ({ ...prev, dtNumber: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (error) setError('');
    
    // Real-time password match validation
    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'password' && formData.confirmPassword && value !== formData.confirmPassword) {
        setFieldErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else if (name === 'confirmPassword' && formData.password && value !== formData.password) {
        setFieldErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else if (formData.password && formData.confirmPassword && formData.password === formData.confirmPassword) {
        setFieldErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  const handleFocus = (field) => {
    setFocused(prev => ({ ...prev, [field]: true }));
    if (fieldErrors[field]) setFieldErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleBlur = (field) => {
    setFocused(prev => ({ ...prev, [field]: false }));
    validateField(field);
  };

  const validateField = (field) => {
    let errorMessage = '';
    
    switch(field) {
      case 'dtNumber':
        const dtNumberPattern = /^DT-\d{5}$/;
        if (!formData.dtNumber) {
          errorMessage = 'DT Number is required';
        } else if (!dtNumberPattern.test(formData.dtNumber)) {
          errorMessage = 'Invalid DT Number format';
        }
        break;
        
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
          errorMessage = 'Email is required';
        } else if (!emailPattern.test(formData.email)) {
          errorMessage = 'Invalid email format';
        } else if (!formData.email.endsWith('@deduce.com') && !formData.email.endsWith('@deduce.in')) {
          errorMessage = 'Must use Deduce email (@deduce.com or @deduce.in)';
        }
        break;
        
      case 'userName':
        if (!formData.userName) {
          errorMessage = 'User Name is required';
        } else if (formData.userName.length < 3) {
          errorMessage = 'User Name must be at least 3 characters';
        } else if (formData.userName.length > 30) {
          errorMessage = 'User Name must be less than 30 characters';
        }
        break;
        
      case 'role':
        if (!formData.role) {
          errorMessage = 'Please select a role';
        }
        break;
        
      case 'password':
        if (!formData.password) {
          errorMessage = 'Password is required';
        } else if (formData.password.length < 6) {
          errorMessage = 'Password must be at least 6 characters';
        } else if (!/(?=.*[A-Z])/.test(formData.password)) {
          errorMessage = 'Password must contain at least one uppercase letter';
        } else if (!/(?=.*[0-9])/.test(formData.password)) {
          errorMessage = 'Password must contain at least one number';
        }
        break;
        
      case 'confirmPassword':
        if (!formData.confirmPassword) {
          errorMessage = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
          errorMessage = 'Passwords do not match';
        }
        break;
        
      default:
        break;
    }
    
    setFieldErrors(prev => ({ ...prev, [field]: errorMessage }));
    return errorMessage === '';
  };

  const validateForm = () => {
    const fields = ['dtNumber', 'email', 'userName', 'role', 'password', 'confirmPassword'];
    let isValid = true;
    
    fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError('Please fix the errors before submitting');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Registration attempt:', {
        dtNumber: formData.dtNumber,
        email: formData.email,
        userName: formData.userName,
        role: formData.role,
        password: formData.password
      });
      setIsLoading(false);
      // Show success message or redirect
      alert('Registration successful!');
    }, 1500);
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <div className="registration-card">
          <div className="registration-header">
            <h1>Create Account</h1>
            <p className="subtitle">Register to get started</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* DT Number Field */}
            <div className={`input-group ${focused.dtNumber || formData.dtNumber ? 'filled' : ''} ${fieldErrors.dtNumber ? 'error' : ''}`}>
              <input
                type="text"
                name="dtNumber"
                value={formData.dtNumber}
                onChange={handleChange}
                onFocus={() => handleFocus('dtNumber')}
                onBlur={() => handleBlur('dtNumber')}
                autoComplete="off"
              />
              <label>DT Number</label>
              <div className="input-border"></div>
              {fieldErrors.dtNumber && <div className="field-error">{fieldErrors.dtNumber}</div>}
            </div>

            {/* Email Field */}
            <div className={`input-group ${focused.email || formData.email ? 'filled' : ''} ${fieldErrors.email ? 'error' : ''}`}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                autoComplete="off"
              />
              <label>Deduce Mail ID</label>
              <div className="input-border"></div>
              {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}
            </div>

            {/* User Name Field */}
            <div className={`input-group ${focused.userName || formData.userName ? 'filled' : ''} ${fieldErrors.userName ? 'error' : ''}`}>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                onFocus={() => handleFocus('userName')}
                onBlur={() => handleBlur('userName')}
                autoComplete="off"
              />
              <label>User Name</label>
              <div className="input-border"></div>
              {fieldErrors.userName && <div className="field-error">{fieldErrors.userName}</div>}
            </div>

            {/* Role Field */}
            <div className={`input-group select-group ${focused.role || formData.role ? 'filled' : ''} ${fieldErrors.role ? 'error' : ''}`}>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                onFocus={() => handleFocus('role')}
                onBlur={() => handleBlur('role')}
              >
                <option value="" disabled>Select a role</option>
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
              {fieldErrors.role && <div className="field-error">{fieldErrors.role}</div>}
            </div>

            {/* Password Field */}
            <div className={`input-group ${focused.password || formData.password ? 'filled' : ''} ${fieldErrors.password ? 'error' : ''}`}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                autoComplete="off"
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
              {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}
            </div>

            {/* Confirm Password Field */}
            <div className={`input-group ${focused.confirmPassword || formData.confirmPassword ? 'filled' : ''} ${fieldErrors.confirmPassword ? 'error' : ''}`}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onFocus={() => handleFocus('confirmPassword')}
                onBlur={() => handleBlur('confirmPassword')}
                autoComplete="off"
              />
              <label>Confirm Password</label>
              <div className="input-border"></div>
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex="-1"
              >
                {showConfirmPassword ? (
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
              {fieldErrors.confirmPassword && <div className="field-error">{fieldErrors.confirmPassword}</div>}
            </div>

            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              className="register-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="material-loader"></div>
              ) : (
                'Register'
              )}
            </button>

            <div className="login-prompt">
              Already have an account? <button type="button" className="link-button" onClick={onSignIn}>Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;