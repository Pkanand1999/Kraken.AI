import React, { useState ,useEffect} from 'react'
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
  Link,

} from '@chakra-ui/react'
import axios from 'axios'
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { useToast } from '@chakra-ui/react'


export default function Login({onClose2}) {
  const [user, setUser] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const dispatch = useDispatch();
  const userData = useSelector((data) => {
    return data.reducerAuth
  })
  // console.log(userData)
  function getList(e){
    let{name,value}=e;
    setUser({...user,[name]:value})
  }
  
 function getUser(e) {
    e.preventDefault()
     dispatch(loginUser(user))
  }

  const loginUser=(data)=>(dispatch)=>{
    axios.post(`${process.env.REACT_APP_AUTH_URL}/login`,data )
   //  .then((res)=>console.log(res.data))
       .then((res)=>{
           console.log(res.data)
           localStorage.setItem('token',res.data.token)
           dispatch({
               type:"LOGIN_SUCCESS",
               payload:res.data
           })
           toast({
            title: 'Login Successful',
            description: "Welcome to Kraken.AI",
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top',
        })
        onClose()
        onClose2()
       }).catch((e)=>{
           dispatch({
               type:"LOGIN_FAILURE",
               payload:true,

           })
           toast({
            title: 'Login Error',
            description: "Email or Password may be wrong",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
        })
       })

}

 




  return (
    <>
      {/* <Button onClick={onOpen}>Login</Button> */}
      <Text as='b' fontSize='2xl' _hover={{ color: "teal" }} onClick={onOpen}>Login</Text>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Your Login Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder='Enter Your Email' name="email" onChange={(e)=>{getList(e.target)}} />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type='password' placeholder='Enter Your Password' name="password"  onChange={(e)=>{getList(e.target)}} />
            </FormControl>
          </ModalBody>
          {/* <Text display="flex" padding="0 8%"> Need an account?  <Signup  onClose={onClose()}></Signup></Text> */}
          <ModalFooter>
            <Button colorScheme='teal' mr={3} display="flex" margin="auto" onClick={getUser}>
              Login
            </Button>
            {/* <Button onClick={onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
