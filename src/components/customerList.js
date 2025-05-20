import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import logger from '../loggers'

logger.info('Debug info for loading customers');
const CustomerList = React.memo(({ customers, onSelect, selectedCustomerId }) => (
  <Grid>
    {customers.map((customerId) => (
      <Card
        key={customerId}
        onClick={() => onSelect(customerId)}
        isSelected={customerId === selectedCustomerId}
      >
        {customerId}
      </Card>
    ))}
  </Grid>
));

CustomerList.propTypes = {
  customers: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedCustomerId: PropTypes.string
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); 
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; 
  }
`;

const Card = styled.div`
  padding: 1rem;
  border: 2px solid ${({ isSelected }) => (isSelected ? '#007bff' : '#ccc')};
  background-color: ${({ isSelected }) => (isSelected ? '#e6f0ff' : '#fff')};
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? '#dceeff' : '#f9f9f9')};
    border-color: #007bff;
  }
`;

export default CustomerList;

