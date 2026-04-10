import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Car, DollarSign, AlertTriangle, CheckCircle, XCircle, TrendingUp, FileText, Shield, Gift, Menu, Bell } from 'lucide-react';
import { mockAdminStats, mockDrivers } from '../data/mockData';

interface AdminScreenProps {
  onBack: () => void;
}

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 61000 },
  { month: 'Apr', revenue: 58000 },
  { month: 'May', revenue: 70000 },
  { month: 'Jun', revenue: 82000 },
];

const bookingData = [
  { day: 'Mon', bookings: 234 },
  { day: 'Tue', bookings: 298 },
  { day: 'Wed', bookings: 412 },
  { day: 'Thu', bookings: 389 },
  { day: 'Fri', bookings: 456 },
  { day: 'Sat', bookings: 523 },
  { day: 'Sun', bookings: 398 },
];

const userDistribution = [
  { name: 'Free', value: 65, color: '#3b82f6' },
  { name: 'Premium', value: 25, color: '#f59e0b' },
  { name: 'Drivers', value: 7, color: '#10b981' },
  { name: 'Guides', value: 3, color: '#8b5cf6' },
];

const pendingVerifications = [
  { id: 'v1', name: 'Ahmed Hassan', type: 'Driver', submitted: '2 hours ago', documents: 5 },
  { id: 'v2', name: 'Maria Garcia', type: 'Guide', submitted: '5 hours ago', documents: 4 },
  { id: 'v3', name: 'John Smith', type: 'Driver', submitted: '1 day ago', documents: 5 },
];

