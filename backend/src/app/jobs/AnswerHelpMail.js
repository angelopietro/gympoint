import Mail from '../../lib/Mail';

class AnswerHelpMail {
  get key() {
    return 'AnswerHelpMail';
  }

  async handle({ data }) {
    const { name, email, response } = data;
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Sua dúvida foi respondida - GymPoint Team',
      template: 'answer',
      context: {
        student: name,
        question: response.question,
        answer: response.answer,
      },
    });
  }
}

export default new AnswerHelpMail();
