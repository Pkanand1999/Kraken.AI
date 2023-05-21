import React from 'react'
import { useState } from 'react';
import { Button, Input, Spinner,Flex,Heading ,Box} from '@chakra-ui/react';
 import { useSelector } from 'react-redux'
 import axios from 'axios';
 import { useToast } from '@chakra-ui/react'
 import { userIsLoggedIn } from '../redux/auth/Action';
 import { useDispatch } from 'react-redux';


export default function Scifi() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');
  const toast = useToast()
  const dispatch=useDispatch();

  const userData=useSelector((data)=>{
    return data.reducerAuth
})

const handleSubmit = () => {
  // Set loading state to true
  if(userData.credit>0){
  setIsLoading(true);
  setTimeout(()=>{
    let authToken=localStorage.getItem('token');
let headers={'authorization': `Bearer ${authToken}`}
    axios.post(`${process.env.REACT_APP_AI_URL}/scifi-image`,{text},{headers})
    .then((res)=>{console.log(res)
      setImageUrl(res.data);
      setIsLoading(false);
      userIsLoggedIn(authToken,dispatch)
    })
    .catch((err)=>{console.log(err)})
},2000)
  setText('');
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


  return (
    <>
    <Flex display="flex" padding={["25% 0", "15% 0", "11% 0", "7% 0"]} align="center" flexDirection="column" justifyContent="space-evenly" width="1fr"  color={userData.color} bg={userData.background}>
      <Heading padding="0 20%" marginBottom="2%" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">Scifi-Image</Heading>
    <Box width="95%" display="flex" flexDirection="column"  >
      <Input
        placeholder="Enter your text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        marginBottom={4}
        _focus="none"
      />
      <Button width={["100%","40%","35%","25%","15%"]} display="flex" colorScheme="green" onClick={handleSubmit} isLoading={isLoading}>
        Generate Image
      </Button>
      <Box position="relative" display="flex" flexDirection="column" width="100%"  marginTop={4}>
        {isLoading ? (
          <Spinner size="xl" position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" />
        ) : imageUrl ? (
          <>
            <Box
                // display:"flex",
                // backgroundImage: `${imageUrl}`,
                // backgroundSize: 'cover',
                // backgroundPosition: 'center',
                width={["100%","55%","45%","35%","22%"]}
                // height= '400px'
                backgroundColor='red'
            >
              <img style={{width:"100%",}} src={imageUrl} download/>
            </Box>
            <a href={imageUrl} isDownload>
            <Button
              // position="absolute"
              // bottom="1rem"
              // right="1rem"
              // width= '350px'
              width={["100%","40%","35%","25%","15%"]}
              marginTop={4}
              colorScheme="green"
              size="sm"
            >

              View
              <i className="bi bi-file-earmark-arrow-down-fill" ></i>
            </Button>
            </a>
          </>
        ) :null}
      </Box>
    </Box>
  
    </Flex>

    </>
  )
}
