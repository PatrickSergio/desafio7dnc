import express, { Request, Response, NextFunction } from 'express';
import alunoModel from './aluno.model';

const router = express.Router();

// Função para formatar CPF no formato XXX.XXX.XXX-XX
function formatCpf(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Função para validar o CPF no formato correto (sem pontos ou hífen)
function isValidCpf(cpf: string): boolean {
  return /^\d{11}$/.test(cpf);
}


router.get('/', async (req: Request<Record<string, string>>, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await alunoModel.getAll();
    res.status(200).json({ data });
  } catch (error) {
    next(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para criar um novo aluno
router.post('/', async (req: Request<Record<string, string>>, res: Response, next: NextFunction): Promise<void> => {
  const { nome, cpf } = req.body;

  // Verificar se o nome e CPF são fornecidos e o CPF tem 11 caracteres
  if (!nome || !cpf || cpf.length !== 11 || !isValidCpf(cpf)) {
    res.status(400).json({ error: 'Dados inválidos' });
    return;
  }

  try {
    
    const existingAluno = await alunoModel.getByCpf(cpf);
    if (existingAluno) {
      res.status(400).json({ error: 'CPF já cadastrado' });
      return;
    }

    const newAluno = await alunoModel.store(req.body);
    res.status(201).json({ data: newAluno }); 
  } catch (error) {
    next(error);
    res.status(500).json({ error: 'Erro ao criar aluno' });
  }
});


router.put('/:id', async (req: Request<Record<string, string>>, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { nome, cpf } = req.body;

  
  if (!id || isNaN(Number(id)) || !nome || !cpf || cpf.length !== 11 || !isValidCpf(cpf)) {
    res.status(400).json({ error: 'Dados inválidos' });
    return;
  }

  try {
    
    const existingAluno = await alunoModel.getByCpf(cpf);
    if (existingAluno && existingAluno.id !== parseInt(id)) {
      res.status(400).json({ error: 'CPF já cadastrado' });
      return;
    }

    const updatedAluno = await alunoModel.update(id, req.body);
    if (!updatedAluno) {
      res.status(404).json({ error: 'Aluno não encontrado' });
      return;
    }

    res.status(200).json({ data: updatedAluno });
  } catch (error) {
    next(error);
    res.status(500).json({ error: 'Erro ao atualizar aluno' });
  }
});


router.delete('/:id', async (req: Request<Record<string, string>>, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  
  if (!id || isNaN(Number(id))) {
    res.status(400).json({ error: 'ID inválido' });
    return;
  }

  try {
    const deleted = await alunoModel.delete(id);
    if (!deleted) {
      res.status(404).json({ error: 'Aluno não encontrado' });
      return;
    }

    res.status(204).send(); 
  } catch (error) {
    next(error);
    res.status(500).json({ error: 'Erro ao deletar aluno' });
  }
});

export default router;
