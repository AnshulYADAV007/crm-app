import React, { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
const Login = () => {
    const [showSignup, setShowSignup] = useState(false)
    const [userSignupData, setUserSignupData] = useState({})
    const [userType, setUserType] = useState("CUSTOMER")

    const handleSelect = (e) => {
        setUserType(e)
    }

    const signupFn = (e) => {
        console.log(e)
    }

    const loginFn = (e) => {
        console.log(e)
    }

    const updateSignupData = (e) => {
        userSignupData[e.target.id] = e.target.value;
    }

    const toggleSignup = () => {
        setShowSignup(!showSignup)
        if (showSignup) {
            setUserSignupData({})
        }
    }

    return (
        <div id='loginPage'>

            {/* Login Content */}
            <div id='loginContent' className='bg-primary d-flex justify-content-center align-items-center vh-100'>
                <div className="card m-5 p-5">
                    <div className='row m-2'>
                        <h4 className='text-center'>{showSignup ? 'Sign Up' : 'Login'}</h4>
                        <form onSubmit={showSignup ? signupFn : loginFn}>
                            <input type='text' className='form-control my-2' placeholder='User Id' id='userId' onChange={updateSignupData} autoFocus required></input>
                            <input type='password' className='form-control my-2' placeholder="Password" id="password" onChange={updateSignupData} required ></input>
                            {showSignup && <div>
                                <input type='text' className='form-control my-2' placeholder='Username' id='username' onChange={updateSignupData} required></input>
                                <input type='text' className='form-control my-2' placeholder='Email' id='email' onChange={updateSignupData} required></input>
                                <div className="row">
                                    <div className="col">
                                        <span className="mx-1 my-1"> User Type</span>
                                    </div>
                                    <div className="col">
                                        <DropdownButton
                                            align="end"
                                            title={userType}
                                            id="userType"
                                            onSelect={handleSelect}
                                            variant="light"
                                        >
                                            <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                                            <Dropdown.Item eventKey="CLIENT">CLIENT</Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                </div>
                            </div>}
                            <div>Submit</div>
                            <div className="signup-btn text-center" onClick={toggleSignup}>{showSignup ? 'Already have an Account ? Login' : "Don't have an Account? Signup"}</div>
                            <div>Message</div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={{
                position: "fixed",
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor: "white"
            }}>
                <footer className="page-footer">
                    <div className="text-center py-3">© 2022 Copyright:
                        <a href="https://relevel.com">Relevel by Unacademy</a>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Login