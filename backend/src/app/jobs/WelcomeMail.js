import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

import { formatPrice } from '../../util/format';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const {
      id,
      name,
      email,
      title,
      duration,
      price,
      start_date,
      end_date,
    } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: `${name}, seja bem-vindo ao GymPoint!`,
      template: 'welcome',
      context: {
        id,
        student: name,
        plan: title,
        duration,
        price: formatPrice(price),
        start_date: format(
          parseISO(start_date),
          "'Início' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
        end_date: format(
          parseISO(end_date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new WelcomeMail();
