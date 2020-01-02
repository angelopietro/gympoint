import React, { useState, useMemo } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { notification } from 'antd';
import * as Yup from 'yup';

/* -----STYLES----- */
import colors from '~/styles/colors';
import { Container, SectionHeader, InputGroup, Buttons } from './styles';

/* -----COMPONENTS----- */
import Loading from '~/components/Loading';
import Card from '~/components/Card';
import ButtonBack from '~/components/Buttons/General';
import ButtonSave from '~/components/Buttons/Submit';
import Currency from '~/components/Mask/Currency';

/* -----SERVICES----- */
import history from '~/services/history';
import api from '~/services/api';

/* -----UTIL----- */
import { currencyToDatabase } from '~/util/format';

const schema = Yup.object().shape({
  title: Yup.string().required('Por favor, preencha o título'),
  duration: Yup.string().required('Por favor, preencha o tempo de duração'),
  price: Yup.string().required('Por favor, preencha o valor/mês'),
});

export default function New() {
  const [isLoading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState('R$ 0.00');
  const [totalDuration, setTotalDuration] = useState(1);

  const finalPrice = useMemo(() => {
    return totalPrice * totalDuration;
  }, [totalDuration, totalPrice]);

  async function handleSubmit(data) {
    try {
      setLoading(true);

      const { title, duration, price } = data;
      await api.post('plans/', {
        title,
        duration,
        price: currencyToDatabase(price),
      });

      notification.success({
        duration: 2,
        message: 'Sucesso!',
        description: 'Plano cadastrado com sucesso!',
        onClose: () => history.goBack(),
      });
    } catch (error) {
      notification.info({
        duration: 2,
        message: 'Atenção!',
        description: `${error.response.data.error}`,
      });
    }
    setLoading(false);
  }

  function handleDurationChange(newDuration) {
    setTotalDuration(newDuration);
  }

  function handlePriceChange(newPrice) {
    if (totalPrice && totalDuration) setTotalPrice(newPrice);
  }
  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <SectionHeader>
          <h2>Cadastro de planos</h2>

          <Buttons>
            <ButtonBack
              color="secondary"
              type="button"
              onClick={() => {
                history.goBack();
              }}
            >
              <MdKeyboardArrowLeft size={20} /> VOLTAR
            </ButtonBack>
            <ButtonSave>
              {isLoading ? (
                <Loading color={colors.white} size={20} />
              ) : (
                <MdCheck size={20} />
              )}{' '}
              SALVAR
            </ButtonSave>
          </Buttons>
        </SectionHeader>
        <Card>
          <h5>TÍTULO DO PLANO</h5>
          <Input type="text" name="title" />

          <InputGroup>
            <div>
              <h5>DURAÇÃO(em meses)</h5>
              <Input
                type="number"
                name="duration"
                min="1"
                onChange={e => handleDurationChange(e.target.value)}
                autoComplete="off"
              />
            </div>

            <div>
              <h5>PREÇO MENSAL</h5>
              <Currency
                prefix="R$ "
                name="price"
                onChange={(e, raw) => handlePriceChange(raw)}
                autoComplete="off"
              />
            </div>

            <div>
              <h5>PREÇO TOTAL</h5>
              <Currency
                prefix="R$ "
                name="finalPrice"
                value={finalPrice}
                disabled
              />
            </div>
          </InputGroup>
        </Card>
      </Form>
    </Container>
  );
}
