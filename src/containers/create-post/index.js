import React from 'react'
import { SignInBtn } from '../../components'
import "./styles.css"
export default function CreatePost() {
    return (
        <div className="createPost">
            <SignInBtn />
            <p style={{ marginLeft:"12px"}}>to post & comment</p>
        </div>
    )
}
