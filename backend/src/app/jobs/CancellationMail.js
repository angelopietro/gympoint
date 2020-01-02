import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

/* -----UTIL----- */
import { formatPrice } from '../../util/format';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { name, email, title, duration, price, canceled_at } = data;
    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: `Gympoint - Matrícula Cancelada!`,
      template: 'cancelRegister',
      context: {
        student: name,
        plan: title,
        duration,
        price: formatPrice(price),
        canceled_at: format(
          parseISO(canceled_at),
          "dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
