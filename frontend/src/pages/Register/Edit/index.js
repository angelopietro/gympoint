import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { notification } from 'antd';
import { parseISO, addMonths, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import * as Yup from 'yup';

/* -----STYLES----- */
import colors from '~/styles/colors';
import {
  Container,
  SectionHeader,
  InputGroup,
  Column,
  Buttons,
} from './styles';

/* -----COMPONENTS----- */
import Loading from '~/components/Loading';
import Card from '~/components/Card';
import ButtonBack from '~/components/Buttons/General';
import ButtonSave from '~/components/Buttons/Submit';
import DatePicker from '~/components/DatePicker';

/* -----SERVICES----- */
import api from '~/services/api';
import history from '~/services/history';

/* -----UTIL----- */
import { formatPrice } from '~/util/format';

const schema = Yup.object().shape({
  student_id: Yup.string()
    .required('O aluno é obrigatório')
    .typeError('Selecione um aluno'),
  plan_id: Yup.string()
    .required('O plano é obrigatório')
    .typeError('Selecione um plano'),
  start_date: Yup.date()
    .required('Data de início é obrigatória')
    .typeError('Insira uma data'),
});

export default function Edit() {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [register, setRegister] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [totalPrice, setTotalPrice] = useState('R$ 0.00');

  const finalPrice = useMemo(() => {
    return totalPrice;
  }, [totalPrice]);

  async function loadStudents(value) {
    const response = await api.get('students', {
      params: {
        search: value,
      },
    });

    const { docs } = response.data;

    return new Promise(resolve => {
      resolve(docs);
    });
  }

  async function loadPlans() {
    const response = await api.get('/plans');

    const { docs } = response.data;

    const list = docs.map(plan => ({
      ...plan,
      value: plan.id,
      label: plan.title,
    }));

    setPlans(list);
    return list;
  }

  useEffect(() => {
    loadPlans();
    loadStudents();
  }, []);

  useEffect(() => {
    async function loadRegister() {
      try {
        const { data } = await api.get(`/register/${id}`);
        setRegister({
          ...data,
          start_date: parseISO(data.start_date),
          end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
        });

        setCurrentStudent(data.student);
        setCurrentPlan(data.plan);
        setTotalPrice(formatPrice(data.price));
      } catch (error) {
        notification.error({
          duration: 2,
          message: 'Atenção!',
          description: 'Ocorreu um erro ao carregar os dados!',
          onClose: () => history.goBack(),
        });
      }
    }
    loadRegister();
  }, [id]);

  /* Handle para alterar a DATA DE TÉRMINO e VALOR FINAL de acordo com o Plano selecionado */
  function handlePlanChange(newPlan) {
    setLoading(true);

    try {
      setRegister({
        ...register,
        plan: newPlan,
        end_date: register.start_date
          ? format(
              addMonths(register.start_date, newPlan.duration),
              'dd/MM/yyyy'
            )
          : null,
      });
      setTotalPrice(formatPrice(newPlan.price * newPlan.duration));
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  /* Handle para alterar a DATA DE TÉRMINO  de acordo com a nova data */
  function handleStartDateChange(newDate) {
    setRegister({
      ...register,
      start_date: newDate,
      end_date: format(
        addMonths(newDate, register.plan.duration),
        'dd/MM/yyyy'
      ),
    });
  }

  async function handleSubmit() {
    try {
      await schema.validate(
        {
          start_date: register.start_date,
          plan_id: currentPlan.id,
          student_id: currentStudent.id,
        },
        {
          abortEarly: false,
        }
      );
    } catch (err) {
      notification.error({
        duration: 3,
        message: 'Atenção!',
        description: `Ocorreu um erro na validação dos campos!`,
      });
      return;
    } finally {
      setLoading(false);
    }

    try {
      await api.put(`/register/${id}`, {
        start_date: register.start_date,
        plan_id: currentPlan.id,
        student_id: currentStudent.id,
      });

      notification.success({
        duration: 2,
        message: 'Sucesso!',
        description: 'Matrícula editada com sucesso!',
        onClose: () => history.goBack(),
      });
    } catch (error) {
      notification.error({
        duration: 2,
        message: 'Atenção!',
        description: 'Ocorreu um erro ao editar a matrícula!',
        // onClose: () => history.goBack(),
      });
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={register}>
        <SectionHeader>
          <h2>Edição de matrícula</h2>
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
              )}
              SALVAR
            </ButtonSave>
          </Buttons>
        </SectionHeader>
        <Card>
          <h5>ALUNO </h5>
          <AsyncSelect
            name="student_id"
            placeholder="Buscar aluno"
            classNamePrefix="react-select"
            loadOptions={loadStudents}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            onChange={s => setCurrentStudent(s)}
            value={currentStudent}
          />
          <InputGroup>
            <Column>
              <h5>PLANO</h5>
              <Select
                name="plan_id"
                placeholder="Selecione o plano"
                classNamePrefix="react-select"
                options={plans}
                getOptionLabel={option => option.title}
                getOptionValue={option => option.id}
                onChange={e => {
                  setCurrentPlan(e);
                  handlePlanChange(e);
                }}
                value={currentPlan}
                isSearchable={false}
              />
            </Column>

            <Column>
              <h5>DATA DE INÍCIO</h5>
              <DatePicker
                name="start_date"
                selected={register.start_date}
                minDate={Date.now()}
                locale={pt}
                dateFormat="dd/MM/yyyy"
                onChange={handleStartDateChange}
                autoComplete="off"
              />
            </Column>

            <Column>
              <h5>DATA DE TÉRMINO</h5>
              <Input type="text" name="end_date" disabled />
            </Column>

            <Column>
              <h5>VALOR FINAL</h5>
              <Input name="finalPrice" value={finalPrice} disabled />
            </Column>
          </InputGroup>
        </Card>
      </Form>
    </Container>
  );
}
