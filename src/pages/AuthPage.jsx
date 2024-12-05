import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup
} from 'firebase/auth';
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../components/AuthProvider"



export default function AuthPage() {
    const loginImage = "https://sig1.co/img-twitter-1";

    //possible values: 1.null(no modal show) 2."Login" 3."SignUp"
    const [modalShow, setModalShow] = useState(null);
    const handleShowSignUp = () => setModalShow("SignUp");
    const handleShowLogin = () => setModalShow("Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (currentUser) navigate("/profile");
    }, [currentUser, navigate]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                username,
                password
            );
            console.log(res.user);
        } catch (error) {
            console.error(error);
        }
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, username, password);
        } catch (error) {
            console.error(error);
        }
    };

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
        }
    }

    const handleClose = () => setModalShow(null);

    return (
        <div>
            <div>
                <Row className="g-0">
                    <Col md={7} sm={8} xs={12}>
                        <Image
                            src={loginImage}
                            style={{ height: "800px", objectFit: "cover", width: "100%" }}
                            fluid />
                    </Col>
                    <Col md={5} sm={4} xs={12}>
                        <Col className="ps-5">
                            <i className="bi bi-twitter my-4 d-inline-block" style={{ fontSize: 50, color: "dodgerblue" }}></i>
                            <p style={{ fontSize: 50 }}>Happening Now</p>
                            <h2 className="my-4 mb-5" style={{ fontSize: 30 }}>Join <span style={{ color: "#0096FF" }} >Twitter</span> Today</h2>
                        </Col>

                        <Col className="d-flex flex-column align-items-center gap-2">
                            <Button className="rounded-pill w-75" variant='outline-dark' onClick={handleGoogleLogin}>
                                <i className="bi bi-google" style={{ width: "20px", color: '#89CFF0' }}></i>
                                <span className="ms-3">Sign up with Google</span>
                            </Button>
                            <Button className="rounded-pill w-75" variant='outline-dark'>
                                <i className="bi bi-facebook" style={{ width: "20px", color: '#1F51FF' }}></i>
                                <span className="ms-3">Sign up with Facebook</span>
                            </Button>
                            <Button className="rounded-pill w-75" variant='outline-dark'>
                                <i className="bi bi-apple" style={{ width: "20px", color: '#E9DCC9' }}></i>
                                <span className="ms-3">Sign up with Apple</span>
                            </Button>
                            <div className="d-flex justify-content-center w-50">
                                <p className="text-center mb-0">or</p>
                            </div>
                            <Button className='rounded-pill w-50' onClick={handleShowSignUp}>
                                Create an account
                            </Button>
                            <p className="ps-5" style={{ fontSize: "12px" }}>
                                By signing up, you agree to the Terms of Service and Privacy Policy including Cookie Use.
                            </p>
                            <p className='mt-3' style={{ fontWeight: "bold" }}>
                                Already have an account?
                            </p>
                            <Button
                                className='rounded-pill w-50'
                                variant='outline-primary'
                                onClick={handleShowLogin}
                            >
                                Sign In
                            </Button>
                        </Col>
                        <Modal
                            show={modalShow !== null}
                            onHide={handleClose}
                            animation={false}
                            centered
                        >
                            <Modal.Body style={{ backgroundColor: 'dodgerblue' }}>
                                <h2 className='mb-4' style={{ fontWeight: "bold", textAlign: 'center', color: '#F0FFFF' }}>
                                    {modalShow === "SignUp"
                                        ? "Create an account"
                                        : "Log in to your account"}
                                </h2>
                                <Form
                                    className='d-flex flex-column align-items-center gap-2 px-5'
                                    onSubmit={modalShow === "SignUp" ? handleSignUp : handleLogin}
                                >
                                    <Form.Group className='mb-3 w-100' controlId='formBasicEmail'>
                                        <Form.Control
                                            onChange={(e) => setUsername(e.target.value)}
                                            type='email'
                                            placeholder='Enter username'
                                            style={{ backgroundColor: '#EDEADE' }}
                                        />
                                    </Form.Group>

                                    <Form.Group className='mb-3 w-100' controlId='formBasicPassword'>
                                        <Form.Control
                                            onChange={(e) => setPassword(e.target.value)}
                                            type='password'
                                            placeholder='Password'
                                            style={{ backgroundColor: '#EDEADE' }}
                                        />
                                    </Form.Group>

                                    <p style={{ fontSize: "12px", color: 'white' }}>
                                        By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. TwitterC may use your contact information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your account secure and personalising our services, including ads. Learn more. Others will be able to find you by email or phone number, when provided, unless you choose otherwise here.
                                    </p>
                                    <Button className='rounded-pill w-50 mx-auto mb-3' type='submit' style={{ backgroundColor: 'white', color: '#191970', fontWeight: "bold" }}>
                                        {modalShow === "SignUp" ? "Sign up" : "Log In"}
                                    </Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>
            </div>
        </div>
    );
}