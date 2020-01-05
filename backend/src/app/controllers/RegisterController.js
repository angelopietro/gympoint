import Register from '../models/Register';
import Student from '../models/Student';
import Plans from '../models/Plans';

import CancellationMail from '../jobs/CancellationMail';

import Queue from '../../lib/Queue';

import CreateRegisterService from '../services/CreateRegisterService';
import UpdateRegisterService from '../services/UpdateRegisterService';

class RegisterController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1, paginate = 10 } = req.query;

    const data = id
      ? await Register.findOne({
          where: {
            id: req.params.id,
          },
          attributes: [
            'id',
            'student_id',
            'plan_id',
            'start_date',
            'end_date',
            'price',
            'active',
          ],
          include: [
            {
              model: Student,
              as: 'student',
              attributes: ['id', 'name'],
            },
            {
              model: Plans,
              as: 'plan',
              attributes: ['id', 'title', 'duration', 'price'],
            },
          ],
        })
      : await Register.paginate({
          attributes: [
            'id',
            'student_id',
            'plan_id',
            'start_date',
            'end_date',
            'price',
            'active',
          ],
          order: [['id', 'DESC']],
          page,
          paginate,
          include: [
            {
              model: Student,
              as: 'student',
              attributes: ['id', 'name'],
            },
            {
              model: Plans,
              as: 'plan',
              attributes: ['id', 'title', 'duration', 'price'],
            },
          ],
        });

    if (!data) {
      return res.status(401).json({ message: 'Não há alunos registrados!' });
    }
    return res.json(data);
  }

  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    const register = await CreateRegisterService.run({
      student_id,
      plan_id,
      start_date,
    });
    return res.json(register);
  }

  async update(req, res) {
    const { id } = req.params;
    const { student_id, plan_id, start_date } = req.body;

    const update = await UpdateRegisterService.run({
      id,
      student_id,
      plan_id,
      start_date,
    });
    return res.json(update);
  }

  async delete(req, res) {
    const { id } = req.params;
    const register = await Register.findByPk(id);
    const { student_id, plan_id } = register;

    register.destroy({
      where: { id },
    });

    const { name, email } = await Student.findOne({
      where: { id: student_id },
    });

    const { title, duration, price } = await Plans.findOne({
      where: { id: plan_id },
    });

    await Queue.add(CancellationMail.key, {
      name,
      email,
      title,
      duration: duration === 1 ? `${duration} mês` : `${duration} meses`,
      price,
      canceled_at: new Date(),
    });

    return res.json({ Deleted: true, register });
  }
}

export default new RegisterController();
