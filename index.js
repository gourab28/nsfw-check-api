

const axios = require('axios') //you can use any http client
const tf = require('@tensorflow/tfjs-node')
const nsfw = require('nsfwjs')
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8888;

const defaultUrl = "https://imgur.com/mjU5ML3.png";

const checkNSFW = async(url) => {
  const pic = await axios.get(url, {
    responseType: 'arraybuffer',
  })
  const model = await nsfw.load() // To load a local model, nsfw.load('file://./path/to/model/')
  // Image must be in tf.tensor3d format
  // you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)
  const image = await tf.node.decodeImage(pic.data, 3)
  const predictions = await model.classify(image)
  image.dispose() // Tensor memory must be managed explicitly (it is not sufficient to let a tf.Tensor go out of scope for its memory to be released).
  return predictions
}

app.get('/', (req, res)=>{
  res.json({
    status: 200,
    message: "Your api is working fine!"
  }).status(200)
})

app.get('/check', async(req, res)=> {
  const url = req.query.url;
  try {
    const result = await checkNSFW(url);
    const nsfwProb = result.filter(item=> item.className == "Sexy" || item.className == "Porn")
                        .reduce((acumulator, item)=> acumulator + item.probability * 100, 0)
    const isNsfw = nsfwProb >= 80;
    res.json({
      status: 200,
      nsfw: isNsfw,
      nsfw_probability: `${parseInt(nsfwProb)}%`,
      data: result
    }).status(200)
  } catch (error) {
    res.json({
      status: 500,
      message: "Failed to load url!",
    }).status(500)
  }
})

app.get('/nsfw', async(req, res)=> {
  const url = req.query.url;
  const result = await checkNSFW(url);
  const nsfwProb = result.filter(item=> item.className == "Sexy" || item.className == "Porn")
                      .reduce((acumulator, item)=> acumulator + item.probability * 100, 0)
  const isNsfw = nsfwProb >= 80;
  res.json({
    status: 200,
    nsfw: isNsfw,
    nsfw_probability: `${parseInt(nsfwProb)}%`,
    data: result
  }).status(200)
})

app.post('/check', async(req, res)=> {
  const url = req.body.url;
  const result = await checkNSFW(url);
  const nsfwProb = result.filter(item=> item.className == "Sexy" || item.className == "Porn")
                      .reduce((acumulator, item)=> acumulator + item.probability * 100, 0)
  const isNsfw = nsfwProb >= 80;
  res.json({
    status: 200,
    nsfw: isNsfw,
    nsfw_probability: `${parseInt(nsfwProb)}%`,
    data: result
  }).status(200)
})

app.post('/nsfw', async(req, res)=> {
  const url = req.body.url;
  const result = await checkNSFW(url);
  const nsfwProb = result.filter(item=> item.className == "Sexy" || item.className == "Porn")
                      .reduce((acumulator, item)=> acumulator + item.probability * 100, 0)
  const isNsfw = nsfwProb >= 80;
  res.json({
    status: 200,
    nsfw: isNsfw,
    nsfw_probability: `${parseInt(nsfwProb)}%`,
    data: result
  }).status(200)
})


app.listen(PORT, (err)=> {
  if(!err){
    console.log(`Your app is running on port ${PORT}`);
  }
})
