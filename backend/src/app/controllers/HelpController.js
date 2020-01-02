import HelpOrders from '../models/HelpOrders';
import Student from '../models/Student';
import Register from '../models/Register';
import AnswerHelpMail from '../jobs/AnswerHelpMail';
import Queue from '../../lib/Queue';

class HelpController {
  // INDEX
  async index(req, res) {
    try {
      const { id, student_id } = req.params;
      const { page = 1, paginate = 10 } = req.query;

      // verifica  a existência student_id (parâmetro responsável em retornar os dados da ajuda do aluno)
      if (student_id) {
        const student = await Student.findByPk(student_id);

        if (!student) {
          return res.status(401).json({ error: 'Aluno não encontrado!' });
        }

        const helpOrder = await HelpOrders.paginate({
          where: { student_id },
          page,
          paginate,
          order: [['created_at', 'DESC']],
          attributes: ['id', 'question', 'answer', 'answer_at', 'created_at'],
        });

        return res.json(helpOrder);
      }

      // verifica  a existência ou não do parâmetro id (parâmetro responsável em retornar os dados da ajuda selecionada)
      const data = id
        ? await HelpOrders.findOne({
            where: { id },
            attributes: ['id', 'student_id', 'question', 'answer', 'answer_at'],
            include: [
              {
                model: Student,
                as: 'student',
                attributes: ['name'],
              },
            ],
          })
        : // lista todas as ajudas que ainda não foram respondidas
          await HelpOrders.paginate({
            attributes: ['id', 'student_id', 'question', 'answer', 'answer_at'],
            page,
            paginate,
            order: [['created_at', 'DESC']],
            where: { answer_at: null },
            include: [
              {
                model: Student,
                as: 'student',
                attributes: ['name'],
              },
            ],
          });

      if (data.length === 0) {
        return res
          .status(400)
          .json({ error: 'Você não tem uma solicitação de ajuda!' });
      }

      return res.json(data);
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'Erro ao listar dados!', messages: error.inner });
    }
  }

  // STORE
  async store(req, res) {
    const { student_id } = req.params;

    const register = await Register.findOne({
      where: { student_id },
    });

    if (!register) {
      return res.status(400).json({ error: 'O Aluno não está registrado!' });
    }

    const { question } = req.body;

    const response = await HelpOrders.create({
      student_id,
      question,
    });

    return res.json({ response });
  }

  // UPDATE
  async update(req, res) {
    const { id } = req.params;

    const helpOrder = await HelpOrders.findOne({
      where: { id },
    });

    if (!helpOrder) {
      return res.status(400).json({ error: `A solicitação ${id} não existe!` });
    }

    const { answer } = req.body;
    const response = await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    const { name, email } = await Student.findOne({
      where: { id: response.student_id },
    });

    await Queue.add(AnswerHelpMail.key, {
      name,
      email,
      response,
      answer_at: new Date(),
    });

    return res.json({ response });
  }
}
export default new HelpController();
