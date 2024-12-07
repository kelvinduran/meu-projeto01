import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbCongig.js';

// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente.
// O resultado da conexão é armazenado na variável 'conexao'.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados.
export async function getTodosPosts() {
  // Seleciona o banco de dados 'imersao-back'.
  const db = conexao.db("imersao-back");
  // Seleciona a coleção 'posts' dentro do banco de dados.
  const colecao = db.collection("posts");
  // Busca todos os documentos da coleção e retorna um array com os resultados.
  return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-back");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost){
  const db = conexao.db("imersao-back"); // Acessa o banco de dados "Imersão-back"
  const colecao = db.collection("posts"); // Acessa a coleção "posts"
  const objID = ObjectId.createFromHexString(id); 

  return colecao.updateOne({_id: new ObjectId(objID)}, {$set: novoPost});

}
