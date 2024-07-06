import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux"; //redux implementation 
import { savePost } from "../features/posts/postsSlice"; //redux implementation
// import { jwtDecode } from "jwt-decode"; //b4 redux
// import axios from "axios"; // b4 redux

//redux implementation 
export default function NewPostModal({ show, handleClose }) {
    const [postContent, setPostContent] = useState("");
    const dispatch = useDispatch();

    const handleSave = () => {
        dispatch(savePost(postContent));
        handleClose();
        setPostContent("");
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="postContent">
                            <Form.Control
                                placeholder="What is happening?!"
                                as="textarea"
                                rows={3}
                                onChange={(e) => setPostContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        className="rounded-pill"
                        onClick={handleSave}
                    >
                        Tweet
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


//w/out redux implementation
// export default function NewPostModal({ show, handleClose }) {
//     const [postContent, setPostContent] = useState("");

//     const handleSave = () => {
//         //Get stored JWT Token
//         const token = localStorage.getItem("authToken");

//         //Decode the token to fetch user id
//         const decode = jwtDecode(token);
//         const userId = decode.id // May change depending on how the server encode the token

//         //Prepare data to be sent
//         const data = {
//             title: "Post Title",  //Add functionality to set this properly
//             content: postContent,
//             user_id: userId,
//         };

//         //Make your API call here
//         axios
//             .post("https://364f14f3-6e78-4594-a9e8-c54d62ac51a1-00-22ss80nkf5izd.kirk.replit.dev/posts", data)
//             .then((response) => {
//                 console.log("Success:", response.data);
//                 handleClose();
//             })
//             .catch((error) => {
//                 console.error("Error", error);
//             });
//     }

//     return (
//         <>
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton></Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group controlId="postContent">
//                             <Form.Control
//                                 placeholder="What is happening?!"
//                                 as="textarea"
//                                 rows={3}
//                                 onChange={(e) => setPostContent(e.target.value)}
//                             />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button
//                         variant="primary"
//                         className="rounded-pill"
//                         onClick={handleSave}
//                     >
//                         Tweet
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     )
// }