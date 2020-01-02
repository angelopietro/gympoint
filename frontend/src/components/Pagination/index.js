import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Container } from './styles';

import history from '~/services/history';

export default function Pagination({
  currentPage,
  totalPages,
  totalRecords,
  loading,
  loadItens,
}) {
  const currentPath = history.location.pathname;

  function handlePrev() {
    loadItens(currentPage - 1);
  }

  function handleNext() {
    loadItens(currentPage + 1);
  }

  return (
    <nav>
      {totalPages > 1 && (
        <Container>
          <div>
            <span>
              <Link
                to={currentPath}
                disabled={currentPage === 1 || loading}
                className={currentPage === 1 || loading ? 'disabled' : ''}
                onClick={handlePrev}
              >
                Anterior
              </Link>
            </span>
            <span>
              página {currentPage} de {totalPages}
            </span>
            <span>
              <Link
                to={currentPath}
                disabled={currentPage === totalPages || loading}
                className={
                  currentPage === totalPages || loading ? 'disabled' : ''
                }
                onClick={handleNext}
              >
                Próxima
              </Link>
            </span>
          </div>
        </Container>
      )}
    </nav>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  totalRecords: PropTypes.number,
  loading: PropTypes.bool,
  loadItens: PropTypes.func,
};

Pagination.defaultProps = {
  currentPage: 0,
  totalPages: 0,
  totalRecords: 0,
  loading: false,
  loadItens: '',
};
