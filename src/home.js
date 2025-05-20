import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CustomerList from './components/customerList';
import CustomerDetails from './components/customerDetails';
import Filters from './components/filters';
import { fetchTransactions } from './api/fetchData';
import { calculatePoints } from './utils/calculatePoints';
import PaginatedTransactionList from './components/paginatedTransactionList';
import { MONTHS } from './constants/filters';
import logger from './loggers';
import { labels } from './constants/data';

const Home = () => {
    const [transactions, setTransactions] = useState([]);
    const [customerId, setCustomerId] = useState(null);
    const [pointsData, setPointsData] = useState({});
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('2025');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    var filteredTransactions = [];

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await fetchTransactions();
                logger.info('Fetched Transactions',data);
                setTransactions(data);
                const summary = summarizePoints(data);
                setPointsData(summary);
                setLoading(false);
            } catch (err) {
                setError('Error loading transactions');
                setLoading(false);
                logger.error('Unable to fetch Transactions',err);
            }
        };
        loadData();
    }, []);

    const summarizePoints = (data) => {
        const summary = {};
        data.forEach(txn => {
            const { customerId, amount, date } = txn;
            const month = date.substring(5, 7);
            const year = date.substring(0, 4);
            const monthData = MONTHS.filter(e => e.value === month)
            const key = `${monthData[0].label}-${year}`;
            const points = calculatePoints(amount);

            if (!summary[customerId]) {
                summary[customerId] = { monthly: {}, total: 0 };
            }
            if (!summary[customerId].monthly[key]) {
                summary[customerId].monthly[key] = 0;
            }
            summary[customerId].monthly[key] += points;
            summary[customerId].total += points;
        });
        return summary;
    };

    const handleCustomerSelect = (id) => setCustomerId(id);
    const handleMonthChange = (month) => setSelectedMonth(month);
    const handleYearChange = (year) => setSelectedYear(year);

    const isInLast3Months = (dateString) => {
        const transactionDate = new Date(dateString);
        const today = new Date();

        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(today.getMonth() - 3);

        return transactionDate >= threeMonthsAgo && transactionDate <= today;
    };

    if (selectedMonth === "") {
        filteredTransactions = transactions.filter(txn => txn.customerId === customerId && isInLast3Months(txn.date));
    }
    else {
        filteredTransactions = transactions.filter(txn => {
            return (
                txn.customerId === customerId &&
                txn.date.includes(`${selectedYear}-${selectedMonth}`)
            );
        });
    }

    const customerIds = [...new Set(transactions.map(t => t.customerId))];

    if (loading) return <Container>Loading...</Container>;
    if (error) return <Container>{error}</Container>;

    return (
        <Container>
            <Heading>{labels.heading}</Heading>
            <h2>{labels.customers}</h2>
            <CustomerList customers={customerIds} onSelect={handleCustomerSelect} selectedCustomerId={customerId} />
            {customerId && (
                <>
                    <CustomerDetails customerId={customerId} data={pointsData} />
                    <h3>{labels.transaction}</h3>
                    <Filters
                        selectedMonth={selectedMonth}
                        selectedYear={selectedYear}
                        onMonthChange={handleMonthChange}
                        onYearChange={handleYearChange}
                    />
                    <PaginatedTransactionList transactions={filteredTransactions} />
                </>
            )}
        </Container>
    );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Heading = styled.h1`
  color: #2b6cb0; 
  font-size: 2rem;
  text-align: center;
  margin: 20px 0;
`;

export default Home;