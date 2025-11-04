import { useState } from 'react';
import User from '../models/User';

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create a new User instance using our class
        const user = new User(formData.name, formData.email, formData.password);
        
        // Validate user data using our class method
        if (!user.isValid()) {
            setMessage('Please fill all fields correctly');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user.toDocument()),
            });

            if (response.ok) {
                setMessage('Registration successful!');
                setFormData({ name: '', email: '', password: '' });
            } else {
                setMessage('Registration failed. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <h1>Register</h1>
                {message && <p className={message.includes('successful') ? 'success' : 'error'}>{message}</p>}
                
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        minLength="3"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        minLength="6"
                        required
                    />
                </div>

                <button type="submit">Register</button>
            </form>

            <style jsx>{`
                .container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    background-color: #f5f5f5;
                }

                .form {
                    background: white;
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 400px;
                }

                h1 {
                    text-align: center;
                    color: #333;
                    margin-bottom: 2rem;
                }

                .form-group {
                    margin-bottom: 1rem;
                }

                label {
                    display: block;
                    margin-bottom: 0.5rem;
                    color: #666;
                }

                input {
                    width: 100%;
                    padding: 0.5rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 1rem;
                }

                button {
                    width: 100%;
                    padding: 0.75rem;
                    background-color: #0070f3;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 1rem;
                    cursor: pointer;
                    margin-top: 1rem;
                }

                button:hover {
                    background-color: #0051cc;
                }

                .success {
                    color: green;
                    text-align: center;
                }

                .error {
                    color: red;
                    text-align: center;
                }
            `}</style>
        </div>
    );
}