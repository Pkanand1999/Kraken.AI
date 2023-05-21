import React from 'react'
import { Heading,
Flex,
Text,
Box,

} from '@chakra-ui/react'

export default function Footer() {
  return (
    <>
    <Flex display="flex" flexDirection="column" align="center" justifyContent="space-evenly" width="1fr" color="#b3b1b1" bg="#525050">
                <Heading padding="3% 0">Kraken.AI</Heading>
                <Text width="50%" textAlign="center" fontSize="1.1em">Kraken.AI website generates summary paragraphs, sci-fi images, and chatbot responses, utilizing advanced natural language processing and machine learning algorithms. It provides users with an interactive and creative experience, allowing them to explore various topics and engage with AI-generated content in a unique way. Whether users are seeking information or entertainment, my website offers a dynamic and innovative solution that harnesses the power of AI.</Text>
                <Box display="flex" padding={["11% 0","9% 0","7% 0","5% 0","3% 0"]} fontSize="30px" width={["70%","50%","30%","20%","15%"]} justifyContent="space-between">
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-google-plus"></i>
                    <i className="fa-brands fa-square-instagram"></i>
                    <i className="fa-brands fa-linkedin"></i>
                    <i className="fa-brands fa-square-twitter"></i>
                </Box>
                <Text align="center" width="100%" background="black" color="white"> Copyright © 2023 <Text color="teal" display="inline">Kraken.AI</Text></Text>
            </Flex>
    </>
  )
}
