import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Sign.css';
import useActions from '../../hooks/useActions.js';
import { useSelector } from 'react-redux';

export default function SignIn() {
	const [newUser, setNewUser] = useState({});
	const { loginUser } = useActions();
	const { loading, userInfo } = useSelector((state) => state.user);

	const navigate = useNavigate();
	const handleChange = (e) => {
		let newObj = {
			...newUser,
		};
		newObj[e.target.name] = e.target.value;
		setNewUser(newObj);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const obj = {
			...newUser,
		};
		loginUser(obj, navigate);
	};
	useEffect(() => {
		if (userInfo) navigate(-1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInfo]);

	return (
		<>
			<section className='login'>
				<div className='loginContainer shadow'>
					{/* <div className='goBack' onClick={() => navigate(-1)}>
						{' '}
						<img className='goBack-img' src={goBack} alt='goBack' />
					</div> */}
					<label className='mainLabel'> Login</label>
					<form onSubmit={(e) => handleSubmit(e)}>
						<label className='authLabel'>Email</label>
						<input
							className='authInput'
							type='text'
							autoFocus
							required
							placeholder='Email'
							name='username'
							onChange={(e) => {
								handleChange(e);
							}}
						/>
						<label className='authLabel'>Password</label>
						<input
							className='authInput'
							type='password'
							required
							placeholder='Password'
							name='password'
							onChange={(e) => handleChange(e)}
						/>
						<div className='btnContainer'>
							<button className='authButton' type='submit'>
								{!loading ? 'Sign in' : 'loading'}
							</button>
							<p className='authP'>
								Don't have an account ?
								<span className='authSpan' onClick={() => navigate('/signup')}>
									Sign up
								</span>
							</p>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}
