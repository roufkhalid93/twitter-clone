import { Button, Col } from "react-bootstrap";
import IconButton from "../components/IconButton";
import NewPostModal from "./NewPostModal";
import { useState } from "react";
import ChatBotModal from "./ChatbotModal"; //AI chatbot implemenation

export default function ProfileSideBar({ handleLogout }) {
    const [show, setShow] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false); //AI chatbot implemenation

    const handleCloseChatbot = () => setShowChatbot(false); //AI chatbot implemenation
    const handleShowChatbot = () => setShowChatbot(true); //AI chatbot implemenation

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Col
            sm={2}
            className="d-flex flex-column justify-content-start align-items-start bg-light vh-100"
            style={{ position: "sticky", top: 0 }}
        >
            <IconButton className="bi bi-twitter" isTop />
            <IconButton className="bi bi-house" text="Home" />
            <IconButton className="bi bi-search" text="Explore" />
            <IconButton className="bi bi-bell" text="Notifications" />
            <IconButton className="bi bi-envelope" text="Messages" />
            <IconButton className="bi bi-journal-text" text="Lists" />
            <IconButton className="bi bi-bookmark" text="Bookmarks" />
            <IconButton className="bi bi-patch-check" text="Verified" />
            <IconButton className="bi bi-person" text="Profile" />
            <IconButton className="bi bi-chat-square-text" text="Chatbot" onClick={handleShowChatbot} />
            {/* AI chatbot implemenation */}
            <IconButton
                className="bi bi-door-closed"
                text="Logout"
                onClick={handleLogout}
            />
            <Button className="rounded-pill w-100 mb-3" onClick={handleShow}>
                Tweet
            </Button>

            <NewPostModal show={show} handleClose={handleClose} />
            <ChatBotModal show={showChatbot} handleClose={handleCloseChatbot} />
            {/* AI chatbot implemenation */}
        </Col>
    );
}