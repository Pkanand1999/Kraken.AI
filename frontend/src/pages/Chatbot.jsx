import React, { useState, useRef, useEffect } from 'react'
import {
  Flex,
  Heading,
  Box,
  Input
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { DatatypeModule } from '@faker-js/faker'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userIsLoggedIn } from '../redux/auth/Action'
import { useToast } from '@chakra-ui/react'


export default function Chatbot() {

  const [text, setText] = useState("");
  const [chat, setChat] = useState([]);
  const [time, setTime] = useState([]);
  const chatContainerRef = useRef(null);
  const toast = useToast()
const dispatch=useDispatch();
  const userData = useSelector((data) => {
    return data.reducerAuth
  })

  var currentdate = new Date();
  var datetime =currentdate.getDay() + "/" + currentdate.getMonth()
    + "/" + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":" + currentdate.getSeconds();


  
let authToken=localStorage.getItem('token');
let headers={'authorization': `Bearer ${authToken}`}
// Function to handle sending a message
const sendMessage =async (message) => {
  // Add the message to the chat array
  if(userData.credit>0){
    setChat((prevChat) => [...prevChat, message]);
    setTime((prevTime) => [...prevTime, datetime]);
    console.log(chat)
    axios.post(`${process.env.REACT_APP_AI_URL}/chatbot`,{text},{headers})
   .then((res)=>{console.log(res)
    let data=res.data;
    let reply=data.split(":")
    setChat((prevChat) => [...prevChat, reply[1]]);
    setTime((prevTime) => [...prevTime, datetime]);
    userIsLoggedIn(authToken,dispatch)
  })
.catch((err)=>{console.log(err)})
  }else{
    toast({
      title: 'Unable to get results',
      description: "Your Credit is : 0",
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top',
  })
  }
};

// Function to scroll to the latest message
const scrollToLatestMessage = () => {
  chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
};

// Call scrollToLatestMessage whenever chat updates 
useEffect(() => {
  scrollToLatestMessage();
}, [chat]);

  return (
    <>
      <Flex
    display="flex"
    padding={["25% 0", "15% 0", "11% 0", "7% 0"]}
    align="center"
    flexDirection="column"
    justifyContent="space-evenly"
    width="1fr"
    color={userData.color}
    bg={userData.background}
  >
    <Heading padding="0 20%" marginBottom="2%" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">
      Chatbot
    </Heading>
    <Heading padding="0 20%" size="md" marginBottom="1%" bgGradient="linear(to-l, red, yellow)" bgClip="text">
      Chat with Kraken
    </Heading>
    <Box
      height="460px"
      width="90%"
      margin="auto"
      overflowY="scroll"
      bg="#060606"
      ref={chatContainerRef}
    >
      {/* Chat messages */}
      <Flex direction="column" p={4}>
        {/* Render chat messages */}
        {chat.map((message, index) => (
          <Box
            key={index}
            bg={index % 2 === 0 ? "blue.500" : "green.400"}
            color="white"
            borderRadius="md"
            p={2}
            mb={2}
            alignSelf={index % 2 === 0 ? "flex-end" : "flex-start"}
          >
            <Box>
              <strong>{index % 2 === 0 ? "Me:" : "Kraken:"}</strong> {message}
            </Box>
            <Box fontSize="sm" color="gray.800">
              {time[index]}
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>

    {/* Chat input */}
    <Flex align="center" mt={4} width="90%">
      <div style={{ position: "relative", width: "100%" }}>
        <Input
          placeholder="Type your message..."
          width="100%"
          pr="2.5rem"
          onChange={(e)=>setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(e.target.value);
              e.target.value = "";
            }
          }}
        />
        {/* Add send button or icon here */}
        <i
          className="fa-solid fa-paper-plane"
          style={{
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#CBD5E0",
            cursor: "pointer",
            fontSize:"1.5rem",
            zIndex:"100"
          }}
          onClick={() => {
            const input = document.querySelector('input');
            sendMessage(input.value);
            input.value = "";
          }}
        ></i>
      </div>
    </Flex>
  </Flex>

    </>
  )
}