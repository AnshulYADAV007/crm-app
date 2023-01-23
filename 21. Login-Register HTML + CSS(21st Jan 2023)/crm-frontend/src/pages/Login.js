import React, { useState } from "react"
import { Dropdown, DropdownButton } from "react-bootstrap"
import axios from 'axios'

const BASE_URL = process.env.REACT_APP_SERVER_URL

function Login() {
    const [showSignup, setShowSignup] = useState(false)
    const [message, setMessage] = useState("")
    const [userType, setValue] = useState("CUSTOMER")

    const handleSelect = (e) => {
        setValue(e)
    }

    const toggleSignup = () => {
        setShowSignup(!showSignup)
    }

    const signUpContent = () => {
        return (
            <div>
                <h4 className="text-center">Signup</h4>
                <form onSubmit={signupFn}>
                    <div>
                        <input type="text" className="form-control" placeholder="User Id" id="userId" required />
                    </div>

                    <div>
                        <input type="text" className="form-control" placeholder="Username" id="username" required />
                    </div>
                    <input type="text" className="form-control" placeholder="Email" id="email" required />
                    <div className="input-group">
                        <input type="password" className="form-control" placeholder="Password" id="password" required />
                    </div>

                    <div className="input-group m-1">
                        <span className="text-muted my-2 mx-2"> User Type</span>
                        <DropdownButton
                            align="end"
                            title={userType}
                            id="userType"
                            onSelect={handleSelect}
                            variant="light"
                            className="mx-1"
                        >
                            <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                            <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
                        </DropdownButton>
                    </div>

                    <div className="input-group m-1">
                        <input type="submit" className="form-control btn btn-primary m-1" value="Sign up" />
                    </div>
                    <div className="signup-btn text-center text-info" onClick={toggleSignup}>Already have an Account ? Login</div>
                    <div className="auth-error-msg text-danger text-center">{message}</div>
                </form>
            </div>
        )
    }

    const loginFn = (e) => {
        const data = {
            "userId": "admin",
            "password": "Welcome1"
        }
        e.preventDefault()
        axios.post('http://127.0.0.1:7500/crm/api/auth/signin', data)
            .then(response => {
                console.log(response.data)
            })
            .catch(console.log)
    }

    const signupFn = (e) => {

    }

    const loginContent = () => {
        return (
            <div >
                <h4 className="text-center">Login</h4>
                <form onSubmit={loginFn}>
                    <div className="input-group m-1">
                        <input type="text" className="form-control" placeholder="User Id" id="userId" required />
                    </div>
                    <div className="input-group m-1">
                        <input type="password" className="form-control" placeholder="Password" id="password" required />
                    </div>

                    <div className="input-group m-1">
                        <input type="submit" className="form-control btn btn-primary" value="Log in" />
                    </div>
                    <div className="signup-btn text-right text-info" onClick={toggleSignup}>Dont have an Account ? Signup</div>
                    <div className="auth-error-msg text-danger text-center">{message}</div>
                </form>
            </div>
        )
    }

    return (
        <div id="loginPage">
            <div id="loginPage" className="bg-primary d-flex justify-content-center align-items-center vh-100">
                <div className="card m-5 p-5">
                    <div className="row m-2">
                        <div className="col">
                            {
                                showSignup
                                    ? signUpContent()
                                    : loginContent()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;