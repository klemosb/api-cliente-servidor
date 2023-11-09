import mongoose from 'mongoose';

const vendasSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    quantidade: { type: Number, required: true }
  },
  {
    versionKey: false,
    collection: 'vendas'
  }
);

const Vendas = mongoose.model('vendas', vendasSchema);

export default Vendas;

