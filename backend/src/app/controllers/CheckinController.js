import { subDays } from 'date-fns';
import Student from '../models/Student';
import Checkins from '../schemas/Checkins';

class CheckinController {
  async index(req, res) {
    const { student_id } = req.params;
    const { page = 1, paginate = 10 } = req.query;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(401).json({ error: 'Aluno não encontrado!' });
    }

    const data = await Checkins.paginate(
      { student_id },
      {
        attributes: ['id', 'student_id', 'createdAt'],
        page,
        limit: paginate,
        sort: { createdAt: -1 },
      }
    );
    return res.json(data);
  }

  async store(req, res) {
    const { student_id } = req.params;
    const studentId = await Student.findByPk(student_id);

    if (!studentId) {
      return res.status(401).json({ error: 'Aluno inexistente!' });
    }

    const daysAgo = subDays(new Date(), 7);
    const counCheckins = await Checkins.countDocuments({
      student_id,
      createdAt: {
        $gt: daysAgo,
        $lt: new Date(),
      },
    });

    if (counCheckins >= 5) {
      return res.status(400).json({
        error: `É permitido realizar somente 5 checkins a cada 7 dias!`,
      });
    }
    await Checkins.create({ student_id });

    return res.json(`Você realizou ${counCheckins + 1} checkins nesta semana!`);
  }
}
export default new CheckinController();
