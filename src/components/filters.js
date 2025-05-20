import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { MONTHS, YEARS } from '../constants/filters';
import { labels } from '../constants/data';

const Filters = React.memo(({ selectedMonth, selectedYear, onMonthChange, onYearChange }) => (
  <FilterWrapper>
    <Select value={selectedMonth} onChange={(e) => onMonthChange(e.target.value)}>
      <option value="">{labels.lastThree}</option>
      {MONTHS.map(({ label, value }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </Select>
    <Select value={selectedYear} onChange={(e) => onYearChange(e.target.value)}>
      {YEARS.map(year => (
        <option key={year} value={year}>{year}</option>
      ))}
    </Select>
  </FilterWrapper>
));

Filters.propTypes = {
  selectedMonth: PropTypes.string,
  selectedYear: PropTypes.string,
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
};

const FilterWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
  padding: 12px;
  background-color: #f1f5f9;
  border: 1px solid #d1d5db;
  border-radius: 8px;
`;

const Select = styled.select`
  padding: 8px 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
  color: #333;
  transition: border-color 0.3s;

  &:hover {
    border-color: #007bff;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

export default Filters;