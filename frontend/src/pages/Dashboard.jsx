import React from 'react'
import {
    Flex,
    Image,
    Box,
    Heading,
    Text,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'


export default function Dashboard() {

    const userData = useSelector((data) => {
        return data.reducerAuth
    })



    
    return (
        <>
            <Flex display="flex"  flexDirection={["column","column","column","row"]} paddingTop={["18%","14%","10%","6%"]} align="center" justifyContent="space-evenly" width="1fr" color={userData.color} bg={userData.background}>
                <Box width={["100%","100%","100%","50%"]} display="flex">
                    <Image border="none" width="100%" height="100%" src="https://bkcs.hust.edu.vn/wp-content/uploads/2022/07/Bamboo-SIEM.png" />
                </Box>
                <Box width={["90%","90%","90%","40%"]} textAlign="center" justifyContent="center" padding="5% 0">
                    <Heading >"Exciting Opportunities with AI Projects"</Heading>
                    <Text fontSize='2xl'>AI projects are an exciting and rapidly growing area of technology. They involve developing intelligent systems that can learn, reason, and make decisions on their own. From chatbots and virtual assistants to self-driving cars and advanced medical diagnosis tools, AI projects have the potential to revolutionize many industries and improve our lives in countless ways. As AI technology continues to advance, we can expect to see even more innovative and transformative AI projects in the years to come.</Text>
                </Box>
            </Flex>

            {/* project overview  */}
            <Flex display="flex" flexWrap="wrap" flexDirection="column" align="center" justifyContent="space-evenly" width="1fr" color={userData.color} bg={userData.background} paddingBottom={["11%","9%","7%","5%","2%"]}>
                <Heading padding="5% 0">Project Overview</Heading>
                <Box display="flex" flexDirection={["column","column","row","row","row"]} width="100%" justifyContent="space-around">
                    <Box display="flex" width={["100%","100%","18%","18%","18%"]} flexDirection="column" textAlign="center">
                        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                            <Heading padding="5% 0">Summary</Heading>
                            <Image width="50%" src="https://www.freeiconspng.com/thumbs/summary-png-icon/summary-png-icon-1.png" />
                        </Box>
                        <Box textAlign="center" >
                            <Text >A summary generator AI is an advanced natural language processing (NLP) tool that can analyze and summarize large amounts of text quickly and accurately.</Text>
                        </Box>
                    </Box>
                    <Box display="flex" width={["100%","100%","18%","18%","18%"]} flexDirection="column" textAlign="center">
                        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                            <Heading padding="5% 0">Paragraph</Heading>
                            <Image width="50%" src="https://www.freeiconspng.com/thumbs/summary-png-icon/summary-icon-png-and-since-the-procedure-24.png" />
                        </Box>
                        <Box textAlign="center" >
                            <Text >A paragraph generator AI analyzes a topic and generates coherent and relevant text for various applications, including content creation and customer service.</Text>
                        </Box>
                    </Box>
                    <Box display="flex" width={["100%","100%","18%","18%","18%"]} flexDirection="column" textAlign="center">
                        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                            <Heading padding="5% 0">Chatbot</Heading>
                            <Image width="50%" src="https://cdn3d.iconscout.com/3d/premium/thumb/chat-bot-5379962-4497578.png" />
                        </Box>
                        <Box textAlign="center" >
                            <Text >A chatbot AI is a computer program that can simulate human conversation, providing automated responses to users via text or voice.</Text>
                        </Box>
                    </Box>
                    <Box display="flex" width={["100%","100%","18%","18%","18%"]} flexDirection="column" textAlign="center">
                        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                            <Heading padding="5% 0">Scifi-image</Heading>
                            <Image width="50%" src="https://static.vecteezy.com/system/resources/previews/010/286/349/original/hud-sci-fi-display-interface-design-elements-free-png.png" />
                        </Box>
                        <Box textAlign="center" >
                            <Text >
                                A sci-fi image generator AI uses machine learning to generate realistic and creative images of fictional futuristic environments and objects.</Text>
                        </Box>
                    </Box>
                </Box>
            </Flex>

            
        </>
    )
}
