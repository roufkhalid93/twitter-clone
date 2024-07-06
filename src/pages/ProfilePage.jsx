import { Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileMidBody from "../components/ProfileMidBody";

export default function ProfilePage() {
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) navigate("/login");
    }, [authToken, navigate]);
    const handleLogout = () => setAuthToken("");

    // //check for authToken immediately upon component mount and whenever authToken changes
    // useEffect(() => {
    //     if (!authToken) {
    //         navigate("/login"); //redirect to login if no auth token is present
    //     }
    // }, [authToken, navigate]);

    // const handleLogout = () => {
    //     setAuthToken(""); //clear token from localStorage
    // };

    return (
        <>
            <Container>
                <Row>
                    <ProfileSideBar handleLogout={handleLogout} />
                    <ProfileMidBody />
                </Row>
            </Container>
        </>
    );
}