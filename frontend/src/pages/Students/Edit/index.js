import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import { notification } from 'antd';
import * as Yup from 'yup';

import colors from '~/styles/colors';
import {
  FormContainer,
  FormSectionHeader,
  FormInputGroup,
  FormButtons,
} from '../styles';

import Loading from '~/components/Loading';
import Card from '~/components/Card';
import ButtonBack from '~/components/Buttons/General';
import ButtonSave from '~/components/Buttons/Submit';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string().required('Por favor, preencha o nome'),
  email: Yup.string()
    .email('Por favor, preencha um e-mail válido')
    .required('Por favor, preencha o e-mail'),
  age: Yup.number()
    .typeError('A idade deve ser preenchida com um número')
    .min(16, 'Idade mínima deve ser 16 anos')
    .required('Por favor, preencha a idade'),
  weight: Yup.string().required('Por favor, preencha o peso'),
  height: Yup.string().required('Por favor, preencha a altura'),
});

export default function EditStudent() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const [student, setStudent] = useState();

  useEffect(() => {
    if (id) {
      (async function loadStudent() {
        try {
          const response = await api.get(`students/${id}`);

          const info = response.data;

          setStudent(info);
        } catch (err) {
          notification.info({
            duration: 3,
            message: 'Atenção!',
            description:
              'Não foi possível carregar o aluno selecionado. Tente novamente!',
          });
        }
      })();
    }
  }, [id]);

  async function handleSubmit(data) {
    try {
      setIsLoading(true);

      const { name, email, age, weight, height } = data;

      await api.put(`/students/${id}`, {
        id,
        name,
        email,
        age,
        weight,
        height,
      });

      notification.success({
        duration: 2,
        message: 'Sucesso!',
        description: 'Dados  atualizados com sucesso!',
        onClose: () => history.goBack(),
      });
    } catch (error) {
      notification.error({
        duration: 3,
        message: 'Atenção!',
        description: `${error.response.data.error}`,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FormContainer>
      <Form initialData={student} schema={schema} onSubmit={handleSubmit}>
        <FormSectionHeader>
          <h2>Edição de alunos</h2>

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
            <ButtonSave disabled={isLoading}>
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
          <h5>NOME COMPLETO</h5>
          <Input type="text" name="name" autoComplete="off" />

          <h5>ENDEREÇO DE E-MAIL</h5>
          <Input type="text" name="email" autoComplete="off" />

          <FormInputGroup>
            <div>
              <h5>IDADE</h5>
              <Input type="number" name="age" autoComplete="off" />
            </div>

            <div>
              <h5>PESO(em kg)</h5>
              <Input
                type="number"
                name="weight"
                step="0.01"
                autoComplete="off"
              />
            </div>

            <div>
              <h5>ALTURA</h5>
              <Input
                type="number"
                name="height"
                step="0.01"
                autoComplete="off"
              />
            </div>
          </FormInputGroup>
        </Card>
      </Form>
    </FormContainer>
  );
}
