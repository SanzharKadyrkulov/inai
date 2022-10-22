/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useActions from '../../hooks/useActions.js';
import './Sign.css';
import { useSelector } from 'react-redux';

export default function SignUp() {
	const navigate = useNavigate();

	const { registerUser } = useActions();
	const { loading, userInfo } = useSelector((state) => state.user);
	const [newUser, setNewUser] = useState({ password2: '' });
	const [error, setError] = useState(false);
	const handleChange = (e) => {
		let newObj = {
			...newUser,
		};
		newObj[e.target.name] = e.target.value;
		setNewUser(newObj);
	};
	useEffect(() => {
		if (newUser.password2 && newUser.password2 !== newUser.password) {
			setError(true);
		} else {
			setError(false);
		}
	}, [newUser.password2]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const obj = {
			...newUser,
		};
		registerUser(obj, navigate);
	};

	useEffect(() => {
		if (userInfo) navigate(-2);
	}, [userInfo]);
	return (
		<>
			<section className='login'>
				<div className='loginContainer'>
					<label className='mainLabel'> Registration</label>
					<form onSubmit={(e) => handleSubmit(e)}>
						<label className='authLabel'>Электронная почта</label>
						<input
							className='authInput'
							type='text'
							autoFocus
							// pattern=.*\S.*
							required='Пожалуйста запоните все поля'
							name='email'
							onChange={(e) => {
								handleChange(e);
							}}
						/>
						<label className='authLabel'>Имя</label>
						<input
							className='authInput'
							type='text'
							autoFocus
							required='Пожалуйста запоните все поля'
							name='firstName'
							onChange={(e) => {
								handleChange(e);
							}}
						/>
						<label className='authLabel'>Фамилия</label>
						<input
							className='authInput'
							type='text'
							autoFocus
							required
							name='lastName'
							onChange={(e) => {
								handleChange(e);
							}}
						/>
						<label className='authLabel'>Содайте пароль(мин 6 символов)</label>
						<input
							className='authInput'
							type='password'
							required
							name='password'
							onChange={(e) => handleChange(e)}
						/>
						<label className='authLabel'>Введите пароль повторно</label>
						{error && <div className='errorMsg'>Пароли не совпадают</div>}
						<input
							className='authInput'
							type='password'
							required
							name='password2'
							onChange={(e) => handleChange(e)}
						/>

						<div className='btnContainer'>
							<button className='authButton' type='submit'>
								{!loading ? 'Sign up' : 'Loading'}
							</button>
							<p className='authP'>
								Already have an account ?
								<span className='authSpan' onClick={() => navigate('/signin')}>
									Sign in
								</span>
							</p>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}
