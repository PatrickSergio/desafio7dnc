import express from 'express';
import alunoRoute from './module/aluno/aluno.route';

const app = express();
app.use(express.json());
app.use('/aluno', alunoRoute); 

const port = process.env.PORT || 8081;  

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