export function AdminScreen({ onBack }: AdminScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'users' | 'bookings' | 'verifications'>('overview');

  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: mockAdminStats.totalUsers.toLocaleString(),
      change: '+12.5%',
      positive: true,
      color: 'bg-blue-500',
    },
    {
      icon: Car,
      label: 'Active Drivers',
      value: mockAdminStats.activeDrivers.toLocaleString(),
      change: '+8.3%',
      positive: true,
      color: 'bg-emerald-500',
    },
    {
      icon: DollarSign,
      label: "Today's Revenue",
      value: `$${mockAdminStats.todayRevenue.toLocaleString()}`,
      change: '+23.1%',
      positive: true,
      color: 'bg-amber-500',
    },
    {
      icon: AlertTriangle,
      label: 'Pending Verifications',
      value: mockAdminStats.pendingVerifications.toString(),
      change: '-15%',
      positive: true,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-6 sticky top-0 z-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl">Admin Dashboard</h1>
              <p className="text-blue-200 text-sm">Tourify Management</p>
            </div>
          </div>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center relative">
            <Bell className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
              {mockAdminStats.pendingVerifications}
            </div>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'users', label: 'Users' },
            { id: 'bookings', label: 'Bookings' },
            { id: 'verifications', label: 'Verifications' },
          ].map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                selectedTab === tab.id
                  ? 'bg-white text-blue-900'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {selectedTab === 'overview' && (
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl text-slate-900">{stat.value}</p>
                    <span className={`text-xs ${stat.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Revenue Chart */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-sm mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg text-slate-900 mb-1">Monthly Revenue</h3>
                <p className="text-sm text-slate-500">Last 6 months performance</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Total</p>
                <p className="text-xl text-slate-900">$368K</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e3a8a',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bookings Chart */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-sm mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg text-slate-900 mb-4">Weekly Bookings</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" style={{ fontSize: '12px' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e3a8a',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="bookings" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* User Distribution */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg text-slate-900 mb-4">User Distribution</h3>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="40%" height={150}>
                <PieChart>
                  <Pie
                    data={userDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {userDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {userDistribution.map(item => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-slate-600">{item.name}</span>
                    </div>
                    <span className="text-sm text-slate-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {selectedTab === 'verifications' && (
        <div className="p-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg text-slate-900 mb-1">Pending Verifications</h3>
                <p className="text-sm text-slate-500">{pendingVerifications.length} items require review</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-sm text-amber-600">Urgent</span>
              </div>
            </div>

            <div className="space-y-4">
              {pendingVerifications.map((verification, index) => (
                <motion.div
                  key={verification.id}
                  className="border border-slate-200 rounded-xl p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-slate-900 mb-1">{verification.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs">
                          {verification.type}
                        </span>
                        <span className="text-xs text-slate-500">{verification.submitted}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600">{verification.documents} documents uploaded</span>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      className="flex-1 bg-emerald-500 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                      whileTap={{ scale: 0.95 }}
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                      whileTap={{ scale: 0.95 }}
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </motion.button>
                    <motion.button
                      className="px-4 bg-slate-100 text-slate-700 py-2 rounded-lg text-sm"
                      whileTap={{ scale: 0.95 }}
                    >
                      Review
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-2xl text-slate-900 mb-1">156</p>
              <p className="text-xs text-slate-500">Approved</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-2xl text-slate-900 mb-1">12</p>
              <p className="text-xs text-slate-500">Rejected</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm">
              <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <p className="text-2xl text-slate-900 mb-1">23</p>
              <p className="text-xs text-slate-500">Pending</p>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'users' && (
        <div className="p-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h3 className="text-lg text-slate-900 mb-4">User Analytics</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-blue-700 mb-1">Total Users</p>
                <p className="text-3xl text-blue-900">{mockAdminStats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-blue-600 mt-1">+12.5% this month</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-4">
                <p className="text-sm text-amber-700 mb-1">Premium Users</p>
                <p className="text-3xl text-amber-900">11,308</p>
                <p className="text-xs text-amber-600 mt-1">25% conversion</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">New signups (7 days)</span>
                <span className="text-slate-900">1,234</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Active users (30 days)</span>
                <span className="text-slate-900">34,567</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-sm text-slate-600">Avg. session duration</span>
                <span className="text-slate-900">12m 34s</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-slate-600">User retention (30d)</span>
                <span className="text-emerald-600">87.3%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg text-slate-900 mb-4">Flagged Users</h3>
            <div className="space-y-3">
              {[
                { name: 'User #12345', reason: 'Multiple failed payments', severity: 'medium' },
                { name: 'User #23456', reason: 'Suspicious activity', severity: 'high' },
                { name: 'User #34567', reason: 'Policy violation', severity: 'high' },
              ].map((flagged, index) => (
                <div
                  key={flagged.name}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      flagged.severity === 'high' ? 'bg-red-500' : 'bg-amber-500'
                    }`} />
                    <div>
                      <p className="text-sm text-slate-900">{flagged.name}</p>
                      <p className="text-xs text-slate-500">{flagged.reason}</p>
                    </div>
                  </div>
                  <button className="text-blue-900 text-sm">Review</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'bookings' && (
        <div className="p-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h3 className="text-lg text-slate-900 mb-4">Booking Analytics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-xl p-4">
                <p className="text-sm text-emerald-700 mb-1">Total Bookings</p>
                <p className="text-3xl text-emerald-900">{mockAdminStats.totalBookings.toLocaleString()}</p>
                <p className="text-xs text-emerald-600 mt-1">This month</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4">
                <p className="text-sm text-purple-700 mb-1">Avg. Booking Value</p>
                <p className="text-3xl text-purple-900">$32.50</p>
                <p className="text-xs text-purple-600 mt-1">+5.2% vs last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h3 className="text-lg text-slate-900 mb-4">Recent Bookings</h3>
            <div className="space-y-3">
              {mockDrivers.slice(0, 3).map((driver, index) => (
                <div
                  key={driver.id}
                  className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg"
                >
                  <img
                    src={driver.photo}
                    alt={driver.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">{driver.name}</p>
                    <p className="text-xs text-slate-500">{driver.vehicleModel}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-900">$28.50</p>
                    <p className="text-xs text-emerald-600">Completed</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg text-slate-900 mb-4">Booking Issues</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="text-sm text-red-900">Route deviation reported</p>
                    <p className="text-xs text-red-700">Booking #45234</p>
                  </div>
                </div>
                <button className="text-red-900 text-sm">Investigate</button>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-amber-900">Payment dispute</p>
                    <p className="text-xs text-amber-700">Booking #45189</p>
                  </div>
                </div>
                <button className="text-amber-900 text-sm">Review</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
