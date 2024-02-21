import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useState } from 'react';
import Api from '../../../tools/api';
import { AppContext } from '../../layout/Layout';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


export default function RegisterPage() {
    const navigate = useNavigate();

    // init app state
    const appContext = useContext(AppContext)

    // init local state
    const [state, setState] = useState({})
    const [cookie, setCookie] = useCookies('token')

    const callRegister = async () => {
        // check fields 
        if (
            (state.name == null || state.name.length == 0) ||
            (state.email == null || state.email.length == 0) ||
            (state.password == null || state.password.length == 0) ||
            (state.password_confirmation == null || state.password_confirmation.length == 0)
        ) {
            appContext.showPopup('Please Fill All the fields')
            return
        }
        // check password is same or not
        if (state.password != state.password_confirmation) {
            appContext.showPopup('Passowrds are not matched')
            return
        }
        // calling API
        const response = await Api.fetch({
            url: 'register',
            body: state,
            method: 'POST',
            showPopup: appContext.showPopup,
        })

        // check API Response        
        if (response != null) {
            // show message
            appContext.showPopup(response.message)

            // save token (appState - Cockies)
            if (response.token != null) {
                appContext.login(response.token, null)
                setCookie('token', response.token)

                // redirect to homepage
                window.location.href = '/'
            }
        }
    }

    return (
        <div className="border border-3 border-info rounded p-4 mt-3 bg-warning-subtle">
            <div className='d-flex justify-content-center'>
                <h1>Register Page</h1>
            </div>
            <Form>
                <Form.Group className="mb-3 d-flex justify-content-between align-items-baseline" controlId="formBasicName">
                    <Form.Label className="me-2 text-nowrap w-75">Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name"
                        onChange={(e) => {
                            setState({ ...state, name: e.target.value })
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3 d-flex justify-content-between align-items-baseline" controlId="formBasicEmail">
                    <Form.Label className="me-2 text-nowrap w-75">Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                        onChange={(e) => {
                            setState({ ...state, email: e.target.value })
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3 d-flex justify-content-between align-items-baseline" controlId="formBasicPassword">
                    <Form.Label className="me-2 text-nowrap w-75">Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                        onChange={(e) => {
                            setState({ ...state, password: e.target.value })
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3 d-flex justify-content-between align-items-baseline" controlId="formBasicPasswordConfirmation">
                    <Form.Label className="me-2 text-nowrap w-75">Password Confirmation</Form.Label>
                    <Form.Control type="password" placeholder="Password Confirmation"
                        onChange={(e) => {
                            setState({ ...state, password_confirmation: e.target.value })
                        }}
                    />
                </Form.Group>

                <Form.Group className="mb-3 d-flex justify-content-between align-items-baseline" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Agree to privacy policy" />
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button onClick={(e) => {
                        callRegister()
                        e.preventDefault()
                    }} variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    );
}

