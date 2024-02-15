import { useState } from 'react';
import Acebook from '../../assets/Acebook.png';
import baseUrl from '../../util/baseUrl';


const SignUpForm = ({ navigate }) => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState("");

  const toggleMessage = () => {
    setShowMessage(!showMessage);
  };

  const urlTo = (path) => {
    navigate(path);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send signup request
    try {
      const response = await fetch(`${baseUrl}/users`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.status === 201) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  
  
  return (
    <div className='container flex flex-col md:flex-row md:ml-20 justify-center items-center min-h-screen transition-all pb-20 md:pb-0'>
      <img className='p-20 bg-transparent border-0 md:w-1/2' src={Acebook} alt="logo" />
      <div className='bg-white p-5 rounded-lg shadow text-center'>
      <form onSubmit={handleSubmit} className='text-center flex flex-col w-96 h-auto md:w-80'>
        <input placeholder='First Name' id="firstName" type='text' value={ firstName } onChange={handleFirstNameChange} className='mb-4 px-4 py-2 rounded border border-gray-300' />
        <input placeholder='Last Name' id="lastName" type='text' value={ lastName } onChange={handleLastNameChange} className='mb-4 px-4 py-2 rounded border border-gray-300' />
        <input placeholder='Email Address' id="email" type='text' value={ email } onChange={handleEmailChange} className='mb-4 px-4 py-2 rounded border border-gray-300' />
        <input placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} className='mb-4 px-4 py-2 rounded border border-gray-300' />
        {error && <p className="text-red-500 text-xs pb-4">{error}</p>}
        <input className='submit bg-blue-500 text-white px-4 py-2 rounded font-bold w-full transition duration-300 hover:bg-blue-700 cursor-pointer' id='sign-up-button' type="submit" value="Sign Up" />
        <div className="grey-line border-t border-gray-300 my-4"></div>
        <div className="flex justify-center">
        <button className='gotologin-button bg-green-500 text-white px-4 py-2 rounded font-bold transition duration-300 w-1/2 hover:bg-green-700' data-cy="submit-button" onClick={() => urlTo('/login')}>Go to Login</button>
        </div>
      </form>

      <div className="grey-line border-t border-gray-300 my-4"></div>
        <div className="flex justify-center mt-4">
        <button className="show-message-button bg-red-300 text-white px-4 py-2 text-sm rounded transition duration-300 hover:bg-red-400" onClick={toggleMessage}>
          Signup not working? - Click here
        </button>
      </div>

        {showMessage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 p-8 w-full md:w-1/2 text-gray-600">
          <p className='rendermessage'>
                                This website is deployed as a free web service on Render.com
                            </p>
                            <p className='rendermessage'>
                                These web services spin down with inactivity. If you have clicked the Sign Up button and nothing has happened, you may have to wait a few minutes for the backend server to wake up then try again. Sorry about that, but why not take a well-earned break, go grab a cup of
                                tea and come back?
                            </p>
            <button className="close-message-button bg-red-300 mt-3 text-white px-4 py-2 text-sm rounded transition duration-300 hover:bg-red-400" onClick={toggleMessage}>
              Close
            </button>
          </div>
        </div>
      )}

      </div>
  </div>
  );
  
}

export default SignUpForm;
