import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { notification } from 'antd';
import { MdAdd } from 'react-icons/md';

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

/* -----UTIL----- */
import { formatPrice } from '~/util/format';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  async function loadPlans(page = 1) {
    try {
      setLoading(true);
      setCurrentPage(page);

      const response = await api.get('/plans', {
        params: { page },
      });

      const { docs, pages, total } = response.data;

      setPlans(docs);
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
    loadPlans();
  }, []);

  async function handleDelete(id, title) {
    if (window.confirm(`Você realmente deseja excluir o plano ${title}?`)) {
      try {
        await api.delete(`plans/${id}`);

        notification.success({
          duration: 2,
          message: 'Sucesso!',
          description: 'Plano excluído com sucesso!',
        });

        loadPlans(
          plans.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage
        );
      } catch (err) {
        notification.error({
          duration: 2,
          message: 'Atenção!',
          description: 'Ocorreu um erro ao tentar excluir o plano!',
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Container>
      <SectionHeader>
        <h2>Gerenciando planos</h2>

        <HeaderActions>
          <ButtomCustom onClick={() => history.push('/plans/new')}>
            <MdAdd size={20} />
            CADASTRAR
          </ButtomCustom>
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
                  <h4>TÍTULO</h4>
                </td>
                <td>
                  <h4>DURAÇÃO</h4>
                </td>
                <td>
                  <h4>VALOR p/ MÊS</h4>
                </td>
                <td />
              </tr>
            </thead>

            <tbody>
              {plans.map(plan => (
                <tr key={plan.id}>
                  <td>#{plan.id}</td>
                  <td>{plan.title}</td>
                  <td>
                    {plan.duration === 1
                      ? `${plan.duration} mês`
                      : `${plan.duration} meses`}
                  </td>
                  <td>{formatPrice(plan.price)}</td>
                  <td>
                    <div>
                      <Link to={`/plans/edit/${plan.id}`}>editar</Link>

                      <ButtonDelete
                        type="button"
                        onClick={() => handleDelete(plan.id, plan.title)}
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
          loadItens={loadPlans}
        />
      </PageActions>
    </Container>
  );
}
