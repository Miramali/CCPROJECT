import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const Comment = ({ com, user, rep, addReply ,id}) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const parentEle = useRef(null);

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const handleSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:5000/replie/${id}`,
        {
          desc: replyText,
          commentId: com._id,
        },
        { withCredentials: true }
      );
      addReply(com._id, replyText);
      setShowReplyBox(false);
      setReplyText("");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="col ">
        <div
          className="d-flex flex-start mt-4"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <img
            className="rounded-circle shadow-1-strong me-3"
            src="https://image.lexica.art/full_jpg/f2a8605f-f7fd-4430-86a0-2870e5a1327a"
            alt="avatar"
            width="75"
            height="75"
          />
          <div className="flex-grow-1 flex-shrink-1">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-1">{user.name}</p>

                {!showReplyBox && isHovering && (
                  <button
                    type="button"
                    className=" color-secondary btn px-4 py-1 rounded-pill "
                    onClick={() => {
                      setShowReplyBox(true);
                      setTimeout(() => parentEle.current.focus());
                    }}
                  >
                    <FontAwesomeIcon icon={faReply} />
                  </button>
                )}
              </div>
              <p className="small mb-0">{com.desc}</p>
              {showReplyBox && (
                <div className="row my-3">
                  <div className="col d-flex flex-column radius">
                    <input
                      className="w-100 form-control rounded-pill ps-3"
                      ref={parentEle}
                      onChange={(e) => {
                        setReplyText(e.target.value);
                      }}
                      placeholder="leave your comment here"
                    />
                    <button
                      onClick={handleSubmit}
                      className="ms-auto mt-3 color-secondary btn px-4 py-1 rounded-pill"
                    >
                      send
                    </button>
                  </div>
                </div>
              )}
            </div>
            {com.children.length > 0 &&
              com.children.map((child) => (
                // <Comment key={child.id} item= {child} addReply={addReply}/>
                <div className="d-flex flex-start mt-4" key={child._id}>
                  <img
                    className="rounded-circle shadow-1 me-3"
                    src="https://image.lexica.art/full_jpg/f2a8605f-f7fd-4430-86a0-2870e5a1327a"
                    alt="avatar"
                    width="75"
                    height="75"
                  />
                  <div className="flex-grow-1 flex-shrink-1">
                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-1">{user.name}</p>
                      </div>
                      <p className="small mb-0">{child?.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
