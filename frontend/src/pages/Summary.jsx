import React from 'react'
import { Flex,
  Heading,
  Box,
Text,
Textarea,
Button,

 } from '@chakra-ui/react'
 import { useSelector } from 'react-redux'
 import copy from "copy-to-clipboard";  
 import { useToast } from '@chakra-ui/react'
 import axios from 'axios';
 import { useDispatch } from 'react-redux';
 import { userIsLoggedIn } from '../redux/auth/Action';





function Summary() {
  let [text, setText] = React.useState('')
  let [output, setOutput] = React.useState('')
  const typingSpeed = 40;
  const toast = useToast()
  const dispatch=useDispatch();

  const userData=useSelector((data)=>{
    return data.reducerAuth
  })

  let authToken=localStorage.getItem('token');
  let headers={'authorization': `Bearer ${authToken}`}

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setText(inputValue)
  }
  function copyText(){
    copy(output);
    toast({
      title: 'Copied Successfuliy',
      description: `${output}`,
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
  })
  }


  function simulateTypingEffect(text) {
    
    let index = -1;
    function typeNextCharacter() {
      setOutput(prevOutput => prevOutput + text.charAt(index));
      index++;
  
      if (index < text.length) {
        setTimeout(typeNextCharacter, typingSpeed);
      }
    }
  
    typeNextCharacter();
  }

  function handleGenerate(){
    if(userData.credit>0){
      toast({
        title: 'Your Request is Processing....',
        description: `${text}`,
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
    })
    let authToken=localStorage.getItem('token');
  let headers={'authorization': `Bearer ${authToken}`}
    axios.post(`${process.env.REACT_APP_AI_URL}/summary`,{text},{headers})
    .then((res)=>{console.log(res)
      // setOutput(res.data);
      simulateTypingEffect(res.data);
      userIsLoggedIn(authToken,dispatch)
    })
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
  }

  function clearText(){
    setText("")
  }
  function clearText2(){
    setOutput("")
  }


  return (
    <>
    <Flex display="flex" paddingTop={["25%","15%","11%","7%"]} align="center" justifyContent="space-evenly" width="1fr" textAlign="center" flexDirection="column" color={userData.color} bg={userData.background}>
      <Heading width="100%" bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' padding="0 20%">Write a Summary with help of AI</Heading>
      <Box width={["90%","85%","80%","70%"]} display="flex" flexDirection={["column","column","column","row"]} margin="5% 0" >
        <Box width={["100%","100%","100%","50%"]}>
        <Heading width="100%" fontSize='2xl'>Request</Heading>
        <Text mb='8px'>Input</Text>
      <Textarea
        value={text}
        onChange={handleInputChange}
        placeholder="What's in your mind ?"
        width="96%"
        border="none"
        bg="#060606"
        marginBottom="5%"
        height="400px"
      />
      <Box display="flex" justifyContent="space-between" padding="5%">
      <Button bg='#060606' _hover={{ bg: 'red' }} onClick={clearText} isDisabled={text.length>0?false:true}>Clear</Button> 
       <Button bg='#060606'  _hover={{ bg: 'green' }} isDisabled={text.length>0?false:true} onClick={handleGenerate}>Generate</Button>
      </Box>  
      </Box>
        <Box width={["100%","100%","100%","50%"]}>
        <Heading width="100%" fontSize='2xl'>Response</Heading>
        <Text mb='8px'>Output</Text>
      <Textarea
        value={output}
        placeholder="Wait for output"
        width="96%"
        border="none"
        bg="#060606"
        marginBottom="5%"
        height="400px"
      />
      <Box display="flex" justifyContent="space-between" padding="5%">
      <Button bg='#060606' _hover={{ bg: 'red' }} onClick={clearText2} isDisabled={output.length>0?false:true}>Clear</Button> 
       <Button bg='#060606'  _hover={{ bg: 'green' }} onClick={copyText} isDisabled={output.length>0?false:true}>Copy</Button>
      </Box>  
        </Box>
      </Box>
    </Flex>
    </>
  )
}
export default Summary
