import React, { useState, useContext, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import '../styles/Errors.css';
import '../styles/SignUpPage.css';
import { gsap, useGSAP } from '../lib/gsap.js';

export default function SignUpForm (){
    const { signUp } = useContext(AuthContext);
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [serverError, setServerError] = useState('');
    const formRef = useRef(null);

    const {register,
        handleSubmit,
        formState: {errors}} = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setServerError('');
        try {
            const createdUser = await signUp(data);

            if (location.state?.pendingCartItem) {
                addToCart(location.state.pendingCartItem, createdUser);
                navigate('/cart');
                return;
            }

            navigate(location.state?.from || '/');
        } catch (err) {
            setServerError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'all' } });

        tl.from('.loginCard', {
            y: 30,
            autoAlpha: 0,
            scale: 0.97,
            duration: 0.55,
        })
            .from('.loginTitle, .loginSubtitle, .error', {
                y: 18,
                autoAlpha: 0,
                stagger: 0.08,
                duration: 0.35,
            }, '-=0.2')
            .from('.inputBox', {
                y: 20,
                autoAlpha: 0,
                stagger: 0.06,
                duration: 0.32,
            }, '-=0.16')
            .from('.themeButton, .loginFooter', {
                y: 18,
                autoAlpha: 0,
                stagger: 0.08,
                duration: 0.28,
            }, '-=0.1');
    }, { scope: formRef, dependencies: [serverError] });

    return(
        <div className="loginWrapper" ref={formRef}>
            <div className="loginCard">
                <h1 className="loginTitle">Create Account</h1>
                <p className="loginSubtitle">Join our fashion community today.</p>

                {(serverError || location.state?.authMessage) && <p className="error">{serverError || location.state?.authMessage}</p>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="inputBox">
                        <input type="text" id="firstName" placeholder=" "
                        {...register("firstName" , {required: "First Name is required"})}
                        />
                        <label htmlFor="firstName">First Name</label>
                        {errors.firstName && <p className='error'>{errors.firstName.message}</p>
                        }
                    </div>

                    <div className="inputBox">
                        <input type="text" id="lastName" placeholder=" "
                        {...register("lastName" , {required: "Last Name is required"})}
                        />
                        <label htmlFor="lastName">Last Name</label>
                        {errors.lastName && <p className='error'>{errors.lastName.message}</p>
                        }
                    </div>
                    
                    <div className="inputBox">
                        <input type="email" id="email" placeholder=" "
                        {...register("email", {required: "Email is required"})}
                        />
                        <label htmlFor="email">Email Address</label>
                        {errors.email && <p className='error'>{errors.email.message}</p>
                        }
                    </div>

                    <div className="inputBox">
                        <input type="text" id="userName" placeholder=" "
                        {...register("userName", {required: "Username is required"})}
                        />
                        <label htmlFor="userName">Username</label>
                        {errors.userName && <p className='error'>{errors.userName.message}</p>
                        }
                    </div>

                    <div className="inputBox">
                        <input type="password" id="password" placeholder=" "
                        {...register("password", {required: "Password is required",
                            minLength: {value: 8, message: "Password must be at least 8 characters"}})}
                        />
                        <label htmlFor="password">Password</label>
                        {errors.password && <p className='error'>{errors.password.message}</p>
                        }
                    </div>

                    <button type="submit" className="themeButton" disabled={isSubmitting}>
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
