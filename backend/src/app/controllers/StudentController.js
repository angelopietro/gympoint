import { Op } from 'sequelize';

import Student from '../models/Student';
import Plans from '../models/Plans';
import Register from '../models/Register';

class StudentController {
  // INDEX
  async index(req, res) {
    const { id, student_id } = req.params;
    const { search = '', page = 1, paginate = 10 } = req.query;

    /* validação do Aluno através de acesso Mobile, verificando se ele está
    cadastrado e se já está liberado (registrado/ativo) para poder frequentar a
    academia durante o período exitente de acordo com o plano */
    if (student_id) {
      const data = await Register.findOne({
        attributes: [
          'id',
          'student_id',
          'start_date',
          'end_date',
          'price',
          'active',
          'createdAt',
          'updatedAt',
          'plan_id',
        ],
        where: { student_id },
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['id', 'name', 'email', 'age', 'height', 'weight'],
          },
          {
            model: Plans,
            as: 'plan',
            attributes: ['id', 'title', 'duration', 'price'],
          },
        ],
      });

      return res.json(data);
    }

    /**
     * Filtro de alunos nome recebendo um Query Parameter "?search=Pietro".
     * Caso o parâmetro não seja passado, retorna todos usuários;
     */

    const options = {
      where: {
        name: {
          [Op.like]: search ? `%${search}%` : `%`,
        },
      },
      page,
      paginate,
      order: [['id', 'DESC'], ['name', 'ASC']],
    };

    const data = id
      ? await Student.findByPk(id)
      : await Student.paginate(options);

    if (data === null) {
      return res.status(400).json({ error: 'Aluno não encontrado!' });
    }

    return res.json(data);
  }

  // STORE
  async store(req, res) {
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Este email já existe!' });
    }
    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );
    return res.json({ id, name, email, age, weight, height });
  }

  // UPDATE
  async update(req, res) {
    const { id } = req.params;
    const { email } = req.body;

    const student = await Student.findOne({ where: { id } });

    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res.status(400).json({ error: 'Este email já existe!' });
      }
    }

    const { name, age, weight, height } = await student.update(req.body);
    return res.json({ name, email, age, weight, height });
  }

  // DELETE
  async delete(req, res) {
    const studentId = req.params.id;

    const studentRes = await Student.findOne({ where: { id: studentId } });
    if (!studentRes) {
      return res.status(401).json({ error: 'Aluno não encontrado!' });
    }

    Student.destroy({
      where: { id: studentId },
    });

    return res.status(200).json({
      success: 'Aluno excluído com sucesso!',
    });
  }
}

export default new StudentController();
