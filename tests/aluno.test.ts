import request from 'supertest';
import app from '../src/app';
import cpf from 'cpf';  
import knex from '../src/config/knex'; 

describe('Testes da rota Aluno', () => {
  it('Deve criar um novo aluno e garantir que o banco de dados foi atualizado', async () => {
    const newAluno = { nome: 'Novo João', cpf: cpf.generate().replace(/[^\d]/g, '') };  
    const createRes = await request(app).post('/aluno').send(newAluno);

    expect(createRes.status).toBe(201);
    expect(createRes.body.data).toHaveProperty('id');
    expect(createRes.body.data).toHaveProperty('nome', 'Novo João');

    const alunoNoDb = await knex('alunos').where({ cpf: newAluno.cpf }).first();
    expect(alunoNoDb).not.toBeNull();
    expect(alunoNoDb.nome).toBe(newAluno.nome);
  });

  it('Deve retornar 400 para entrada inválida', async () => {
    const invalidAluno = { nome: '', cpf: '123' };
    const res = await request(app).post('/aluno').send(invalidAluno);
    expect(res.status).toBe(400);
  });

  it('Deve retornar 400 quando o nome estiver vazio', async () => {
    const invalidAluno = { nome: '', cpf: `98765432109` };
    const res = await request(app).post('/aluno').send(invalidAluno);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Dados inválidos');
  });

  it('Deve retornar 400 quando o CPF tiver menos de 11 dígitos', async () => {
    const invalidAluno = { nome: 'Teste', cpf: '123' };
    const res = await request(app).post('/aluno').send(invalidAluno);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Dados inválidos');
  });

  it('Deve retornar 400 quando o CPF já estiver cadastrado', async () => {
    const newAluno = { nome: 'Novo João', cpf: `98765432109` };
    await request(app).post('/aluno').send(newAluno);
    const duplicateAluno = { nome: 'João Duplicado', cpf: `98765432109` };
    const res = await request(app).post('/aluno').send(duplicateAluno);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('CPF já cadastrado');
  });

  it('Deve retornar 400 quando o CPF for vazio', async () => {
    const invalidAluno = { nome: 'Teste', cpf: '' };
    const res = await request(app).post('/aluno').send(invalidAluno);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Dados inválidos');
  });

  it('Deve retornar 400 quando o CPF for inválido', async () => {
    const invalidAluno = { nome: 'Teste', cpf: `abc827372359` };
    const res = await request(app).post('/aluno').send(invalidAluno);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Dados inválidos');
  });

  it('Deve retornar 400 quando o ID for inválido na exclusão', async () => {
    const res = await request(app).delete('/aluno/abc');
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('ID inválido');
  });

  it('Deve retornar 404 quando o ID do aluno não existir', async () => {
    const res = await request(app).delete('/aluno/999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Aluno não encontrado');
  });
});

afterAll(async () => {
  await knex.destroy(); 
});
