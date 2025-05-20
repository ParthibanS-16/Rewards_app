import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { labels } from '../constants/data';


const customerDetails = React.memo(({ data, customerId }) => {
  if (!data || !data[customerId]) return null;

  const { monthly, total } = data[customerId];

  return (
    <Card>
      <Title>{labels.custId}{customerId}</Title>
      <PointsList>
        {Object.entries(monthly).map(([month, points]) => (
          <PointsItem key={month}>
            {month} : {points} {labels.points}
          </PointsItem>
        ))}
      </PointsList>
      <Total>{labels.total}{total} {labels.points}</Total>
    </Card>
  );
});

customerDetails.propTypes = {
  data: PropTypes.object.isRequired,
  customerId: PropTypes.string,
};

const Card = styled.div`
  padding: 20px;
  background: #fefefe;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h3`
  color: #007bff;
  margin-bottom: 16px;
`;

const PointsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 16px;
`;

const PointsItem = styled.li`
  padding: 6px 0;
  color: #333;
  font-size: 0.95rem;
  border-bottom: 1px dashed #ccc;
`;

const Total = styled.strong`
  display: block;
  margin-top: 12px;
  font-size: 1.1rem;
  color: #28a745;
`;

export default customerDetails;