const User = require("../model/userModel")
const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.summaryController = async (req, res) => {
  try {
    let user =await req.verification;
    var credit= Number(user.credit)-1
    let newuser= await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { credit: `${credit}` } }
    )
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Summarize this \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};


exports.paragraphController = async (req, res) => {
  try {
    let user =await req.verification;
    var credit= Number(user.credit)-1
    let newuser= await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { credit: `${credit}` } }
    )
    User.updateOne(
      { email: user.email },
      { $set: { credit: user.credit-1 } }
    )
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `write a detail paragraph about \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};


exports.scifiImageController = async (req, res) => {
  try {
    let user =await req.verification;
    var credit= Number(user.credit)-1
    let newuser= await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { credit: `${credit}` } }
    )
    User.updateOne(
      { email: user.email },
      { $set: { credit: user.credit-1 } }
    )
    const { text } = req.body;
    const { data } = await openai.createImage({
      prompt: `generate a scifi image of ${text}`,
      n: 1,
      size: "512x512",
    });
    if (data) {
      if (data.data[0].url) {
        return res.status(200).json(data.data[0].url);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.chatbotController = async (req, res) => {
  try {
    let user =await req.verification;
    var credit= Number(user.credit)-1
    let newuser= await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { credit: `${credit}` } }
    )
    User.updateOne(
      { email: user.email },
      { $set: { credit: user.credit-1 } }
    )
    const { text } = req.body;
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Answer question similar to how kraken .
      Me: 'what is your name?'
      Kraken: 'Kraken is my name'
      Me: ${text}`,
      max_tokens: 300,
      temperature: 0.7,
    });
    if (data) {
      if (data.choices[0].text) {
        return res.status(200).json(data.choices[0].text);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
