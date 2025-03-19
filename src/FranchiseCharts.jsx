import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCalendar } from 'react-icons/fi';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

function FranchiseCharts() {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dateFilter, setDateFilter] = useState({
    fromDate: '',
    toDate: new Date().toISOString().split('T')[0]
  });
  const COLORS = {
    blue: ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'],
    purple: ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd'],
    green: ['#059669', '#10b981', '#34d399', '#6ee7b7'],
    orange: ['#ea580c', '#f97316', '#fb923c', '#fdba74'],
  };
  const franchiseInfo = JSON.parse(localStorage.getItem('franchiseInfo'));

  const fetchSalesData = async () => {
    setLoading(true);
    setError('');
    try {
      const url = new URL('http://franchisebackend-production-a6c5.up.railway.app/franchise/salesHistory');
      url.search = new URLSearchParams({
        emailid: franchiseInfo.emailid,
        fromDate: dateFilter.fromDate,
        toDate: dateFilter.toDate
      }).toString();

      console.log('Fetching data from : ' , url.toString());

      const response = await axios.get(url.toString());
      console.log('API Response:', response.data); // Add this for debugging

      if (response.data.success) {
        const transformedData = response.data.data.map(sale => ({
          date: new Date(sale.date).toLocaleDateString(),
          totalSales: Number(sale.todaySales) || 0,
          customersVisited: Number(sale.customers) || 0
        }));
        setSalesData(transformedData);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch sales data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (franchiseInfo?.emailid) {
      fetchSalesData();
    }
  }, [dateFilter.fromDate, dateFilter.toDate]);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate summary statistics
  const summaryStats = salesData.reduce((acc, sale) => ({
    totalSales: acc.totalSales + sale.totalSales,
    totalCustomers: acc.totalCustomers + sale.customersVisited,
    count: acc.count + 1
  }), { totalSales: 0, totalCustomers: 0, count: 0 });

  const averageSales = summaryStats.count ? summaryStats.totalSales / summaryStats.count : 0;
  const averageCustomers = summaryStats.count ? summaryStats.totalCustomers / summaryStats.count : 0;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Sales Analytics</h2>
          <p className="mt-1 text-sm text-gray-600">Visual representation of your sales data</p>
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg shadow">
            <div className="text-sm font-medium text-blue-600">Total Sales</div>
            <div className="mt-1 text-2xl font-bold text-blue-900">
              ₹{summaryStats.totalSales.toLocaleString()}
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg shadow">
            <div className="text-sm font-medium text-green-600">Average Daily Sales</div>
            <div className="mt-1 text-2xl font-bold text-green-900">
              ₹{averageSales.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg shadow">
            <div className="text-sm font-medium text-purple-600">Average Daily Customers</div>
            <div className="mt-1 text-2xl font-bold text-purple-900">
              {averageCustomers.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Trend Line Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="totalSales"
                  stroke={COLORS.blue[0]}
                  strokeWidth={2}
                  dot={{ fill: COLORS.blue[0], strokeWidth: 2 }}
                  name="Sales (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Customer Visits Bar Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Visits</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Legend />
                <Bar
                  dataKey="customersVisited"
                  fill={COLORS.purple[0]}
                  name="Customers"
                  radius={[4, 4, 0, 0]}
                >
                  {salesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.purple[index % 4]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sales vs Customers Comparison */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales vs Customers</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="totalSales" stroke="#2563eb" name="Sales (₹)" />
                <Line yAxisId="right" type="monotone" dataKey="customersVisited" stroke="#7c3aed" name="Customers" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Daily Distribution Pie Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesData}
                  dataKey="totalSales"
                  nameKey="date"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {salesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.orange[index % 4]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '0.5rem' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default FranchiseCharts;