import express from 'express'
import routes from './src/config/routes/postsRoutes.js'

// Cria uma instância do Express, que será o núcleo da nossa aplicação.
const app = express()
app.use(express.static("uploads"))
routes(app)

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando estiver pronto.
app.listen(3000, () => {
  console.log('servidor escutando...')
})
