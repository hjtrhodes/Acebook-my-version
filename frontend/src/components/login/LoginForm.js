import { useState } from 'react';
import Acebook from '../../assets/Acebook.png';
import baseUrl from '../../util/baseUrl';

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showTestUserMessage, setShowTestUserMessage] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const toggleLoginMessage = () => {
    setShowLoginMessage(!showLoginMessage);
    setEmailError("");
  };
  
  const toggleTestUserMessage = () => {
    setShowTestUserMessage(!showTestUserMessage);
    setEmailError(""); // Resetting email error state
  };

  const urlTo = (path) => {
    navigate(path);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Input validation
    if (!email.includes("@")) {
      setEmailError("Email must contain @ symbol");
      return;
    } else {
      setEmailError("");
    }

    if (email === "" || password === "") {
      setPasswordError("Email or Password field cannot be empty");
      return;
    } else {
      setPasswordError("");
    }

    // Proceed with the login request
    let response = await fetch(`${baseUrl}/tokens`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    });

    if (response.status === 201) {
      let data = await response.json();
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("userId", data.userId);
      window.localStorage.setItem("firstName", data.firstName)
      window.localStorage.setItem("lastName", data.lastName)
      navigate('/posts');
    } else {
      let data = await response.json();
      setEmailError(data.emailerror)
      setPasswordError(data.passworderror)
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
    <div className='container flex flex-col md:flex-row md:ml-20 justify-center items-center min-h-screen bg-transparent transition-all pb-20 md:pb-0'>
      <img className='p-20 bg-transparent border-0 md:w-1/2' src={Acebook} alt="logo" />
      <div className='bg-white p-5 rounded-lg shadow text-center'>
      <form onSubmit={handleSubmit} className='text-center flex flex-col w-96 h-auto md:w-80'>
          <input placeholder='Email' id="email" type='text' value={email} onChange={handleEmailChange} className='mb-1 px-4 py-2 rounded border border-gray-300' />
          {emailError && <p className="text-red-500 text-xs p-1">{emailError}</p>}

          <input placeholder='Password' id="password" type='password' value={password} onChange={handlePasswordChange} className='mb-1 px-4 py-2 rounded border border-gray-300' />
          {passwordError && <p className="text-red-500 text-xs p-1">{passwordError}</p>}

          
          <input className='submit bg-blue-500 text-white px-4 py-2 rounded font-bold w-full transition duration-300 hover:bg-blue-700 cursor-pointer' role='submit-button' id='submit' type="submit" value="Log in" />
          
          <div className="grey-line border-t border-gray-300 my-4"></div>
          
          <div className="flex justify-center">
            <button className='signup-button bg-green-500 text-white px-4 py-2 rounded font-bold w-30 mb-2 transition duration-300 hover:bg-green-700' data-cy="submit-button" onClick={() => urlTo('/signup')}>Create new account</button>
          </div>
          </form>
      
          <div className="grey-line border-t border-gray-300 my-2"></div>

          

      <div className="flex justify-center mt-1">
              <button className="show-message-button bg-red-300 text-white px-4 py-2 text-sm rounded transition duration-300 hover:bg-red-400" onClick={toggleTestUserMessage}>
                Login with the Test User? - Click here
              </button>
            </div>

      {showTestUserMessage &&  (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 p-8 w-full md:w-1/2 text-gray-600">
                <p className='testusermessage'>
                                      If you would prefer to login with the Test User account rather than sign up, details are below:
                                  </p>
                                  <p className='testusermessage'>
                                      Email: <strong>test@test.com</strong>
                                  </p>
                                  <p className='testusermessage'>
                                      Password: <strong>Test1234!</strong>
                                  </p>
                  <button className="close-message-button bg-red-300 mt-3 text-white px-4 py-2 text-sm rounded transition duration-300 hover:bg-red-400" onClick={toggleTestUserMessage}>
                    Close
                  </button>
                </div>
              </div>
            )}

      <div className="flex justify-center mt-2">
        <button className="show-message-button bg-red-300 text-white px-4 py-2 text-sm rounded transition duration-300 hover:bg-red-400" onClick={toggleLoginMessage}>
          Login not working? - Click here
        </button>
      </div>

      {showLoginMessage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 p-8 w-full md:w-1/2 text-gray-600">
          <p className='rendermessage'>
                                This website is deployed as a free web service on Render.com
                            </p>
                            <p className='rendermessage'>
                                These web services spin down with inactivity. If you have clicked the Log in button and nothing has happened, you may have to wait a few minutes for the backend server to wake up then try again. Sorry about that, but why not take a well-earned break, go grab a cup of
                                tea and come back?
                            </p>
            <button className="close-message-button bg-red-300 mt-3 text-white px-4 py-2 text-sm rounded transition duration-300 hover:bg-red-400" onClick={toggleLoginMessage}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  </>
  );
}

export default LogInForm;
