import express from "express";
import { listarposts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../../controllers/postsController.js";
import multer from "multer";
import cors from "cors";

const corsOptions = {
  origin : "http://localhost:8000",
  OptionsSuccessStatus: 200
}


// Configura o armazenamento das imagens enviadas pelo formulário.
// As imagens serão salvas na pasta 'uploads/' com o nome original.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do multer com a configuração de armazenamento definida.
// O parâmetro 'single("imagem")' indica que apenas um arquivo de imagem por vez será enviado.
const upload = multer({ dest: "./uploads", storage });

const routes = (app) => {
  // Habilita o parsing de dados JSON no corpo das requisições.
  app.use(express.json());
  app.use(cors(corsOptions));
  // Rota GET para listar todos os posts.
  // Ao acessar a URL '/posts', a função 'listarposts' será executada.
  app.get("/posts", listarposts);

  // Rota POST para criar um novo post.
  // Ao enviar um POST para a URL '/posts', a função 'postarNovoPost' será executada.
  app.post("/posts", postarNovoPost);

  // Rota POST para fazer upload de uma imagem.
  // Ao enviar um POST para a URL '/upload', a função 'uploadImagem' será executada.
  // O parâmetro 'upload.single("imagem")' indica que o arquivo será armazenado usando a configuração do multer.
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost )
};


export default routes;
