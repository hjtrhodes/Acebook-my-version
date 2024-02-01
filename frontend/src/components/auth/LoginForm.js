import React, { useState } from 'react';
import Acebook from '../../assets/Acebook.png';
import baseUrl from '../../util/baseUrl';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const urlTo = (path) => {
    navigate(path);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch( `${baseUrl}/tokens`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    });
    if (response.status === 201) {
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      navigate('/posts');
    } else {
      navigate('/login');
    }
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
  <>
    <div className='container flex flex-col md:flex-row md:ml-20 justify-center items-center min-h-screen bg-transparent transition-all'>
      <img className='p-20 bg-transparent border-0 md:w-1/2' src={Acebook} alt="logo" />
      <form onSubmit={handleSubmit} className='text-center flex flex-col bg-white p-8 rounded-lg shadow-lg w-96 h-auto'>
        <input placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} className='mb-4 px-4 py-2 rounded border border-gray-300' />
        <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} className='mb-4 px-4 py-2 rounded border border-gray-300' />
        <input className='submit bg-blue-500 text-white px-4 py-2 rounded font-bold w-full transition duration-300 hover:bg-blue-700' role='submit-button' id='submit' type="submit" value="Login" />
          <div className="grey-line border-t border-gray-300 my-4">
          </div>
          <div className="flex justify-center">
            <button className='signup-button bg-green-500 text-white px-4 py-2 rounded font-bold w-30 transition duration-300 hover:bg-green-700' data-cy="submit-button" onClick={() => urlTo('/signup')}>Create new account</button>
          </div>
      </form>
    </div>
  </>
  );
}

export default LogInForm;
