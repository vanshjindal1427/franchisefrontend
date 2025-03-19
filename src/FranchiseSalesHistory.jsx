import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCalendar } from 'react-icons/fi';

function FranchiseSalesHistory() {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dateFilter, setDateFilter] = useState({
    fromDate: '',
    toDate: new Date().toISOString().split('T')[0]
  });

  const franchiseInfo = JSON.parse(localStorage.getItem('franchiseInfo'));

  const fetchSalesHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const url = new URL('https://franchisebackend-production-a6c5.up.railway.app/franchise/salesHistory');
      url.search = new URLSearchParams({
        emailid: franchiseInfo.emailid,
        fromDate: dateFilter.fromDate,
        toDate: dateFilter.toDate
      }).toString();

      const response = await axios.get(url.toString());
      if (response.data.success) {
        const transformedData = response.data.data.map(sale => ({
          date: sale.date,
          totalSales: Number(sale.todaySales), // If backend uses 'todaySales'
          customersVisited: Number(sale.customers) // If backend uses 'customers'
        }));
        setSalesData(transformedData);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch sales history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesHistory();
  }, []);
  useEffect(() => {
    if (franchiseInfo?.emailid)
      fetchSalesHistory();
  }, [dateFilter.fromDate, dateFilter.toDate]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const summaryStats = salesData.reduce((acc, sale) => {
    return {
      totalSales: acc.totalSales + (Number(sale.totalSales) || 0),
      totalCustomers: acc.totalCustomers + (Number(sale.customersVisited) || 0),
      count: acc.count + 1
    };
  }, { totalSales: 0, totalCustomers: 0, count: 0 });

  const averageSales = summaryStats.count ? summaryStats.totalSales / summaryStats.count : 0;
  const averageCustomers = summaryStats.count ? summaryStats.totalCustomers / summaryStats.count : 0;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sales History</h2>
          <p className="mt-1 text-sm text-gray-600">View your sales records</p>
        </div>

        {/* Date Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="fromDate"
                value={dateFilter.fromDate}
                onChange={handleDateChange}
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                name="toDate"
                value={dateFilter.toDate}
                onChange={handleDateChange}
                className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {/* Sales Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customers Visited
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : salesData.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                    No sales data found
                  </td>
                </tr>
              ) : (
                salesData.map((sale, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sale.date ? new Date(sale.date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{typeof sale.totalSales === 'number' ?
                        sale.totalSales.toLocaleString() :
                        '0'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sale.customersVisited || 0}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
                    {/* Add this after your existing table */}
          {salesData.length > 0 && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-sm font-medium text-gray-500">Total Sales</div>
                  <div className="mt-1 text-xl font-semibold text-gray-900">
                    ₹{summaryStats.totalSales.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-sm font-medium text-gray-500">Average Daily Sales</div>
                  <div className="mt-1 text-xl font-semibold text-gray-900">
                    ₹{averageSales.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-sm font-medium text-gray-500">Average Daily Customers</div>
                  <div className="mt-1 text-xl font-semibold text-gray-900">
                    {averageCustomers.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FranchiseSalesHistory;