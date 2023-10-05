import React from "react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import {useHistory} from "react-router-dom"


export default function SignUp(){
    const [show, setShow] = useState(false);
    const handleClick = ()=> setShow(!show);
    const toast = useToast();
    const history = useHistory();

    const [name, setName]= useState();
    const [email, setEmail]= useState();
    const [confirmPassword, setConfirmPassword]= useState();
    const [password, setPassword]= useState();
    const [avatar, setAvatar]= useState();
    const [avatarLoading, setAvatarLoading]= useState(false);

    const handleSubmit = async() =>{
        setAvatarLoading(true);
        if(!name || !email || !password || !confirmPassword){
            toast({
                title:"Please Fill all Fields",
                status:"Warning",
                duration:5000,
                isClosable:true,
                position:"bottom",

              });
            setAvatarLoading(false);
            return;
            }
        if (password !== confirmPassword){
            toast({
                title:"Passwords do not Match",
                status:"Warning",
                duration:5000,
                isClosable:true,
                position:"bottom",

                });
            return;
            }
            console.log(name, email, password, avatar);
            try{
                const config = {
                    headers:{
                        "Content-type":"application/json",
                    },
                };
                const {data} = await axios.post(
                    "/api/user",
                    {
                        name,
                        email,
                        password,
                        avatar,

                    },
                    config
                );
                console.log(data);
                toast({
                    title: "Registration Successful",
                    status:'success',
                    duration:5000,
                    isClosable: true,
                    position: 'bottom',

                });
                localStorage.setItem("userInfo", JSON.stringify(data));
                setAvatarLoading(false);
                history.push("/chats");

            } catch (error){
                toast({
                    title: "Error Occoured",
                    description:error.response.data.message,
                    status:'error',
                    duration:5000,
                    isClosable: true,
                    position: 'bottom',

                });
                setAvatarLoading(false);
            }
        };

        const postDetails = (avatars) =>{
            setAvatarLoading(true);
            if (pics === undefined){
                toast({
                    title: "Please Select an Image!",
                    status:"warning",
                    duration: 5000,
                    inClosable: true,
                    position:'bottom',

                });
                return;
            }
            console.log(avatars);
            if (avatars.type === "image/jpeg" || avatars.type === "image.png") {
                const data = new FormData();
                data.append('file', avatars);
                data.append('upload_preset', 'reachout');
                data.append('cloud_name', "reachout");
                fetch("http://api.cloudinary.com/v1_1/reachout/image/upload",{
                    method: 'post',
                    body:'data',
            
                })
                .then((res) => res.json())
                .then((data) => {
                    setAvatar(data.url.toString())
                    console.log(data.url.toString())
                    setAvatarLoading(false);
                })
                .catch((err) =>{
                    console.log(err);
                    setAvatarLoading(false);
                });
            }else{
                toast({
                    title:'Select and Image',
                    status:'warning',
                    duration:5000,
                    isClosable: true,
                    position:'bottom',

                });
                setAvatarLoading(false);
                return;
            }
        };

    return(
        <div>
            <div>
                {/* create form with sign up and login tab */}
                {/* Have input text box for name email  for login */}
                {/* Have input text box for password and pw confirm  */}
                {/* Have input box for uploading pics */}
                {/* Have sign up button */}

            </div>
        </div>
    )
}