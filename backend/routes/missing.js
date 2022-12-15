const Missing = require('../models/Missing');
const router = require('express').Router();


//Cadastra a pessoa desaparecida
router.post('/', async (req, res) => {
  const newMissing = new Missing({
    nome: req.body.nome,
    idade: req.body.idade,
    endereco: req.body.endereco,
    telefone:req.body.telefone,
    data: req.body.data,
    municipio: req.body.municipio,
    img: req.body.img,
  });
  try {
    const savedMissing = await newMissing.save();
    res.status(201).json(savedMissing);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Retorna a primeira imagem de cada pessoa desaparecida
router.get('/find/img', async (req, res) => {
  try {
    const missingImg = await Missing.aggregate([{$addFields:{firstElem:{$first:"$img"}}}])
    const firstImg =[]
    missingImg.forEach((element)=>{
      firstImg.push([element._id,element.firstElem])
    })
    res.status(200).json(firstImg);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Retorna os dados de uma única pessoa
router.get('/find/missing/:id',async (req,res)=>{
  try{
    const missing = await Missing.findById(req.params.id)

    return res.status(200).json(missing)
  }catch(err){
    return res.status(500).json(err)
  }
})

router.get('/find/recognition',async(req,res)=>{
  try {
    const missingImg = await Missing.find()
    const dataMissing = missingImg.map((missing)=>{
      console.log(missing)
      return {'id': missing._id,'nome':missing.nome, 'telefone':missing.telefone, 'img' : missing.img }
    })
    return res.status(200).json(dataMissing);
  } catch (err) {
    return res.status(500).json(err);
  }
})

module.exports = router;
