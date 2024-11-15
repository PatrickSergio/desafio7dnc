
import knex from '../../config/knex'; 

class AlunoModel {
  // Método para obter todos os alunos
  async getAll() {
    return await knex('alunos').select('*'); 
  }

  // Método para armazenar um novo aluno
  async store(data: any) {
    const [newAluno] = await knex('alunos').insert(data).returning('*'); 
    return newAluno;  
  }

  // Método para atualizar um aluno existente
  async update(id: string, data: any) {
    const [updated] = await knex('alunos').where({ id }).update(data).returning('*');
    return updated;  
  }

  // Método para deletar um aluno específico
  async delete(id: string) {
    const deleted = await knex('alunos').where({ id }).del();
    return deleted > 0;  
  }

  // Método para obter um aluno pelo CPF
  async getByCpf(cpf: string) {
    return await knex('alunos').where({ cpf }).first();
  }

  // Método para deletar todos os alunos da tabela (limpar a tabela)
  async deleteAll() {
    return await knex('alunos').del(); 
  }
}

export default new AlunoModel();
