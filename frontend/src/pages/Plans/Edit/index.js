import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import { formatPrice } from '~/util/format';

const schema = Yup.object().shape({
  title: Yup.string().required('Por favor, preencha o título'),
  duration: Yup.string().required('Por favor, preencha a duração'),
  price: Yup.string().required('Por favor, preencha o preço'),
});

export default function Edit() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const [plan, setPlan] = useState([]);

  useEffect(() => {
    async function loadPlan() {
      const response = await api.get(`/plans/${id}`);

      const { duration, price } = response.data;
      const data = {
        ...response.data,
        totalPrice: formatPrice(duration * price),
      };

      setPlan(data);
    }
    loadPlan();
  }, [id]);

  async function handleSubmit(data) {
    try {
      setIsLoading(true);

      const { title, duration, price } = data;

      await api.put(`/plans/${id}`, {
        title,
        duration,
        price,
      });

      notification.success({
        duration: 2,
        message: 'Sucesso!',
        description: 'Dados  atualizados com sucesso!',
        onClose: () => history.goBack(),
      });
    } catch (error) {
      notification.info({
        duration: 3,
        message: 'Atenção!',
        description: 'Erro ao atualizar dados do plano. Tente novamente!',
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleDurationChange(newDuration) {
    setPlan({
      ...plan,
      duration: newDuration,
      totalPrice: plan.price * newDuration,
    });
  }

  function handlePriceChange(newPrice) {
    setPlan({
      ...plan,
      price: newPrice,
      totalPrice: plan.duration * newPrice,
    });
  }

  return (
    <Container>
      <Form initialData={plan} schema={schema} onSubmit={handleSubmit}>
        <SectionHeader>
          <h2>Edição de planos</h2>

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
            <ButtonSave disabled={isLoading}>
              {isLoading ? (
                <Loading color={colors.white} size={20} />
              ) : (
                <MdCheck size={20} />
              )}
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
                value={plan.price}
                onChange={(e, raw) => handlePriceChange(raw)}
                autoComplete="off"
              />
            </div>

            <div>
              <h5>PREÇO TOTAL</h5>
              <Currency
                prefix="R$ "
                name="totalPrice"
                value={plan.totalPrice}
                disabled
              />
            </div>
          </InputGroup>
        </Card>
      </Form>
    </Container>
  );
}
