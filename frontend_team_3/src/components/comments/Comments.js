import React, { useEffect, useState } from "react";
import { comments } from "../data/data";
import Comment from "./comment";
import axios from "axios";
import { useSelector } from "react-redux";
import { Localhost } from "../../config/api";
import { useDispatch } from "react-redux";
const Comments = ({ id }) => {
  const [inputComment, setInputComments] = useState("");
  const [comment, setComments] = useState([]);
  const [replie, setReplies] = useState([]);

  // do add reply comment
  const merge = async () => {
    const updatedComments = await comment?.map((com) => {
      const comReplies = replie.filter((rep) => rep.commentId === com._id);
      if (comReplies.length > 0) {
        com.children = comReplies;
      }
      return com;
    });
    setComments([...updatedComments]);
  };

  // }

  const { currentUser } = useSelector((state) => state);

  function addReply(commentId, replyText) {
    let commentsWithNewReply = [...comment];
    insertComment(commentsWithNewReply, commentId, replyText);
    setComments(commentsWithNewReply);
  }
  // do  add comment to chidren
  function insertComment(comment, parentId, text) {
    // merge();
    for (let i = 0; i < comment?.length; i++) {
      if (comment[i]._id === parentId) {
        comment[i].children.unshift(newComment(text));
      }
    }
  }
  // do new comment
  function newComment(text) {
    return {
      id: +1,
      body: text,
      name: "Nora Ali",
      img: "https://image.lexica.art/full_jpg/f2a8605f-f7fd-4430-86a0-2870e5a1327a",
      children: [],
    };
  }
  const handelClick = () => {
    setComments([...comment, newComment(inputComment)]);
    setInputComments("");
  };
  useEffect(() => {
    const fetchCommentsAndReplies = async () => {
      try {
        // Fetch comments
        const commentRes = await axios.get(
          `${Localhost}/api/v1/comment/${id}`,
          { withCredentials: true }
        );
        const allComments = commentRes.data.map((comment) => {
          return { ...comment, children: [] };
        });
        setComments(allComments);

        // Fetch replies
        const replyRes = await axios.get(
          `${Localhost}/replie/${id}`,
          { withCredentials: true }
        );
        const allReplies = replyRes.data;

        // Update comments with replies
        const updatedComments = allComments.map((com) => {
          const comReplies = allReplies.filter(
            (rep) => rep.commentId === com._id
          );
          if (comReplies.length > 0) {
            com.children = comReplies;
          }
          return com;
        });
        setComments(updatedComments);
      } catch (err) {
        console.log("There was an error");
      }
    };
    fetchCommentsAndReplies();
  }, []);

  const handleSubmit = async () => {
    console.log(comment);

    try {
      await axios.post(
        `${Localhost}/api/v1/comment/${id}`,
        {
          desc: inputComment,
        },
        { withCredentials: true }
      );
      setComments([...comment, newComment(inputComment)]);
      setInputComments("");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="px-5 comments mt-4">
      {/* comment list  */}
      <div className="row color-gray radius p-3">
        {comment?.map((items) => (
          <Comment
            key={items.id}
            com={items}
            user={currentUser}
            rep={replie}
            addReply={addReply}
            id={id}
          />
        ))}
      </div>
      {/* comment form  */}
      <div className="row my-3">
        <div className="col d-flex flex-column radius">
          <input
            className="w-100 form-control rounded-pill ps-3"
            value={inputComment}
            onChange={(e) => setInputComments(e.target.value)}
            placeholder="leave your comment here"
          />
          <button
            onClick={handleSubmit}
            className="ms-auto mt-3  color-secondary btn px-4 py-1 rounded-pill"
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
