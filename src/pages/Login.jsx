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

    // Demo credentials
    const DEMO_CREDENTIALS = { id: 'STU2025001', password: 'student123' };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError('');
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
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            required
                        />
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
