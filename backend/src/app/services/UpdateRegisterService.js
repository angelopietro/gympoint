import { parseISO, addMonths } from 'date-fns';
import Register from '../models/Register';
import Student from '../models/Student';
import Plans from '../models/Plans';

import StudentPlanChangedMail from '../jobs/StudentPlanChangedMail';

import Queue from '../../lib/Queue';

class UpdateRegisterService {
  async run({ id, student_id, plan_id, start_date }) {
    const student = await Student.findByPk(student_id);

    if (!student) {
      throw new Error('Aluno inexistente!');
    }

    const plan = await Plans.findByPk(plan_id);

    if (!plan) {
      throw new Error('This plan was not found');
    }

    const registerExists = await Register.findByPk(id);

    if (!registerExists) {
      throw new Error('Registro inexistente!');
    }

    const startDateFormatted = parseISO(start_date);

    const endDateFormatted = addMonths(parseISO(start_date), plan.duration);

    const finalPrice = plan.price * plan.duration;

    const update = await Register.update(
      {
        student_id,
        plan_id,
        start_date: startDateFormatted,
        end_date: endDateFormatted,
        price: finalPrice,
      },
      {
        where: { id },
      }
    );

    const { title, duration } = await Plans.findOne({
      where: { id: plan.id },
    });

    if (
      plan_id !== registerExists.plan_id ||
      String(startDateFormatted) !== String(registerExists.start_date)
    ) {
      await Queue.add(StudentPlanChangedMail.key, {
        name: student.name,
        email: student.email,
        title,
        duration: duration === 1 ? `${duration} mês` : `${duration} meses`,
        price: finalPrice,
        start_date: startDateFormatted,
        end_date: endDateFormatted,
      });
    }
    return update;
  }
}
export default new UpdateRegisterService();
