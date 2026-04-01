import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import '../styles/ProfilePage.css';
import '../styles/Errors.css';

const ProfilePage = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Local form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        profilePic: 'https://placehold.co/150x150/e9ecef/495057?text=User',
        address: '',
        city: '',
        zipCode: ''
    });

    // Sync local state with AuthContext user data
    useEffect(() => {
        if (user) {
            setFormData({
                ...formData,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                // Fields might not exist in mock DB yet, so we use defaults
                profilePic: user.profilePic || 'https://placehold.co/150x150/e9ecef/495057?text=User',
                address: user.address || '',
                city: user.city || '',
                zipCode: user.zipCode || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await updateUser(formData);
            setMessage('Profile updated successfully!');
            setIsEditing(false);
        } catch (err) {
            setMessage('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    if (!user.isAuth) {
        return <div className="homeContainer"><h1>Please log in to view your profile.</h1></div>;
    }

    return (
        <div className="profileWrapper">
            <div className="profileCard">
                <div className="profileHeader">
                    <div className="avatarContainer">
                        <img src={formData.profilePic} alt="Profile" className="profileAvatar" />
                        {isEditing && (
                            <input 
                                type="text" 
                                name="profilePic" 
                                placeholder="Paste Image URL" 
                                value={formData.profilePic}
                                onChange={handleChange}
                                className="avatarInput"
                            />
                        )}
                    </div>
                    <h1 className="loginTitle">{formData.firstName} {formData.lastName}</h1>
                    <p className="loginSubtitle">Manage your account settings and preferences</p>
                </div>

                {message && <p className={message.includes('success') ? 'successMsg' : 'error'}>{message}</p>}

                <form onSubmit={handleSubmit} className="profileForm">
                    <div className="formSection">
                        <h3>Personal Information</h3>
                        <div className="formGrid">
                            <div className="inputGroup">
                                <label>First Name</label>
                                <input name="firstName" value={formData.firstName} onChange={handleChange} disabled={!isEditing} />
                            </div>
                            <div className="inputGroup">
                                <label>Last Name</label>
                            </div>
                                <input name="lastName" value={formData.lastName} onChange={handleChange} disabled={!isEditing} />
                            <div className="inputGroup fullWidth">
                                <label>Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={!isEditing} />
                            </div>
                        </div>
                    </div>

                    <div className="formSection">
                        <h3>Shipping Address</h3>
                        <div className="formGrid">
                            <div className="inputGroup fullWidth">
                                <label>Street Address</label>
                                <input name="address" value={formData.address} onChange={handleChange} disabled={!isEditing} placeholder="123 Fashion St" />
                            </div>
                            <div className="inputGroup">
                                <label>City</label>
                                <input name="city" value={formData.city} onChange={handleChange} disabled={!isEditing} />
                            </div>
                            <div className="inputGroup">
                                <label>ZIP Code</label>
                                <input name="zipCode" value={formData.zipCode} onChange={handleChange} disabled={!isEditing} />
                            </div>
                        </div>
                    </div>

                    <div className="profileActions">
                        {!isEditing ? (
                            <button type="button" className="themeButton" onClick={() => setIsEditing(true)}>Edit Profile</button>
                        ) : (
                            <>
                                <button type="submit" className="themeButton" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
                                <button type="button" className="secondaryButton" onClick={() => setIsEditing(false)}>Cancel</button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;