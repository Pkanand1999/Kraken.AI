import React,{useState,useEffect} from 'react'
import {
    Button,
    FormLabel,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    ModalFooter,
    useDisclosure,
    IconButton,
  } from '@chakra-ui/react'
  import {SunIcon} from '@chakra-ui/icons'
  import { useDispatch } from "react-redux/es/hooks/useDispatch";
  import { ChangeTheme } from '../redux/auth/Action';




function SetTheme() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
const dispatch=useDispatch();
    const [bgcolour, setColour] = useState("")
    const [colour, setColor] = useState("")
   
  
   

    function getColour(e) {
        if (e.target.name === "bg") {
            setColour(e.target.value)
        }
        if (e.target.name === "ft") {
            setColor(e.target.value)
        }
    }

    function setTheme(e) {
        e.preventDefault();
        localStorage.setItem("bgcolour", bgcolour);
        localStorage.setItem("color", colour);
        let bg=  localStorage.getItem('bgcolour')
        let color=  localStorage.getItem('color')
        ChangeTheme(bg,color,dispatch)
        onClose()
    }


    


  return (
    <>
    <Button bg="teal" color="white" onClick={onOpen}>
        <SunIcon />
        </Button>
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent >
        <ModalHeader>Set Your Theme</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={setTheme}>
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Enter your Background Colour</FormLabel>
            <Input  placeholder='Enter your Background Colour' name="bg" onChange={getColour}/>
          </FormControl>
          <FormControl>
            <FormLabel>Enter your Text Colour</FormLabel>
            <Input  placeholder='Enter your Text Colour' name="ft" onChange={getColour}/>
          </FormControl>
        </ModalBody>

        <ModalFooter>
        <Input type="submit" value="Apply" bg="teal" color="white"/>
        </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
    </>
  )
}


export default SetTheme