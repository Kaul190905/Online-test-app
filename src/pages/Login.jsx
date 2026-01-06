import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const Login = ({ isDark, onThemeToggle, onLogin }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Demo credentials
    const DEMO_CREDENTIALS = { id: 'STU2025001', password: 'student123' };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate login delay
        setTimeout(() => {
            if (formData.id === DEMO_CREDENTIALS.id && formData.password === DEMO_CREDENTIALS.password) {
                onLogin('student');
                navigate('/');
            } else {
                setError('Invalid credentials. Please try again.');
            }
            setIsLoading(false);
        }, 800);
    };

    // Eye icons for password visibility toggle
    const EyeIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    );

    const EyeOffIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
    );

    return (
        <div className="login-page">
            {/* Decorative Background Elements */}
            <div className="login-bg-decoration">
                <div className="bg-blob blob-1"></div>
                <div className="bg-blob blob-2"></div>
                <div className="bg-blob blob-3"></div>
                <div className="bg-blob blob-4"></div>
            </div>

            <div className="login-container">
                {/* Theme Toggle */}
                <div className="login-theme-toggle">
                    <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
                </div>

                {/* Logo/Title */}
                <div className="login-header">
                    <img src="/logo.png" alt="Gradeflow" className="login-logo-img" />
                    <p>Sign in to continue</p>
                </div>

                {/* Student Login Title */}
                <div className="login-title">
                    <h2>Student Login</h2>
                </div>

                {/* Login Form */}
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="id">Roll Number</label>
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={formData.id}
                            onChange={handleInputChange}
                            placeholder="e.g. STU2025001"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn-login"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="login-spinner"></span>
                        ) : (
                            'Sign in'
                        )}
                    </button>
                </form>

                {/* Demo Credentials */}
                <div className="demo-credentials">
                    <p>Demo Credentials:</p>
                    <span>ID: <code>STU2025001</code> | Password: <code>student123</code></span>
                </div>
            </div>
        </div>
    );
};

export default Login;
