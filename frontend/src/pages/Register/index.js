/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import { parseISO, format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { notification } from 'antd';

/* -----STYLES----- */
import colors from '~/styles/colors';
import {
  Container,
  SectionHeader,
  HeaderActions,
  ButtonDelete,
  PageActions,
} from './styles';

/* -----COMPONENTS----- */
import Loading from '~/components/Loading';
import Card from '~/components/Card';
import NoResults from '~/components/NoResults';
import ButtomCustom from '~/components/Buttons/General';
import Pagination from '~/components/Pagination';

/* -----SERVICES----- */
import history from '~/services/history';
import api from '~/services/api';

export default function Register() {
  const [registers, setRegisters] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  async function loadRegisters(page = 1) {
    setLoading(true);
    setCurrentPage(page);

    const response = await api.get('register', {
      params: { page },
    });

    const { docs } = response.data;

    const list = docs.map(result => ({
      ...result,
      iniDate: format(parseISO(result.start_date), "dd 'de' MMMM 'de' yyyy'", {
        locale: pt,
      }),
      endDate: format(parseISO(result.end_date), "dd 'de' MMMM 'de' yyyy'", {
        locale: pt,
      }),
    }));

    const { pages, total } = docs;

    setLoading(false);
    setTotalPages(pages);
    setTotalRecords(total);
    setRegisters(list);
  }

  useEffect(() => {
    loadRegisters();
  }, []);

  async function handleDelete(id, name) {
    if (
      window.confirm(
        `Você realmente deseja excluir a matrícula do aluno ${name}?`
      )
    ) {
      try {
        await api.delete(`register/${id}`);

        notification.success({
          duration: 2,
          message: 'Sucesso!',
          description: 'Martícula excluída com sucesso!',
        });

        loadRegisters(
          registers.length === 1 && currentPage > 1
            ? currentPage - 1
            : currentPage
        );
      } catch (err) {
        notification.error({
          duration: 2,
          message: 'Atenção!',
          description: 'Ocorreu um erro ao tentar excluir a matrícula!',
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Container>
      <SectionHeader>
        <HeaderActions>
          <h2>Gerenciando matrículas</h2>

          <ButtomCustom onClick={() => history.push('/registers/new')}>
            <MdAdd size={20} />
            CADASTRAR
          </ButtomCustom>
        </HeaderActions>
      </SectionHeader>

      <Card>
        <>{isLoading && <Loading color={colors.white} size={36} />}</>

        {!isLoading && registers.length === 0 ? (
          <NoResults />
        ) : (
          <table>
            <thead>
              <tr>
                <td>
                  <h4>ID</h4>
                </td>
                <td>
                  <h4>ALUNO</h4>
                </td>
                <td>
                  <h4>PLANO</h4>
                </td>
                <td>
                  <h4>INÍCIO</h4>
                </td>
                <td>
                  <h4>TÉRMINO</h4>
                </td>
                <td>
                  <h4>ATIVA</h4>
                </td>
                <td />
              </tr>
            </thead>

            <tbody>
              {registers.map(info => (
                <tr key={info.id}>
                  <td>#{info.id}</td>
                  <td>{info.student.name}</td>
                  <td>{info.plan.title}</td>
                  <td>{info.iniDate}</td>
                  <td>{info.endDate}</td>
                  <td>
                    {info.active ? (
                      <MdCheckCircle
                        color={`${colors.statusActive}`}
                        size={18}
                      />
                    ) : (
                      <MdCheckCircle size={18} />
                    )}
                  </td>
                  <td>
                    <div>
                      <Link to={`/registers/edit/${info.id}`}>editar</Link>

                      <ButtonDelete
                        type="button"
                        onClick={() => handleDelete(info.id, info.student.name)}
                      >
                        apagar
                      </ButtonDelete>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      <PageActions>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
          loading={isLoading}
          loadItens={loadRegisters}
        />
      </PageActions>
    </Container>
  );
}
