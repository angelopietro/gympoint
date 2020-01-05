import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { notification } from 'antd';
import * as Yup from 'yup';

import colors from '~/styles/colors';
import {
  Container,
  SectionHeader,
  ButtonAnswer,
  PageActions,
  CardAnswer,
  AnswerButton,
} from './styles';

import Loading from '~/components/Loading';
import Card from '~/components/Card';
import NoResults from '~/components/NoResults';
import Pagination from '~/components/Pagination';
import MyModal from '~/components/Modal';

import api from '~/services/api';

const schema = Yup.object().shape({
  answer: Yup.string().required('Por favor, preencha a resposta!'),
});

export default function Help() {
  const [isLoading, setLoading] = useState(false);
  const [doubt, setDoubts] = useState([]);
  const [doubtSelected, setDoubtSelected] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  async function loadDoubts(page = 1) {
    try {
      setCurrentPage(page);
      setLoading(true);

      const response = await api.get('/help-orders', {
        params: { page },
      });
      const { docs, pages, total } = response.data;
      const list = docs.map(doubts => ({
        ...doubts,
      }));

      setTotalPages(pages);
      setTotalRecords(total);
      setDoubts(list);
    } catch (err) {
      setLoading(false);
      notification.error({
        duration: 2,
        message: 'Atenção!',
        description: ` Ocorreu um erro ao carregar as informações!`,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDoubts();
  }, []);

  async function answerModal(id) {
    const response = await api.get(`/help-orders/${id}`);

    const { question, student } = response.data;

    setDoubtSelected({ id, question, student: student.name });

    setIsOpen(true);
  }

  async function handleSubmit({ answer }) {
    const { id, student } = doubtSelected;
    try {
      await api.post(`/help-orders/${id}/answer`, { answer });
      loadDoubts(
        doubt.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage
      );
      setIsOpen(false);

      notification.success({
        duration: 3,
        message: 'Sucesso!',
        description: `A dúvida do aluno ${student} foi respondida!`,
      });
    } catch (error) {
      notification.error({
        duration: 3,
        message: 'Atenção!',
        description: `Ocorreu um erro ao gravar as informações!`,
      });
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Container>
      <SectionHeader>
        <h2>Pedidos de auxílio</h2>
      </SectionHeader>

      <Card>
        <>{isLoading && <Loading color={colors.primary} size={36} />}</>
        {totalRecords === 0 ? (
          <NoResults />
        ) : (
          <table>
            <thead>
              <tr>
                <td>
                  <h4>ID</h4>
                </td>
                <td>
                  <h4>DÚVIDA</h4>
                </td>
                <td>
                  <h4>ALUNO</h4>
                </td>
                <td />
              </tr>
            </thead>

            <tbody>
              {doubt.map(doubts => (
                <tr key={doubts.id}>
                  <td>#{doubts.id}</td>
                  <td className="question">{doubts.question}</td>
                  <td>{doubts.student.name}</td>
                  <td>
                    <div className="Acoes">
                      <ButtonAnswer
                        type="button"
                        onClick={() => answerModal(doubts.id)}
                      >
                        responder
                      </ButtonAnswer>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {modalIsOpen && (
        <MyModal isOpen={modalIsOpen} closeModal={closeModal}>
          <CardAnswer>
            <h4>
              PERGUNTA DO ALUNO <span>{doubtSelected.student}</span>
            </h4>
            <p>{doubtSelected.question}</p>
            <Form onSubmit={handleSubmit} schema={schema}>
              <h1>SUA RESPOSTA</h1>
              <Input multiline name="answer" className="textArea" />

              <AnswerButton type="submit" styledType="primary">
                Responder ao aluno
              </AnswerButton>
            </Form>
          </CardAnswer>
        </MyModal>
      )}

      <PageActions>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
          loading={isLoading}
          loadItens={loadDoubts}
        />
      </PageActions>
    </Container>
  );
}
