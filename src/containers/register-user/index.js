import React ,{useContext, useState}from 'react'
import { UserContext } from '../../contexts/user'
import "./styles.css";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {auth, db,storage} from "../../firebase";
import firebase from "firebase";
import makeid from "../../helper/functions"
export default function RegisterUser() {
    const [user, setUser] = useContext(UserContext).user;
    const [userInfo, setUserInfo] = useState({
        fName:"",
        lName:"",
        email:"",
        clave1:"",
        clave2:"",
        profileImage: null
    })
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [imageProfileUrl, setImageProfileUrl] = useState("");
    const handleChange =(event)=>{
        const {name , value}=event.target;
        setUserInfo(prevValue =>{
            return{
                ...prevValue,
                [name]: value
                
            }
            
        });
        
    }
    const handleChangeImage =(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
            
            var imagePreview = document.getElementById("image-preview");

            imagePreview.src = selectedImageSrc;
            imagePreview.style.display="block";
            
            
        }
        
    }
    
   
    const handleUpload= (e)=>{
        e.preventDefault();
        if(image){
            var imageName = makeid(10);
            const uploadTask = storage.ref(`profileImages/${imageName}.jpg`)
            .put(image);

            uploadTask.on("state_changed",(snapshot)=>{
                //progress function
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                setProgress(progress);

            }, (error)=>{
                console.log(error);
            }, ()=>{
                //get download url and upload the post info

                storage.ref("profileImages").child(`${imageName}.jpg`)
                .getDownloadURL()
                .then((imageUrl)=>{
                              
                        auth.createUserWithEmailAndPassword(userInfo.email, userInfo.clave1)
                        .then((cred)=>{
                            return db.collection("users").doc(cred.user.uid).set({
                               timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                               nombres: userInfo.fName,
                               apellidos:userInfo.lName ,
                               photoUrl: imageUrl,
            
                            })
                            //it succesfully created a new user with email and password.
                            
                            
                            
                        }).catch(error=>alert(error.message))
                        
                  
                });
               
            });
            setUserInfo({
                fName:"",
                lName:"",
                email:"",
                clave1:"",
                clave2:""
            })
            setProgress(0);
            setImage(null);
        
        }else{
            
                 e.preventDefault();
                auth.createUserWithEmailAndPassword(userInfo.email, userInfo.clave1)
                .then((cred)=>{
                    return db.collection("users").doc(cred.user.uid).set({
                       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                       nombres: userInfo.fName,
                       apellidos:userInfo.lName ,
                       photoUrl: "https://firebasestorage.googleapis.com/v0/b/reactinstatutorial-6f7c5.appspot.com/o/profileImages%2Fuser.png?alt=media&token=da142ee2-22f5-46ff-934a-2b82752f380d",
    
                    })
                    //it succesfully created a new user with email and password.
                    
                    
                    
                }).catch(error=>alert(error.message))
                setUserInfo({
                    fName:"",
                    lName:"",
                    email:"",
                    clave1:"",
                    clave2:""
                })
                setProgress(0);
                setImage(null);
          
           
        }
        
        
        document.getElementById("image-preview")
        .style.display="none";
        
       
    }
    
    
    return (
        <div className="register_user" style={{marginTop:"15px"}}>
            {!user?(
                <div className="createPost_loggedIn">
                    <p className="register_title">Regístrate </p>
                    <form>
                        <label htmlFor="fname">Nombres</label>
                        <input
                        name="fName"
                        onChange={handleChange}
                        placeholder="Nombres"
                         value={userInfo.fName}
                        />
                        <label htmlFor="lname">Apellidos</label>
                        <input
                        name="lName"
                        onChange={handleChange}
                        placeholder="Apellidos"
                        value={userInfo.lname}
                        />
                        <label htmlFor="email">E-mail</label>
                        <input
                        name="email"
                        onChange={handleChange}
                        placeholder="E-mail"
                        value={userInfo.email}
                        />
                        <label htmlFor="clave1">Contraseña</label>
                        <input
                        name="clave1"
                        type="password"
                        onChange={handleChange}
                        placeholder="Contraseña"
                        value={userInfo.clave1}
                        />
                        <label htmlFor="clave2">Repita la contraseña</label>
                        <input
                        type="password"
                        name="clave2"
                        onChange={handleChange}
                        placeholder="Repita la contraseña"
                        value={userInfo.clave2}
                        />
                        <div>
                            <label className="image_label" htmlFor="fileInput">
                                    <AddAPhotoIcon style={{cursor:"pointer", fontSize:"20px", marginRight:"5px"}}                       
                                    />
                                    Ingrese una foto de perfil(Opcional)
                            </label>
                            
                            <input className="image_input"
                            id ="fileInput"
                            type="file"
                            accept="image/*"
                             onChange={handleChangeImage}
                            >

                            </input>
                            <div className="createPost_imagePreview">
                             <img id="image-preview" alt=""/>
                         </div>
                        </div>
                         
                        
                        <button 
                        onClick={handleUpload}
                        style={{backgroundColor: (userInfo.fName&&userInfo.lName&&userInfo.email&&
                        userInfo.clave1&&userInfo.clave2)? "#ec4646": "lightgrey"}}
                        >{`Continuar ${progress !=0 ? progress: ""}`} </button>
                        
                    </form>
                    
                </div>
            ):(
                <div >
                    {/* <SignInBtn /> */}
                    <p style={{ marginLeft:"12px"}}>to post & comment</p>
                 </div>
            )}
           
        </div>
    )
}
