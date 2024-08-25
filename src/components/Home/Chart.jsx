import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Chart = () =>
{
  const data = [
    { month: 'Jan', orders: 4000, revenue: 2400, expenses: 2400, profit: 2000 },
    { month: 'Feb', orders: 3000, revenue: 1398, expenses: 2210, profit: 1788 },
    { month: 'Mar', orders: 2000, revenue: 9800, expenses: 2290, profit: 7510 },
    { month: 'Apr', orders: 2780, revenue: 3908, expenses: 2000, profit: 1908 },
    { month: 'May', orders: 1890, revenue: 4800, expenses: 2181, profit: 2619 },
    { month: 'Jun', orders: 2390, revenue: 3800, expenses: 2500, profit: 1300 },
    { month: 'Jul', orders: 50000, revenue: 3800, expenses: 2500, profit: 1300 },
    { month: 'Aug', orders: 10, revenue: 4132, expenses: 2500, profit: 1300 },
    { month: 'Sep', orders: 300, revenue: 38450, expenses: 132, profit: 13434 },
    { month: 'Oct', orders: 46287, revenue: 132, expenses: 13432, profit: 1334 },
    { month: 'Nov', orders: 7237, revenue: 38330, expenses: 1345, profit: 234 },
    { month: 'Dec', orders: 2314, revenue: 21343, expenses: 2324, profit: 1322 },
  ];
  return (
    <div className="my-4 border p-3 shadow-md rounded-lg">
      <div className="border-b my-4">
        <p className="tex-xl font-bold">Revenue Overview</p>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="orders" stroke="#8884d8" />
          <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
          <Line type="monotone" dataKey="expenses" stroke="#ff7300" />
          <Line type="monotone" dataKey="profit" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart