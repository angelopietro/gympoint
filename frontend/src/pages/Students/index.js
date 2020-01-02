import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import { MdAdd } from 'react-icons/md';
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
import Search from '~/components/SearchBar';
import ButtomCustom from '~/components/Buttons/General';
import Pagination from '~/components/Pagination';

/* -----SERVICES----- */
import history from '~/services/history';
import api from '~/services/api';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  async function loadStudents(page = 1) {
    try {
      setLoading(true);
      setCurrentPage(page);

      const response = await api.get('/students', {
        params: { search, page },
      });

      const { docs, pages, total } = response.data;

      setStudents(docs);
      setTotalPages(pages);
      setTotalRecords(total);
    } catch (err) {
      setLoading(false);
      notification.error({
        duration: 3,
        message: 'Atenção!',
        description: 'Ocorreu um erro ao tentar carregar os dados!',
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, [search]); // eslint-disable-line

  async function handleSearch(e) {
    setSearch(e.search);
  }

  async function handleDelete(id, name) {
    if (window.confirm(`Você realmente deseja excluir o aluno ${name}?`)) {
      try {
        await api.delete(`students/${id}`);

        notification.success({
          duration: 2,
          message: 'Sucesso!',
          description: 'Aluno excluído com sucesso!',
        });

        loadStudents(
          students.length === 1 && currentPage > 1
            ? currentPage - 1
            : currentPage
        );
      } catch (err) {
        notification.error({
          duration: 2,
          message: 'Atenção!',
          description: 'Ocorreu um erro ao tentar excluir o aluno!',
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Container>
      <SectionHeader>
        <h2>Gerenciando alunos</h2>

        <HeaderActions>
          <ButtomCustom onClick={() => history.push('/students/new')}>
            <MdAdd size={20} />
            CADASTRAR
          </ButtomCustom>

          <Form onSubmit={handleSearch}>
            <Search placeholder="Buscar aluno" disabled={isLoading} />
          </Form>
        </HeaderActions>
      </SectionHeader>

      <Card>
        <>{isLoading && <Loading color={colors.primary} size={36} />}</>

        {!isLoading && totalRecords === 0 ? (
          <NoResults />
        ) : (
          <table>
            <thead>
              <tr>
                <td>
                  <h4>ID</h4>
                </td>
                <td>
                  <h4>NOME</h4>
                </td>
                <td>
                  <h4>E-MAIL</h4>
                </td>
                <td>
                  <h4>IDADE</h4>
                </td>
                <td />
              </tr>
            </thead>

            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>#{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    <div>
                      <Link to={`/students/edit/${student.id}`}>editar</Link>

                      <ButtonDelete
                        type="button"
                        onClick={() => handleDelete(student.id, student.name)}
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
          loadItens={loadStudents}
        />
      </PageActions>
    </Container>
  );
}
