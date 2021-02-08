import React,{useContext, useState} from 'react';
import Comment from '../../components/comment';
import {UserContext} from "../../contexts/user"
import "./styles.css";
import {storage, db} from "../../firebase"
import CommentInput from '../../components/comment-input';
export default function Post({profileUrl,
username, id, photoURL, caption, comments}) {
    const [user, setUser] = useContext(UserContext).user;
    const deletePost =()=>{
        //delete the image from firebase storage
        //get ref to the image we want to delete
        var imageRef = storage.refFromURL(photoURL);
        //delete the file
        imageRef.delete()
        .then(function(){
            console.log("delete successful");

        }).catch(function(error){
            console.log(error);
        });
        //2. delete the info post from firebase firestore
        db.collection("posts").doc(id).delete()
        .then(function(){
            console.log("delete post successful");

        }).catch(function(error){
            console.log(error);
        });
    }
    return (
        <div className="post">
            <div className="post_header">
                <div className="post_headerLeft">
                    <img className="post_profilePic" src={profileUrl} alt=""/>
                    <p style={{marginLeft:"8px"}}>{username}</p>
                </div>
                <button onClick={deletePost} className="post_delete">Delete</button>
            </div>
            <div className="post_center">
                <img className="post_photoUrl" src={photoURL} />
            </div>
            <div>
                <p>
                    <span style={{fontWeight:"500", marginRight:"4px"}}>{username}</span>
                    {caption}
                </p>
            </div>
           
            {comments? (comments.map((comment)=>
            <Comment username={comment.username}
            caption={comment.comment} />))
            :(null)}
            {user ? (<CommentInput 
            comments={comments} 
            id={id}/>):null}
            
            
        </div>
    )
}
