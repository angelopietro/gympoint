import { parseISO, addMonths } from 'date-fns';

import Register from '../models/Register';
import Student from '../models/Student';
import Plans from '../models/Plans';

import WelcomeMail from '../jobs/WelcomeMail';

import Queue from '../../lib/Queue';

class CreateRegisterService {
  async run({ student_id, plan_id, start_date }) {
    const student = await Student.findByPk(student_id);

    if (!student) {
      throw new Error('Aluno inexistente!');
    }

    const planExists = await Plans.findByPk(plan_id);

    if (!planExists) {
      throw new Error('Este plano não foi encontrado!');
    }

    const startDateFormatted = parseISO(start_date);

    const endDateFormatted = addMonths(
      parseISO(start_date),
      planExists.duration
    );

    const finalPrice = planExists.price * planExists.duration;

    const register = await Register.create({
      student_id,
      plan_id,
      start_date: startDateFormatted,
      end_date: endDateFormatted,
      price: finalPrice,
    });

    const { title, duration } = await Plans.findOne({
      where: { id: planExists.id },
    });

    await Queue.add(WelcomeMail.key, {
      id: student.id,
      name: student.name,
      email: student.email,
      title,
      duration: duration === 1 ? `${duration} mês` : `${duration} meses`,
      price: finalPrice,
      start_date: startDateFormatted,
      end_date: endDateFormatted,
    });

    return register;
  }
}

export default new CreateRegisterService();
