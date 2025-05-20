import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { calculatePoints } from '../utils/calculatePoints';
import { labels } from '../constants/data';

const PaginatedTransactionList = React.memo(({ transactions, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const paginated = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!transactions.length) return <NoData>No transactions</NoData>;

  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th>{labels.id}</Th>
            <Th>{labels.date}</Th>
            <Th>{labels.amount}</Th>
            <Th>{labels.points2}</Th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((txn) => (
            <Tr key={txn.transactionId}>
              <Td>{txn.transactionId}</Td>
              <Td>{txn.date}</Td>
              <Td>${txn.amount.toFixed(2)}</Td>
              <Td>{calculatePoints(txn.amount)}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Button onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1}>
        {labels.previous}
        </Button>
        <PageInfo>{labels.page} {currentPage} {labels.of} {totalPages}</PageInfo>
        <Button onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage === totalPages}>
        {labels.next}
        </Button>
      </Pagination>
    </>
  );
});


PaginatedTransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number,
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #eee;
  padding: 10px;
  color: #333;
  background-color: #fafafa;
`;

const Tr = styled.tr`
  &:nth-child(even) ${Td} {
    background-color: #f1f5f9;
  }

  &:hover ${Td} {
    background-color: #e6f0ff;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: 0.95rem;
  color: #333;
`;

const NoData = styled.p`
  text-align: center;
  color: #777;
  margin-top: 20px;
  font-size: 1rem;
`;

export default PaginatedTransactionList;