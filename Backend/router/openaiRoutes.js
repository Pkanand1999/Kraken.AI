const express = require('express');
const { summaryController, paragraphController, chatbotController, scifiImageController } = require('../controller/openaiController');
const authLoginUser = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/summary',authLoginUser, summaryController);
router.post('/paragraph',authLoginUser, paragraphController);
router.post("/chatbot",authLoginUser, chatbotController);
router.post("/scifi-image",authLoginUser, scifiImageController);

module.exports = router;



// https://oaidalleapiprodscus.blob.core.windows.net/private/org-ZLKkYHSW9PEEdKNGvbZYGsJa/user-BOmHjMO6W1C7CGmzEj9nIafZ/img-ygW5hEkUAuj1CyTCBe40dfmU.png?st=2023-05-11T10%3A17%3A59Z&se=2023-05-11T12%3A17%3A59Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-10T23%3A45%3A57Z&ske=2023-05-11T23%3A45%3A57Z&sks=b&skv=2021-08-06&sig=s969UwQufwB0Of3lAsphqQeA0ViZNJ9onfZbOpJUJUA%3D