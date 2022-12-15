const mongoose = require('mongoose')

const MissingSchema = mongoose.Schema(
  {
    nome:{
      type:String,
      required: true
    },
    idade:{
      type:String,
      required:true,
    },
    endereco:{
      type:String,
      required:true
    },
    telefone:{
      type:String,
      required:true
    },
    data:{
      type:String,
      required: true
    },
    municipio:{
      type: String,
      required:true
    },
    img:{
      type:Array,
      required:true
    }
  },
  { timestamps: true },
)

module.exports = mongoose.model('Missing',MissingSchema)