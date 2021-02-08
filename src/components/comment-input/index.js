import React, {useContext, useState}from 'react'
import { UserContext } from '../../contexts/user';
import "./styles.css"
import {db} from "../../firebase"

export default function CommentInput({comments,id}) {
    const [comment, setComment] = useState("");
    const [user, setUser] = useContext(UserContext).user;
    const [commentArray, setCommentarray]=useState(comments ?
        comments:[]);
    
    const addComment = ()=>{
       if(comment!=""){
            //add comment to the post info
            commentArray.push({
                comment:comment,
                username: user.displayName,

            });
            db.collection("posts")
            .doc(id)
            .update({
                comments : commentArray
            })
            .then(function(){
                setComment("");
                console.log("comment added");
            }).catch(function (error){
                console.log(error);
            });
       }
    }

    return (
        <div className="commentInput">
            <textarea 
            className="commentInput_textarea"
            rows="1"
            placeholder="Ofrece tu producto"
            value={comment}
            onChange= {(e)=> setComment(e.target.value)}>
            
            </textarea>
            <button
            onClick={addComment}
             className="commentInput_btn">Post</button>
        </div>
    )
}
