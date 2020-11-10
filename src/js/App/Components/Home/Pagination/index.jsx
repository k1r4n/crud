import React from 'react';
import PropTypes from 'prop-types';
import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';

const Paginate = ({
  activePage,
  pageCount,
  handlePageChange,
}) => (
  <Pagination size="lg" aria-label="Page navigation example">
    <PaginationItem disabled={activePage === 1}>
      <PaginationLink previous onClick={() => handlePageChange(activePage - 1)} />
    </PaginationItem>

    <PaginationItem disabled={activePage === pageCount}>
      <PaginationLink next onClick={() => handlePageChange(activePage + 1)} />
    </PaginationItem>
  </Pagination>
);

Paginate.propTypes = {
  activePage: PropTypes.number,
  pageCount: PropTypes.number,
  handlePageChange: PropTypes.func,
};

export default Paginate;
