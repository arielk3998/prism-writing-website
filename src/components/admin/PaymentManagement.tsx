'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Download,
  Eye,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface PaymentData {
  id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed' | 'canceled';
  customerEmail: string;
  customerName?: string;
  description: string;
  created: number;
  subscriptionId?: string;
  planType?: string;
}

interface PaymentStats {
  totalRevenue: number;
  monthlyRevenue: number;
  totalCustomers: number;
  activeSubscriptions: number;
  conversionRate: number;
  averageOrderValue: number;
}

export default function PaymentManagement() {
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [stats, setStats] = useState<PaymentStats>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    totalCustomers: 0,
    activeSubscriptions: 0,
    conversionRate: 0,
    averageOrderValue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<PaymentData | null>(null);

  useEffect(() => {
    const loadPaymentData = async () => {
      setLoading(true);
      try {
        // Fetch payment data from API
        const response = await fetch('/api/payments');
        if (response.ok) {
          const data = await response.json();
          setPayments(data.payments || []);
          setStats(data.stats || {
            totalRevenue: 0,
            monthlyRevenue: 0,
            totalCustomers: 0,
            activeSubscriptions: 0,
            conversionRate: 0,
            averageOrderValue: 0,
          });
        }
      } catch (error) {
        console.error('Error fetching payment data:', error);
        // Set mock data for demo
        setPayments([
          {
            id: 'pay_demo_001',
            amount: 7999,
            currency: 'usd',
            status: 'succeeded',
            customerEmail: 'client@example.com',
            customerName: 'Demo Client',
            description: 'Professional Plan - Monthly',
            created: Date.now() - 86400000,
            subscriptionId: 'sub_demo_001',
            planType: 'PRO'
          },
          {
            id: 'pay_demo_002',
            amount: 2999,
            currency: 'usd',
            status: 'succeeded',
            customerEmail: 'member@prismwriting.com',
            customerName: 'Demo Member',
            description: 'Basic Plan - Monthly',
            created: Date.now() - 172800000,
            subscriptionId: 'sub_demo_002',
            planType: 'BASIC'
          },
          {
            id: 'pay_demo_003',
            amount: 19999,
            currency: 'usd',
            status: 'pending',
            customerEmail: 'enterprise@bigcorp.com',
            customerName: 'Enterprise Corp',
            description: 'Enterprise Plan - Monthly',
            created: Date.now() - 3600000,
            subscriptionId: 'sub_demo_003',
            planType: 'ENTERPRISE'
          }
        ]);
        setStats({
          totalRevenue: 127845,
          monthlyRevenue: 45670,
          totalCustomers: 127,
          activeSubscriptions: 89,
          conversionRate: 12.5,
          averageOrderValue: 89.99,
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadPaymentData();
  }, []);

  const fetchPaymentData = async () => {
    setLoading(true);
    try {
      // Fetch payment data from API
      const response = await fetch('/api/payments');
      if (response.ok) {
        const data = await response.json();
        setPayments(data.payments || []);
        setStats(data.stats || stats);
      }
    } catch (error) {
      console.error('Error fetching payment data:', error);
      // Set mock data for demo
      setPayments([
        {
          id: 'pay_demo_001',
          amount: 7999,
          currency: 'usd',
          status: 'succeeded',
          customerEmail: 'client@example.com',
          customerName: 'Demo Client',
          description: 'Professional Plan - Monthly',
          created: Date.now() - 86400000,
          subscriptionId: 'sub_demo_001',
          planType: 'PRO'
        },
        {
          id: 'pay_demo_002',
          amount: 2999,
          currency: 'usd',
          status: 'succeeded',
          customerEmail: 'member@prismwriting.com',
          customerName: 'Demo Member',
          description: 'Basic Plan - Monthly',
          created: Date.now() - 172800000,
          subscriptionId: 'sub_demo_002',
          planType: 'BASIC'
        },
        {
          id: 'pay_demo_003',
          amount: 19999,
          currency: 'usd',
          status: 'pending',
          customerEmail: 'enterprise@bigcorp.com',
          customerName: 'Enterprise Corp',
          description: 'Enterprise Plan - Monthly',
          created: Date.now() - 3600000,
          subscriptionId: 'sub_demo_003',
          planType: 'ENTERPRISE'
        }
      ]);
      setStats({
        totalRevenue: 127845,
        monthlyRevenue: 45670,
        totalCustomers: 127,
        activeSubscriptions: 89,
        conversionRate: 12.5,
        averageOrderValue: 89.99,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'succeeded':
        return <CheckCircle className="w-5 h-5 text-safe-success" />;
      case 'pending':
        return <RefreshCw className="w-5 h-5 text-safe-warning animate-spin" />;
      case 'failed':
      case 'canceled':
        return <XCircle className="w-5 h-5 text-safe-error" />;
      default:
        return <AlertCircle className="w-5 h-5 text-safe-muted" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'bg-green-100 text-safe-success dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-safe-warning dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'failed':
      case 'canceled':
        return 'bg-red-100 text-safe-error dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-safe dark:bg-gray-900/20 dark:text-safe-muted';
    }
  };

  const exportPayments = () => {
    const csvContent = [
      ['ID', 'Date', 'Customer', 'Amount', 'Status', 'Description'].join(','),
      ...payments.map(payment => [
        payment.id,
        formatDate(payment.created),
        payment.customerEmail,
        formatCurrency(payment.amount, payment.currency),
        payment.status,
        payment.description
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="w-8 h-8 animate-spin text-safe-accent" />
        <span className="ml-2 text-safe-muted">Loading payment data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-safe-muted">Total Revenue</p>
              <p className="text-2xl font-bold text-safe">
                {formatCurrency(stats.totalRevenue * 100)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-safe-success" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-safe-muted">Monthly Revenue</p>
              <p className="text-2xl font-bold text-safe">
                {formatCurrency(stats.monthlyRevenue * 100)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-safe-accent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-safe-muted">Active Subscriptions</p>
              <p className="text-2xl font-bold text-safe">
                {stats.activeSubscriptions}
              </p>
            </div>
            <Users className="w-8 h-8 text-safe-accent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-safe-muted">Avg Order Value</p>
              <p className="text-2xl font-bold text-safe">
                {formatCurrency(stats.averageOrderValue * 100)}
              </p>
            </div>
            <CreditCard className="w-8 h-8 text-safe-warning" />
          </div>
        </motion.div>
      </div>

      {/* Payments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
      >
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-safe">
              Recent Payments
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={fetchPaymentData}
                className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </button>
              <button
                onClick={exportPayments}
                className="px-3 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center"
              >
                <Download className="w-4 h-4 mr-1" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-safe">
                        {payment.id}
                      </div>
                      <div className="text-sm text-safe-muted">
                        {payment.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-safe">
                        {payment.customerName || 'N/A'}
                      </div>
                      <div className="text-sm text-safe-muted">
                        {payment.customerEmail}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-safe">
                    {formatCurrency(payment.amount, payment.currency)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(payment.status)}
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-safe-muted">
                    {formatDate(payment.created)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-safe-muted">
                    <button
                      onClick={() => setSelectedPayment(payment)}
                      className="text-safe-accent hover:text-safe-accent dark:hover:text-blue-300"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {payments.length === 0 && (
          <div className="text-center py-12">
            <CreditCard className="w-12 h-12 text-safe-muted mx-auto mb-4" />
            <p className="text-safe-muted">No payments found</p>
          </div>
        )}
      </motion.div>

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-safe">
                Payment Details
              </h3>
              <button
                onClick={() => setSelectedPayment(null)}
                className="text-safe-muted hover:text-safe-muted dark:hover:text-safe-muted"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-safe-muted">Payment ID</label>
                <p className="text-sm text-safe font-mono">{selectedPayment.id}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-safe-muted">Amount</label>
                <p className="text-lg font-bold text-safe">
                  {formatCurrency(selectedPayment.amount, selectedPayment.currency)}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-safe-muted">Status</label>
                <div className="flex items-center mt-1">
                  {getStatusIcon(selectedPayment.status)}
                  <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedPayment.status)}`}>
                    {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-safe-muted">Customer</label>
                <p className="text-sm text-safe">{selectedPayment.customerName}</p>
                <p className="text-sm text-safe-muted">{selectedPayment.customerEmail}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-safe-muted">Description</label>
                <p className="text-sm text-safe">{selectedPayment.description}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-safe-muted">Created</label>
                <p className="text-sm text-safe">{formatDate(selectedPayment.created)}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
