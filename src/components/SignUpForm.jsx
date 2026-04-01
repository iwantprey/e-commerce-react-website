import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Errors.css';
import '../styles/SignUpPage.css';

export default function SignUpForm (){
    const { signUp } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState('');

    const {register,
        handleSubmit,
        formState: {errors}} = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setServerError('');
        try {
            await signUp(data);
            // Redirect to login or home after successful signup
            navigate('/login');
        } catch (err) {
            setServerError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
        <div className="loginWrapper">
            <div className="loginCard">
                <h1 className="loginTitle">Create Account</h1>
                <p className="loginSubtitle">Join our fashion community today.</p>

                {serverError && <p className="error">{serverError}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="inputBox">
                        <input type="text" id="firstName" placeholder="First Name"
                        {...register("firstName" , {required: "First Name is required"})}
                        />
                        <label htmlFor="firstName">First Name</label>
                        {errors.firstName && <p className='error'>{errors.firstName.message}</p>
                        }
                    </div>

                    <div className="inputBox">
                        <input type="text" id="lastName" placeholder="Last Name"
                        {...register("lastName" , {required: "Last Name is required"})}
                        />
                        <label htmlFor="lastName">Last Name</label>
                        {errors.lastName && <p className='error'>{errors.lastName.message}</p>
                        }
                    </div>
                    
                    <div className="inputBox">
                        <input type="email" id="email" placeholder="Email"
                        {...register("email", {required: "Email is required"})}
                        />
                        <label htmlFor="email">Email Address</label>
                        {errors.email && <p className='error'>{errors.email.message}</p>
                        }
                    </div>

                    <div className="inputBox">
                            <input type="text" id="userName" placeholder="Username"
                                {...register("userName" , {required: " Username is required"}) }
                            />
                            <label htmlFor="userName">User Name</label>
                            {errors.userName && <p className='error'>{errors.userName.message}</p>
                            }
                    </div>

                    <div className="inputBox">
                            <input type="password" id="password" placeholder="Password"
                            {...register("password" , {required: "Password is required",
                            minLength:{
                                value: 8,
                                message: "Password must be at least 8 characters"
                            },
                            maxLength:{
                                value: 16,
                                message: "Password must be at most 16 characters"
                            }
                            })}
                            />
                            <label htmlFor="password">Password</label>
                            {errors.password && <p className='error'>{errors.password.message}</p>
                            }
                    </div>

                    <button className='themeButton' type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <div className="loginFooter">
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    );
}
