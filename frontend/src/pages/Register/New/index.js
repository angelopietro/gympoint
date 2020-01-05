import React, { useState, useEffect, useMemo } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import AsyncSelect from 'react-select/async';
import Select from 'react-select';
import { addMonths, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { notification } from 'antd';
import * as Yup from 'yup';

import colors from '~/styles/colors';
import {
  FormContainer,
  FormSectionHeader,
  FormInputGroup,
  FormColumn,
  FormButtons,
} from '../styles';

import Loading from '~/components/Loading';
import Card from '~/components/Card';
import ButtonBack from '~/components/Buttons/General';
import ButtonSave from '~/components/Buttons/Submit';
import DatePicker from '~/components/DatePicker';

import { formatPrice } from '~/util/format';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  student_id: Yup.number()
    .transform(value => (!value ? undefined : value))
    .required('Por favor, selecione um aluno!'),
  plan_id: Yup.string()
    .transform(value => (!value ? undefined : value))
    .required('Por favor, selecione um plano!'),
  start_date: Yup.date().required('Por favor, selecione uma data de início!'),
});

export default function NewRegister() {
  const [plan, setPlans] = useState([]);
  const [totalPrice, setTotalPrice] = useState('R$ 0.00');
  const [desabledDate, setDesabledDate] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [registration, setRegistration] = useState([]);

  const finalPrice = useMemo(() => {
    return totalPrice;
  }, [totalPrice]);

  async function loadStudents(value) {
    const response = await api.get('students/', {
      params: {
        findByName: value,
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

    const list = docs.map(plans => ({
      value: plans.id,
      label: plans.title,
      duration: plans.duration,
      price: plans.price,
    }));

    setPlans(list);
  }

  useEffect(() => {
    loadStudents();
    loadPlans();
  }, []);

  function handleStudentChange(newValue) {
    setRegistration({
      student_id: newValue,
    });
  }

  function handlePlanChange(newPlan) {
    setRegistration({
      ...registration,
      plan_id: newPlan.value,
      duration: newPlan.duration,
      end_date: registration.start_date
        ? format(
            addMonths(registration.start_date, newPlan.duration),
            'dd/MM/yyyy'
          )
        : null,
    });
    setTotalPrice(formatPrice(newPlan.price * newPlan.duration));
    setDesabledDate(false);
  }

  function handleStartDate(newDate) {
    setRegistration({
      ...registration,
      start_date: newDate,
      end_date: format(addMonths(newDate, registration.duration), 'dd/MM/yyyy'),
    });
  }

  async function handleSubmit() {
    try {
      await schema.validate(
        {
          start_date: registration.start_date,
          plan_id: registration.plan_id,
          student_id: registration.student_id,
        },
        {
          abortEarly: false,
        }
      );
    } catch (err) {
      notification.error({
        duration: 3,
        message: 'Atenção!',
        description: 'Todos os campos são obrigatórios!',
      });
      return;
    } finally {
      setLoading(false);
    }

    try {
      setLoading(true);

      const { student_id, plan_id, start_date } = registration;
      await api.post('register/', {
        student_id,
        plan_id,
        start_date,
      });

      notification.success({
        duration: 2,
        message: 'Sucesso!',
        description: 'Aluno cadastrado com sucesso!',
        onClose: () => history.goBack(),
      });
    } catch (error) {
      notification.error({
        duration: 2,
        message: 'Atenção!',
        description: `${error.response.data.error}`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit} initialData={registration}>
        <FormSectionHeader>
          <h2>Cadastro de matrículas</h2>

          <FormButtons>
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
          </FormButtons>
        </FormSectionHeader>
        <Card>
          <h5>ALUNO</h5>

          <AsyncSelect
            name="student_id"
            defaultValue={null}
            placeholder="Buscar aluno"
            classNamePrefix="react-select"
            loadOptions={loadStudents}
            getOptionValue={option => option.id}
            getOptionLabel={option => option.name}
            onChange={s => {
              handleStudentChange(s.id);
            }}
          />
          <FormInputGroup>
            <FormColumn>
              <h5>PLANO</h5>
              <Select
                name="plan_id"
                placeholder="Selecione o plano"
                options={plan}
                getOptionValue={option => option.value}
                getOptionLabel={option => option.label}
                classNamePrefix="react-select"
                onChange={e => {
                  handlePlanChange(e);
                }}
                isSearchable={false}
              />
            </FormColumn>

            <FormColumn>
              <h5>DATA DE INÍCIO</h5>
              <DatePicker
                selected={registration.start_date}
                minDate={Date.now()}
                locale={pt}
                dateFormat="dd/MM/yyyy"
                name="start_date"
                onChange={handleStartDate}
                disabled={desabledDate}
                autoComplete="off"
              />
            </FormColumn>

            <FormColumn>
              <h5>DATA DE TÉRMINO</h5>
              <Input name="end_date" disabled />
            </FormColumn>

            <FormColumn>
              <h5>VALOR FINAL</h5>
              <Input
                type="text"
                name="finalPrice"
                value={finalPrice}
                disabled
              />
            </FormColumn>
          </FormInputGroup>
        </Card>
      </Form>
    </FormContainer>
  );
}
