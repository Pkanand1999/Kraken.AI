import React, { useState,useEffect } from 'react'
import {
    Drawer,
    useDisclosure,
    Button,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Stack,
    IconButton,
    HStack,
    Heading,
    Text,
    DrawerFooter,
    Wrap,
    WrapItem,
    Avatar,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import SetTheme from './SetTheme'
import { useSelector } from "react-redux"
import Login from './Login'
import Signup from './Signup'
import { Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { userIsLoggedIn } from '../redux/auth/Action'


function Navbar() {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose:onClose2 } = useDisclosure()
    const firstField = React.useRef()
    const userData = useSelector((data) => {
        return data.reducerAuth
    })


    function logout(e){
        e.preventDefault()
        localStorage.removeItem('token')
        dispatch({
            type:"LOG_OUT",
        })
    }

    let authToken = userData.token;

    useEffect(() => {
      if (authToken) {
        userIsLoggedIn(authToken,dispatch);
      }
  
    }, [authToken])
   

    
    return (
         <>
            <HStack display="flex" width="100%" justifyContent="space-between" padding=".5%" align="center" bg={userData.color} color={userData.background} position="fixed" zIndex="100">
                <HStack paddingLeft="2%" display="flex">
                    <Button
                        as={IconButton}
                        icon={<HamburgerIcon />}
                        colorScheme='teal'
                        onClick={onOpen}
                    />
                    <Heading display="flex" bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' marginLeft="2%">Kraken.AI</Heading>
                </HStack>
                <HStack display="flex" paddingRight="2%" >
                    {userData.isAuth?<Avatar bg="grey" src={userData.image} /> : <Heading color={userData.background}>?</Heading>}
                    <SetTheme />
                </HStack>
            </HStack>
            <Drawer
                isOpen={isOpen}
                placement='left'
                initialFocusRef={firstField}
                onClose={onClose2}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                       {userData.isAuth? <Heading size="lg">{userData.name}</Heading>:<Heading>User?</Heading>}{userData.isAuth? <Heading size='md'>Credit: {userData.credit}</Heading>:""}
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            {userData.isAuth ?<Link to="/" onClick={onClose2} _hover={{color: "teal" }}><Text as='b' fontSize='2xl'>Home</Text></Link>:""}
                            {userData.isAuth ?<Link to="/summary" onClick={onClose2} _hover={{color: "teal" }}><Text as='b' fontSize='2xl'>Summary.Ai</Text></Link>:""}
                            {userData.isAuth ?<Link to="/paragraph" onClick={onClose2} _hover={{color: "teal" }}><Text as='b' fontSize='2xl' >Paragraph.Ai</Text></Link>:""}
                            {userData.isAuth ?<Link to="/scifi" onClick={onClose2} _hover={{color: "teal" }}><Text as='b' fontSize='2xl' >Scifi-Image.Ai</Text></Link>:""}
                            {userData.isAuth ?<Link to="/chatbot" onClick={onClose2} _hover={{color: "teal" }}><Text as='b' fontSize='2xl' >Chatbot.Ai</Text></Link>:""}
                            {/* <Link href="/login" onClick={onClose} _hover={{color: "teal" }}><Text as='b' fontSize='2xl' >Login</Text></Link>
                            <Link href="/signup" onClick={onClose} _hover={{color: "teal" }}><Text as='b' fontSize='2xl' >Login</Text></Link> */}
                            {userData.isAuth ? "" : <Link to="" ><Login onClose2={onClose2}/></Link>}
                            {userData.isAuth ? "" : <Link to="" ><Signup onClose2={onClose2}/></Link>}
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px' onClick={onClose2}>
                        {userData.isAuth? <Button width="100%" bg="teal" color="white" _hover={{ bg: '#f8001a', color: "black" }} onClick={logout} >LogOut</Button> : ""}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </>
    )
}


export default Navbar