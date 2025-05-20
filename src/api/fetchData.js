
export const fetchTransactions = async () => {
    try {
        const response = await fetch('/transactions.json');
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};