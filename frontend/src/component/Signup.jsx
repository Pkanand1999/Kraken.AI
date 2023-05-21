import React,{useState} from 'react'
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    useDisclosure,
    Text,
} from '@chakra-ui/react'
import { GoogleLoginButton } from 'react-social-login-buttons'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useToast } from '@chakra-ui/react'
import { useGoogleLogin } from "@react-oauth/google";



export default function Signup({onClose2}) {
  const [user,setUser]=useState({});
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
const dispatch=useDispatch();
const toast = useToast()

    function getList(e){
      let{name,value}=e;
      setUser({...user,[name]:value})
    }

    function getUser(e) {
      e.preventDefault()
       signupUser(user)
    }


    const loging = useGoogleLogin({
      onSuccess: async (response) => {
          try {
              const Userdata = await axios.get(
                  "https://www.googleapis.com/oauth2/v3/userinfo",
                  {
                      headers: {
                          Authorization: `Bearer ${response.access_token}`,
                      },
                  }
              );
              let data=Userdata.data;
                let thdata={"name":data.name,
            "email":data.email,
        "picture":data.picture
    }
               let res= await fetch(`${process.env.REACT_APP_AUTH_URL}/googlelogin`,{
                method: 'POST',
                headers:{
                    "content-type": "application/json",
                },
                body:JSON.stringify(thdata)
               })
               let json=await res.json();
               localStorage.setItem('token',json.user.token)
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: json.user
                })
                toast({
                  title: 'Signup Successful',
                  description: "Welcome to Kraken.AI",
                  status: 'success',
                  duration: 4000,
                  isClosable: true,
                  position: 'top',
              })
                onClose()
                onClose2()
          } catch {
              console.log("error");
          }
      },
  });

    const signupUser=(data)=>{
      axios.post(`${process.env.REACT_APP_AUTH_URL}/register`,data )
          .then((res)=>{
              
              dispatch({
                  type:"SIGNUP_SUCCESS",
                  payload:true
              })
              toast({
                title: 'Signup Successful',
                description: "You Need To Login Now To Access The Features",
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'top',
            })
           onClose()
           onClose2()
          }).catch((e)=>{
              dispatch({
                  type:"SIGNUP_FAILURE",
                  payload:false,
              })
          })
    }
  
    return (
      <>
        {/* <Button onClick={onOpen}></Button> */}
        <Text as='b' fontSize='2xl' _hover={{color: "teal" }} onClick={onOpen}>SignUp</Text>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter Your Detail</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input ref={initialRef} placeholder='Enter Your Name' name="name" onChange={(e)=>{getList(e.target)}} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel >Email</FormLabel>
                <Input ref={initialRef} placeholder='Enter Your Email' type="email" name="email" onChange={(e)=>{getList(e.target)}} />
              </FormControl>
  
              <FormControl mt={4} isRequired>
                <FormLabel>Password</FormLabel>
                <Input placeholder='Enter Your Password' name="password" type="password" onChange={(e)=>{getList(e.target)}} />
              </FormControl>
            </ModalBody>
            {/* <Text display="flex" padding="0 8%"> Need an account?  <Login  onClose={onClose()}></Login></Text> */}
            <ModalFooter>
              <Button colorScheme='teal' mr={3} display="flex" margin="auto" onClick={getUser}>
                Sign Up
              </Button>
            </ModalFooter>
            <GoogleLoginButton style={{width:"50%",display:"flex", margin:"auto",marginBottom:"10%"}} onClick={loging} />
          </ModalContent>
        </Modal>
      </>
    )
}