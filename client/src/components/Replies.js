import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Replies = () => {
    const [replyList, setReplyList] = useState([]);
    const [reply, setReply] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchReplies = () => {
            fetch("http://localhost:4000/api/thread/replies", {
                method: "POST",
                body: JSON.stringify({
                    id,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setReplyList(data.replies);
                    setTitle(data.title);
                })
                .catch((err) => console.error(err));
        };
        fetchReplies();
    }, [id]);

    //👇🏻 This function when triggered when we add a new reply
    const handleSubmitReply = (e) => {
        e.preventDefault();
        console.log({ reply });
        setReply("");
    };
    return <main className='replies'>{/*--UI elements--*/}</main>;


    // return (
    //     <main className='replies'>
    //         <form className='modal__content' onSubmit={handleSubmitReply}>
    //             <label htmlFor='reply'>Reply to the thread</label>
    //             <textarea
    //                 rows={5}
    //                 value={reply}
    //                 onChange={(e) => setReply(e.target.value)}
    //                 type='text'
    //                 name='reply'
    //                 className='modalInput'
    //             />

    //             <button className='modalBtn'>SEND</button>
    //         </form>
    //     </main>
    // );
};

export default Replies;