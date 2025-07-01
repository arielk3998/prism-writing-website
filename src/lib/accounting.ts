// 💰 Accounting & Bookkeeping System
// Phase 4+: Accounting Features

import { prisma } from './database';

export type AccountType = 
  | 'ASSET' 
  | 'LIABILITY' 
  | 'EQUITY' 
  | 'REVENUE' 
  | 'EXPENSE' 
  | 'COST_OF_GOODS_SOLD';

export type AccountCategory = 
  | 'CURRENT_ASSET' 
  | 'FIXED_ASSET' 
  | 'CURRENT_LIABILITY' 
  | 'LONG_TERM_LIABILITY' 
  | 'OWNERS_EQUITY' 
  | 'OPERATING_REVENUE' 
  | 'NON_OPERATING_REVENUE' 
  | 'OPERATING_EXPENSE' 
  | 'NON_OPERATING_EXPENSE' 
  | 'DIRECT_COSTS';

export interface ChartOfAccount {
  id: string;
  accountNumber: string;
  accountName: string;
  accountType: AccountType;
  accountCategory: AccountCategory;
  description?: string;
  isActive: boolean;
  parentAccountId?: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface JournalEntry {
  id: string;
  entryNumber: string;
  date: Date;
  description: string;
  reference?: string;
  totalDebit: number;
  totalCredit: number;
  isPosted: boolean;
  createdBy: string;
  createdAt: Date;
}

export interface LedgerEntry {
  id: string;
  journalEntryId: string;
  accountId: string;
  debitAmount: number;
  creditAmount: number;
  description?: string;
  date: Date;
}

export interface TrialBalance {
  accountId: string;
  accountNumber: string;
  accountName: string;
  accountType: AccountType;
  debitBalance: number;
  creditBalance: number;
}

export interface FinancialStatement {
  balanceSheet: {
    assets: {
      currentAssets: AccountBalance[];
      fixedAssets: AccountBalance[];
      totalAssets: number;
    };
    liabilities: {
      currentLiabilities: AccountBalance[];
      longTermLiabilities: AccountBalance[];
      totalLiabilities: number;
    };
    equity: {
      equityAccounts: AccountBalance[];
      totalEquity: number;
    };
  };
  incomeStatement: {
    revenue: {
      operatingRevenue: AccountBalance[];
      nonOperatingRevenue: AccountBalance[];
      totalRevenue: number;
    };
    expenses: {
      costOfGoodsSold: AccountBalance[];
      operatingExpenses: AccountBalance[];
      nonOperatingExpenses: AccountBalance[];
      totalExpenses: number;
    };
    netIncome: number;
  };
  cashFlowStatement: {
    operatingActivities: number;
    investingActivities: number;
    financingActivities: number;
    netCashFlow: number;
  };
}

interface AccountBalance {
  accountId: string;
  accountNumber: string;
  accountName: string;
  balance: number;
}

class AccountingService {
  // 📋 Default Chart of Accounts for Writing Business
  static getDefaultChartOfAccounts(): Omit<ChartOfAccount, 'id' | 'createdAt' | 'updatedAt'>[] {
    return [
      // ASSETS
      { accountNumber: '1000', accountName: 'Cash - Operating', accountType: 'ASSET', accountCategory: 'CURRENT_ASSET', description: 'Primary business checking account', isActive: true, balance: 0 },
      { accountNumber: '1010', accountName: 'Cash - Savings', accountType: 'ASSET', accountCategory: 'CURRENT_ASSET', description: 'Business savings account', isActive: true, balance: 0 },
      { accountNumber: '1100', accountName: 'Accounts Receivable', accountType: 'ASSET', accountCategory: 'CURRENT_ASSET', description: 'Money owed by clients', isActive: true, balance: 0 },
      { accountNumber: '1200', accountName: 'Prepaid Expenses', accountType: 'ASSET', accountCategory: 'CURRENT_ASSET', description: 'Prepaid insurance, software subscriptions', isActive: true, balance: 0 },
      { accountNumber: '1500', accountName: 'Computer Equipment', accountType: 'ASSET', accountCategory: 'FIXED_ASSET', description: 'Computers, laptops, tablets', isActive: true, balance: 0 },
      { accountNumber: '1510', accountName: 'Office Equipment', accountType: 'ASSET', accountCategory: 'FIXED_ASSET', description: 'Furniture, printers, office supplies', isActive: true, balance: 0 },
      { accountNumber: '1600', accountName: 'Accumulated Depreciation - Equipment', accountType: 'ASSET', accountCategory: 'FIXED_ASSET', description: 'Contra asset account for equipment depreciation', isActive: true, balance: 0 },

      // LIABILITIES
      { accountNumber: '2000', accountName: 'Accounts Payable', accountType: 'LIABILITY', accountCategory: 'CURRENT_LIABILITY', description: 'Money owed to vendors and suppliers', isActive: true, balance: 0 },
      { accountNumber: '2100', accountName: 'Accrued Expenses', accountType: 'LIABILITY', accountCategory: 'CURRENT_LIABILITY', description: 'Expenses incurred but not yet paid', isActive: true, balance: 0 },
      { accountNumber: '2200', accountName: 'Sales Tax Payable', accountType: 'LIABILITY', accountCategory: 'CURRENT_LIABILITY', description: 'Sales tax collected and owed to government', isActive: true, balance: 0 },
      { accountNumber: '2300', accountName: 'Payroll Liabilities', accountType: 'LIABILITY', accountCategory: 'CURRENT_LIABILITY', description: 'Payroll taxes and withholdings', isActive: true, balance: 0 },
      { accountNumber: '2400', accountName: 'Credit Card Payable', accountType: 'LIABILITY', accountCategory: 'CURRENT_LIABILITY', description: 'Business credit card balances', isActive: true, balance: 0 },
      { accountNumber: '2500', accountName: 'Business Loan', accountType: 'LIABILITY', accountCategory: 'LONG_TERM_LIABILITY', description: 'Bank loans and financing', isActive: true, balance: 0 },

      // EQUITY
      { accountNumber: '3000', accountName: 'Owner\'s Equity', accountType: 'EQUITY', accountCategory: 'OWNERS_EQUITY', description: 'Owner\'s investment in the business', isActive: true, balance: 0 },
      { accountNumber: '3100', accountName: 'Retained Earnings', accountType: 'EQUITY', accountCategory: 'OWNERS_EQUITY', description: 'Accumulated profits/losses', isActive: true, balance: 0 },
      { accountNumber: '3200', accountName: 'Owner\'s Draws', accountType: 'EQUITY', accountCategory: 'OWNERS_EQUITY', description: 'Money withdrawn by owner', isActive: true, balance: 0 },

      // REVENUE
      { accountNumber: '4000', accountName: 'Writing Services Revenue', accountType: 'REVENUE', accountCategory: 'OPERATING_REVENUE', description: 'Income from writing projects', isActive: true, balance: 0 },
      { accountNumber: '4100', accountName: 'Consulting Revenue', accountType: 'REVENUE', accountCategory: 'OPERATING_REVENUE', description: 'Income from consulting services', isActive: true, balance: 0 },
      { accountNumber: '4200', accountName: 'Training Revenue', accountType: 'REVENUE', accountCategory: 'OPERATING_REVENUE', description: 'Income from training and workshops', isActive: true, balance: 0 },
      { accountNumber: '4300', accountName: 'Subscription Revenue', accountType: 'REVENUE', accountCategory: 'OPERATING_REVENUE', description: 'Recurring subscription income', isActive: true, balance: 0 },
      { accountNumber: '4900', accountName: 'Other Revenue', accountType: 'REVENUE', accountCategory: 'NON_OPERATING_REVENUE', description: 'Miscellaneous income', isActive: true, balance: 0 },

      // EXPENSES
      { accountNumber: '5000', accountName: 'Subcontractor Costs', accountType: 'COST_OF_GOODS_SOLD', accountCategory: 'DIRECT_COSTS', description: 'Payments to freelance writers', isActive: true, balance: 0 },
      { accountNumber: '5100', accountName: 'Direct Project Costs', accountType: 'COST_OF_GOODS_SOLD', accountCategory: 'DIRECT_COSTS', description: 'Research, materials, project-specific costs', isActive: true, balance: 0 },
      
      { accountNumber: '6000', accountName: 'Software Subscriptions', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Business software and SaaS tools', isActive: true, balance: 0 },
      { accountNumber: '6100', accountName: 'Marketing & Advertising', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Marketing campaigns and advertising', isActive: true, balance: 0 },
      { accountNumber: '6200', accountName: 'Professional Services', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Legal, accounting, professional fees', isActive: true, balance: 0 },
      { accountNumber: '6300', accountName: 'Office Supplies', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'General office supplies and materials', isActive: true, balance: 0 },
      { accountNumber: '6400', accountName: 'Utilities', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Internet, phone, electricity', isActive: true, balance: 0 },
      { accountNumber: '6500', accountName: 'Travel & Entertainment', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Business travel and client entertainment', isActive: true, balance: 0 },
      { accountNumber: '6600', accountName: 'Insurance', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Business insurance premiums', isActive: true, balance: 0 },
      { accountNumber: '6700', accountName: 'Depreciation Expense', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Equipment depreciation', isActive: true, balance: 0 },
      { accountNumber: '6800', accountName: 'Bank Fees', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Banking and transaction fees', isActive: true, balance: 0 },
      { accountNumber: '6900', accountName: 'Miscellaneous Expense', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Other business expenses', isActive: true, balance: 0 },
      
      { accountNumber: '7000', accountName: 'Interest Expense', accountType: 'EXPENSE', accountCategory: 'NON_OPERATING_EXPENSE', description: 'Interest on loans and credit', isActive: true, balance: 0 },
      { accountNumber: '7100', accountName: 'Tax Expense', accountType: 'EXPENSE', accountCategory: 'NON_OPERATING_EXPENSE', description: 'Income tax and other taxes', isActive: true, balance: 0 },
    ];
  }

  // 🏗️ Initialize Chart of Accounts
  async initializeChartOfAccounts(): Promise<void> {
    try {
      // Temporarily disabled for deployment - database models need to be synced
      console.log('Chart of accounts initialization skipped for deployment');
      return;
      
      /* 
      const defaultAccounts = AccountingService.getDefaultChartOfAccounts();
      
      for (const account of defaultAccounts) {
        await prisma.account.upsert({
          where: { accountNumber: account.accountNumber },
          update: {},
          create: account,
        });
      }
      
      console.log('Chart of accounts initialized successfully');
      */
    } catch (error) {
      console.error('Failed to initialize chart of accounts:', error);
      throw error;
    }
  }

  // 📝 Create Journal Entry
  async createJournalEntry(
    description: string,
    entries: { accountId: string; debitAmount: number; creditAmount: number; description?: string }[],
    reference?: string,
    date: Date = new Date(),
    createdBy: string = 'system'
  ): Promise<JournalEntry> {
    try {
      // Validate that debits equal credits
      const totalDebits = entries.reduce((sum, entry) => sum + entry.debitAmount, 0);
      const totalCredits = entries.reduce((sum, entry) => sum + entry.creditAmount, 0);
      
      if (Math.abs(totalDebits - totalCredits) > 0.01) {
        throw new Error('Debits must equal credits in journal entry');
      }

      // Generate entry number
      const entryCount = await prisma.journalEntry.count();
      const entryNumber = `JE${String(entryCount + 1).padStart(6, '0')}`;

      // Create journal entry with ledger entries
      const journalEntry = await prisma.journalEntry.create({
        data: {
          entryNumber,
          date,
          description,
          reference,
          totalDebit: totalDebits,
          totalCredit: totalCredits,
          isPosted: false,
          createdBy,
          ledgerEntries: {
            create: entries.map(entry => ({
              accountId: entry.accountId,
              debitAmount: entry.debitAmount,
              creditAmount: entry.creditAmount,
              description: entry.description,
              date,
            })),
          },
        },
        include: {
          ledgerEntries: true,
        },
      });

      return journalEntry;
    } catch (error) {
      console.error('Failed to create journal entry:', error);
      throw error;
    }
  }

  // ✅ Post Journal Entry
  async postJournalEntry(journalEntryId: string): Promise<void> {
    try {
      const journalEntry = await prisma.journalEntry.findUnique({
        where: { id: journalEntryId },
        include: { ledgerEntries: true },
      });

      if (!journalEntry) {
        throw new Error('Journal entry not found');
      }

      if (journalEntry.isPosted) {
        throw new Error('Journal entry is already posted');
      }

      // Update account balances
      for (const entry of journalEntry.ledgerEntries) {
        const account = await prisma.account.findUnique({
          where: { id: entry.accountId },
        });

        if (!account) {
          throw new Error(`Account not found: ${entry.accountId}`);
        }

        // Calculate new balance based on account type
        let balanceChange = 0;
        if (['ASSET', 'EXPENSE', 'COST_OF_GOODS_SOLD'].includes(account.accountType)) {
          // Normal debit balance accounts
          balanceChange = entry.debitAmount - entry.creditAmount;
        } else {
          // Normal credit balance accounts (LIABILITY, EQUITY, REVENUE)
          balanceChange = entry.creditAmount - entry.debitAmount;
        }

        await prisma.account.update({
          where: { id: entry.accountId },
          data: { balance: account.balance + balanceChange },
        });
      }

      // Mark journal entry as posted
      await prisma.journalEntry.update({
        where: { id: journalEntryId },
        data: { isPosted: true },
      });

      console.log(`Journal entry ${journalEntry.entryNumber} posted successfully`);
    } catch (error) {
      console.error('Failed to post journal entry:', error);
      throw error;
    }
  }

  // 📊 Generate Trial Balance
  async getTrialBalance(asOfDate: Date = new Date()): Promise<TrialBalance[]> {
    try {
      const accounts = await prisma.account.findMany({
        where: { isActive: true },
        orderBy: { accountNumber: 'asc' },
      });

      return accounts.map(account => ({
        accountId: account.id,
        accountNumber: account.accountNumber,
        accountName: account.accountName,
        accountType: account.accountType as AccountType,
        debitBalance: account.balance >= 0 ? account.balance : 0,
        creditBalance: account.balance < 0 ? Math.abs(account.balance) : 0,
      }));
    } catch (error) {
      console.error('Failed to generate trial balance:', error);
      throw error;
    }
  }

  // 📋 Generate Financial Statements
  async getFinancialStatements(asOfDate: Date = new Date()): Promise<FinancialStatement> {
    try {
      const accounts = await prisma.account.findMany({
        where: { isActive: true },
        orderBy: { accountNumber: 'asc' },
      });

      const accountBalances: AccountBalance[] = accounts.map(account => ({
        accountId: account.id,
        accountNumber: account.accountNumber,
        accountName: account.accountName,
        balance: account.balance,
      }));

      // Balance Sheet
      const currentAssets = accountBalances.filter(a => 
        accounts.find(acc => acc.id === a.accountId)?.accountCategory === 'CURRENT_ASSET'
      );
      const fixedAssets = accountBalances.filter(a => 
        accounts.find(acc => acc.id === a.accountId)?.accountCategory === 'FIXED_ASSET'
      );
      const currentLiabilities = accountBalances.filter(a => 
        accounts.find(acc => acc.id === a.accountId)?.accountCategory === 'CURRENT_LIABILITY'
      );
      const longTermLiabilities = accountBalances.filter(a => 
        accounts.find(acc => acc.id === a.accountId)?.accountCategory === 'LONG_TERM_LIABILITY'
      );
      const equityAccounts = accountBalances.filter(a => 
        accounts.find(acc => acc.id === a.accountId)?.accountCategory === 'OWNERS_EQUITY'
      );

      // Income Statement
      const operatingRevenue = accountBalances.filter(a => 
        accounts.find(acc => acc.id === a.accountId)?.accountCategory === 'OPERATING_REVENUE'
      );
      const nonOperatingRevenue = accountBalances.filter(a => 
        accounts.find(acc => acc.id === a.accountId)?.accountCategory === 'NON_OPERATING_REVENUE'
      );
      const costOfGoodsSold = accountBalances.filter(a => 
        accounts.find(acc => acc.id === a.accountId)?.accountCategory === 'DIRECT_COSTS'
      );
      const operatingExpenses = accountBalances.filter(a => 
        accounts.find(acc => acc.id === a.accountId)?.accountCategory === 'OPERATING_EXPENSE'
      );
      const nonOperatingExpenses = accountBalances.filter(a => 
        accounts.find(acc => acc.id === a.accountId)?.accountCategory === 'NON_OPERATING_EXPENSE'
      );

      const totalAssets = [...currentAssets, ...fixedAssets].reduce((sum, a) => sum + a.balance, 0);
      const totalLiabilities = [...currentLiabilities, ...longTermLiabilities].reduce((sum, a) => sum + Math.abs(a.balance), 0);
      const totalEquity = equityAccounts.reduce((sum, a) => sum + Math.abs(a.balance), 0);
      const totalRevenue = [...operatingRevenue, ...nonOperatingRevenue].reduce((sum, a) => sum + Math.abs(a.balance), 0);
      const totalExpenses = [...costOfGoodsSold, ...operatingExpenses, ...nonOperatingExpenses].reduce((sum, a) => sum + a.balance, 0);

      return {
        balanceSheet: {
          assets: {
            currentAssets,
            fixedAssets,
            totalAssets,
          },
          liabilities: {
            currentLiabilities,
            longTermLiabilities,
            totalLiabilities,
          },
          equity: {
            equityAccounts,
            totalEquity,
          },
        },
        incomeStatement: {
          revenue: {
            operatingRevenue,
            nonOperatingRevenue,
            totalRevenue,
          },
          expenses: {
            costOfGoodsSold,
            operatingExpenses,
            nonOperatingExpenses,
            totalExpenses,
          },
          netIncome: totalRevenue - totalExpenses,
        },
        cashFlowStatement: {
          operatingActivities: 0, // Would need cash flow analysis
          investingActivities: 0,
          financingActivities: 0,
          netCashFlow: 0,
        },
      };
    } catch (error) {
      console.error('Failed to generate financial statements:', error);
      throw error;
    }
  }

  // 🔍 Get Account Details
  async getAccountDetails(accountId: string): Promise<any> {
    try {
      const account = await prisma.account.findUnique({
        where: { id: accountId },
        include: {
          ledgerEntries: {
            include: {
              journalEntry: true,
            },
            orderBy: { date: 'desc' },
          },
        },
      });

      if (!account) {
        throw new Error('Account not found');
      }

      return account;
    } catch (error) {
      console.error('Failed to get account details:', error);
      throw error;
    }
  }

  // 📈 Get Account Balance History
  async getAccountBalanceHistory(accountId: string, startDate: Date, endDate: Date): Promise<any[]> {
    try {
      const entries = await prisma.ledgerEntry.findMany({
        where: {
          accountId,
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        include: {
          journalEntry: true,
        },
        orderBy: { date: 'asc' },
      });

      let runningBalance = 0;
      return entries.map(entry => {
        const account = prisma.account.findUnique({ where: { id: accountId } });
        // Simplified balance calculation
        runningBalance += entry.debitAmount - entry.creditAmount;
        
        return {
          date: entry.date,
          description: entry.description || entry.journalEntry.description,
          debit: entry.debitAmount,
          credit: entry.creditAmount,
          balance: runningBalance,
        };
      });
    } catch (error) {
      console.error('Failed to get account balance history:', error);
      throw error;
    }
  }

  // 📋 Get Chart of Accounts
  async getChartOfAccounts(): Promise<ChartOfAccount[]> {
    try {
      const accounts = await prisma.account.findMany({
        orderBy: { accountNumber: 'asc' },
      });
      return accounts as ChartOfAccount[];
    } catch (error) {
      console.error('Failed to get chart of accounts:', error);
      throw error;
    }
  }

  // 📊 Get Journal Entries
  async getJournalEntries(limit = 50): Promise<JournalEntry[]> {
    try {
      const entries = await prisma.journalEntry.findMany({
        include: {
          ledgerEntries: {
            include: {
              account: true,
            },
          },
          creator: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });
      return entries as any[];
    } catch (error) {
      console.error('Failed to get journal entries:', error);
      throw error;
    }
  }

  // 📊 Get Dashboard Data
  async getDashboardData(): Promise<any> {
    try {
      const accounts = await this.getChartOfAccounts();
      const recentEntries = await this.getJournalEntries(10);
      const trialBalance = await this.getTrialBalance();
      const statements = await this.getFinancialStatements();

      return {
        totalAccounts: accounts.length,
        activeAccounts: accounts.filter(a => a.isActive).length,
        recentEntries,
        trialBalance: trialBalance.slice(0, 10),
        quickStats: {
          totalAssets: statements.balanceSheet.assets.totalAssets,
          totalLiabilities: statements.balanceSheet.liabilities.totalLiabilities,
          totalEquity: statements.balanceSheet.equity.totalEquity,
          netIncome: statements.incomeStatement.netIncome,
        },
      };
    } catch (error) {
      console.error('Failed to get dashboard data:', error);
      throw error;
    }
  }

  // 🆕 Create Account
  async createAccount(accountData: Omit<ChartOfAccount, 'id' | 'createdAt' | 'updatedAt'>): Promise<ChartOfAccount> {
    try {
      const account = await prisma.account.create({
        data: accountData,
      });
      return account as ChartOfAccount;
    } catch (error) {
      console.error('Failed to create account:', error);
      throw error;
    }
  }

  // ✏️ Update Account
  async updateAccount(accountId: string, accountData: Partial<ChartOfAccount>): Promise<ChartOfAccount> {
    try {
      const account = await prisma.account.update({
        where: { id: accountId },
        data: accountData,
      });
      return account as ChartOfAccount;
    } catch (error) {
      console.error('Failed to update account:', error);
      throw error;
    }
  }

  // 🗑️ Delete Account
  async deleteAccount(accountId: string): Promise<void> {
    try {
      // Check if account has any ledger entries
      const entryCount = await prisma.ledgerEntry.count({
        where: { accountId },
      });

      if (entryCount > 0) {
        throw new Error('Cannot delete account with existing transactions');
      }

      await prisma.account.delete({
        where: { id: accountId },
      });
    } catch (error) {
      console.error('Failed to delete account:', error);
      throw error;
    }
  }

  // 🗑️ Delete Journal Entry
  async deleteJournalEntry(journalEntryId: string): Promise<void> {
    try {
      const journalEntry = await prisma.journalEntry.findUnique({
        where: { id: journalEntryId },
      });

      if (!journalEntry) {
        throw new Error('Journal entry not found');
      }

      if (journalEntry.isPosted) {
        throw new Error('Cannot delete posted journal entry');
      }

      await prisma.journalEntry.delete({
        where: { id: journalEntryId },
      });
    } catch (error) {
      console.error('Failed to delete journal entry:', error);
      throw error;
    }
  }

  // 🧾 Create Invoice
  async createInvoice(invoiceData: any, createdBy: string): Promise<any> {
    try {
      const invoiceCount = await prisma.invoice.count();
      const invoiceNumber = `INV${String(invoiceCount + 1).padStart(6, '0')}`;

      const invoice = await prisma.invoice.create({
        data: {
          ...invoiceData,
          invoiceNumber,
          createdBy,
          invoiceItems: {
            create: invoiceData.items || [],
          },
        },
        include: {
          invoiceItems: true,
        },
      });

      return invoice;
    } catch (error) {
      console.error('Failed to create invoice:', error);
      throw error;
    }
  }

  // ✏️ Update Invoice
  async updateInvoice(invoiceId: string, invoiceData: any): Promise<any> {
    try {
      const invoice = await prisma.invoice.update({
        where: { id: invoiceId },
        data: invoiceData,
        include: {
          invoiceItems: true,
        },
      });
      return invoice;
    } catch (error) {
      console.error('Failed to update invoice:', error);
      throw error;
    }
  }

  // 💸 Record Expense
  async recordExpense(expenseData: any, createdBy: string): Promise<any> {
    try {
      const expenseCount = await prisma.expense.count();
      const expenseNumber = `EXP${String(expenseCount + 1).padStart(6, '0')}`;

      const expense = await prisma.expense.create({
        data: {
          ...expenseData,
          expenseNumber,
          createdBy,
        },
      });

      // Create corresponding journal entry
      await this.createJournalEntry(
        `Expense: ${expenseData.description}`,
        [
          {
            accountId: expenseData.accountId,
            debitAmount: expenseData.amount,
            creditAmount: 0,
            description: expenseData.description,
          },
          {
            accountId: await this.getCashAccountId(),
            debitAmount: 0,
            creditAmount: expenseData.amount,
            description: 'Cash payment',
          },
        ],
        expense.expenseNumber,
        expenseData.date,
        createdBy
      );

      return expense;
    } catch (error) {
      console.error('Failed to record expense:', error);
      throw error;
    }
  }

  // 💰 Record Payment
  async recordPayment(paymentData: any, createdBy: string): Promise<any> {
    try {
      const payment = await prisma.payment.create({
        data: {
          ...paymentData,
          createdBy,
        },
      });

      // Create corresponding journal entry
      await this.createJournalEntry(
        `Payment received: ${paymentData.description || 'Customer payment'}`,
        [
          {
            accountId: await this.getCashAccountId(),
            debitAmount: paymentData.amount,
            creditAmount: 0,
            description: 'Cash received',
          },
          {
            accountId: paymentData.accountId || await this.getRevenueAccountId(),
            debitAmount: 0,
            creditAmount: paymentData.amount,
            description: paymentData.description || 'Revenue',
          },
        ],
        payment.id,
        paymentData.date || new Date(),
        createdBy
      );

      return payment;
    } catch (error) {
      console.error('Failed to record payment:', error);
      throw error;
    }
  }

  // Get general ledger entries with filters
  async getGeneralLedger(
    accountId?: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<any[]> {
    try {
      const where: any = {};
      
      if (accountId) {
        where.accountId = accountId;
      }
      
      if (startDate || endDate) {
        where.date = {};
        if (startDate) where.date.gte = startDate;
        if (endDate) where.date.lte = endDate;
      }

      const ledgerEntries = await prisma.ledgerEntry.findMany({
        where,
        include: {
          account: true,
          journalEntry: true
        },
        orderBy: [
          { date: 'desc' },
          { account: { accountNumber: 'asc' } }
        ]
      });

      return ledgerEntries.map(entry => ({
        id: entry.id,
        date: entry.date.toISOString(),
        accountName: entry.account.accountName,
        accountNumber: entry.account.accountNumber,
        description: entry.description || entry.journalEntry.description,
        reference: entry.journalEntry.reference,
        debitAmount: entry.debitAmount,
        creditAmount: entry.creditAmount,
        journalEntryId: entry.journalEntryId,
        entryNumber: entry.journalEntry.entryNumber,
        isPosted: entry.journalEntry.isPosted
      }));
    } catch (error) {
      console.error('Error fetching general ledger:', error);
      throw new Error('Failed to fetch general ledger');
    }
  }

  // Get journal entries
  async getJournalEntriesDetailed(): Promise<any[]> {
    try {
      const entries = await prisma.journalEntry.findMany({
        include: {
          creator: true,
          ledgerEntries: {
            include: { account: true }
          }
        },
        orderBy: { date: 'desc' }
      });

      return entries.map(entry => ({
        id: entry.id,
        entryNumber: entry.entryNumber,
        date: entry.date.toISOString(),
        description: entry.description,
        reference: entry.reference,
        totalDebit: entry.totalDebit,
        totalCredit: entry.totalCredit,
        isPosted: entry.isPosted,
        createdBy: entry.createdBy,
        createdAt: entry.createdAt.toISOString(),
        entries: entry.ledgerEntries.map(ledgerEntry => ({
          accountId: ledgerEntry.accountId,
          accountName: ledgerEntry.account.accountName,
          accountNumber: ledgerEntry.account.accountNumber,
          debitAmount: ledgerEntry.debitAmount,
          creditAmount: ledgerEntry.creditAmount,
          description: ledgerEntry.description
        }))
      }));
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      throw new Error('Failed to fetch journal entries');
    }
  }

  // Create journal entry (enhanced version)
  async createJournalEntryDetailed(data: {
    entryNumber: string;
    date: string;
    description: string;
    reference?: string;
    totalDebit: number;
    totalCredit: number;
    isPosted: boolean;
    createdBy: string;
    lines: Array<{
      accountId: string;
      debitAmount: number;
      creditAmount: number;
      description?: string;
    }>;
  }): Promise<any> {
    try {
      // Validate that debits equal credits
      if (Math.abs(data.totalDebit - data.totalCredit) > 0.01) {
        throw new Error('Journal entry must be balanced');
      }

      const result = await prisma.$transaction(async (tx) => {
        // Create journal entry
        const journalEntry = await tx.journalEntry.create({
          data: {
            entryNumber: data.entryNumber,
            date: new Date(data.date),
            description: data.description,
            reference: data.reference,
            totalDebit: data.totalDebit,
            totalCredit: data.totalCredit,
            isPosted: data.isPosted,
            createdBy: data.createdBy
          }
        });

        // Create ledger entries
        const ledgerEntries = await Promise.all(
          data.lines.map(line => 
            tx.ledgerEntry.create({
              data: {
                journalEntryId: journalEntry.id,
                accountId: line.accountId,
                debitAmount: line.debitAmount,
                creditAmount: line.creditAmount,
                description: line.description,
                date: new Date(data.date)
              }
            })
          )
        );

        // Update account balances if posted
        if (data.isPosted) {
          for (const line of data.lines) {
            const account = await tx.account.findUnique({
              where: { id: line.accountId }
            });
            
            if (account) {
              let balanceChange = 0;
              
              // Determine balance change based on account type
              if (['ASSET', 'EXPENSE', 'COST_OF_GOODS_SOLD'].includes(account.accountType)) {
                balanceChange = line.debitAmount - line.creditAmount;
              } else {
                balanceChange = line.creditAmount - line.debitAmount;
              }
              
              await tx.account.update({
                where: { id: line.accountId },
                data: { balance: { increment: balanceChange } }
              });
            }
          }
        }

        return { journalEntry, ledgerEntries };
      });

      return result.journalEntry;
    } catch (error) {
      console.error('Error creating journal entry:', error);
      throw new Error('Failed to create journal entry');
    }
  }

  // Get next entry number
  async getNextEntryNumber(): Promise<string> {
    try {
      const lastEntry = await prisma.journalEntry.findFirst({
        orderBy: { entryNumber: 'desc' },
        select: { entryNumber: true }
      });

      const year = new Date().getFullYear();
      let nextNumber = 1;

      if (lastEntry && lastEntry.entryNumber.includes(year.toString())) {
        const match = lastEntry.entryNumber.match(/(\d+)$/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }

      return `JE-${year}-${nextNumber.toString().padStart(3, '0')}`;
    } catch (error) {
      console.error('Error generating entry number:', error);
      throw new Error('Failed to generate entry number');
    }
  }

  // Get dashboard summary
  async getDashboardSummary(): Promise<any> {
    try {
      const accounts = await prisma.account.findMany({
        where: { isActive: true }
      });

      const journalEntriesCount = await prisma.journalEntry.count();
      
      const currentMonth = new Date();
      currentMonth.setDate(1);
      currentMonth.setHours(0, 0, 0, 0);
      
      const nextMonth = new Date(currentMonth);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      const monthlyEntries = await prisma.ledgerEntry.findMany({
        where: {
          date: {
            gte: currentMonth,
            lt: nextMonth
          },
          journalEntry: { isPosted: true }
        },
        include: { account: true }
      });

      let totalAssets = 0;
      let totalLiabilities = 0;
      let totalEquity = 0;
      let monthlyRevenue = 0;
      let monthlyExpenses = 0;

      // Calculate totals from account balances
      accounts.forEach(account => {
        switch (account.accountType) {
          case 'ASSET':
            totalAssets += account.balance;
            break;
          case 'LIABILITY':
            totalLiabilities += account.balance;
            break;
          case 'EQUITY':
            totalEquity += account.balance;
            break;
        }
      });

      // Calculate monthly totals
      monthlyEntries.forEach(entry => {
        switch (entry.account.accountType) {
          case 'REVENUE':
            monthlyRevenue += entry.creditAmount - entry.debitAmount;
            break;
          case 'EXPENSE':
          case 'COST_OF_GOODS_SOLD':
            monthlyExpenses += entry.debitAmount - entry.creditAmount;
            break;
        }
      });

      const netIncome = monthlyRevenue - monthlyExpenses;

      return {
        totalAssets,
        totalLiabilities,
        totalEquity,
        monthlyRevenue,
        monthlyExpenses,
        netIncome,
        accountsCount: accounts.length,
        journalEntriesCount,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
      throw new Error('Failed to fetch dashboard summary');
    }
  }

  // Create default chart of accounts
  async createDefaultAccounts(): Promise<any[]> {
    try {
      const defaultAccounts = [
        // Assets
        { accountNumber: '1000', accountName: 'Cash and Cash Equivalents', accountType: 'ASSET', accountCategory: 'CURRENT_ASSET', description: 'Checking accounts, savings accounts, and petty cash' },
        { accountNumber: '1100', accountName: 'Accounts Receivable', accountType: 'ASSET', accountCategory: 'CURRENT_ASSET', description: 'Money owed by customers' },
        { accountNumber: '1200', accountName: 'Inventory', accountType: 'ASSET', accountCategory: 'CURRENT_ASSET', description: 'Products held for sale' },
        { accountNumber: '1300', accountName: 'Prepaid Expenses', accountType: 'ASSET', accountCategory: 'CURRENT_ASSET', description: 'Expenses paid in advance' },
        { accountNumber: '1500', accountName: 'Office Equipment', accountType: 'ASSET', accountCategory: 'FIXED_ASSET', description: 'Computers, furniture, and office equipment' },
        { accountNumber: '1600', accountName: 'Accumulated Depreciation - Equipment', accountType: 'ASSET', accountCategory: 'FIXED_ASSET', description: 'Contra asset account for equipment depreciation' },
        
        // Liabilities
        { accountNumber: '2000', accountName: 'Accounts Payable', accountType: 'LIABILITY', accountCategory: 'CURRENT_LIABILITY', description: 'Money owed to suppliers' },
        { accountNumber: '2100', accountName: 'Accrued Expenses', accountType: 'LIABILITY', accountCategory: 'CURRENT_LIABILITY', description: 'Expenses incurred but not yet paid' },
        { accountNumber: '2200', accountName: 'Income Tax Payable', accountType: 'LIABILITY', accountCategory: 'CURRENT_LIABILITY', description: 'Income taxes owed' },
        { accountNumber: '2300', accountName: 'Sales Tax Payable', accountType: 'LIABILITY', accountCategory: 'CURRENT_LIABILITY', description: 'Sales taxes collected and owed' },
        { accountNumber: '2500', accountName: 'Long-term Debt', accountType: 'LIABILITY', accountCategory: 'LONG_TERM_LIABILITY', description: 'Loans and mortgages' },
        
        // Equity
        { accountNumber: '3000', accountName: 'Owner\'s Capital', accountType: 'EQUITY', accountCategory: 'OWNERS_EQUITY', description: 'Owner\'s investment in the business' },
        { accountNumber: '3100', accountName: 'Retained Earnings', accountType: 'EQUITY', accountCategory: 'OWNERS_EQUITY', description: 'Accumulated profits retained in the business' },
        { accountNumber: '3200', accountName: 'Owner\'s Draws', accountType: 'EQUITY', accountCategory: 'OWNERS_EQUITY', description: 'Owner withdrawals from the business' },
        
        // Revenue
        { accountNumber: '4000', accountName: 'Service Revenue', accountType: 'REVENUE', accountCategory: 'OPERATING_REVENUE', description: 'Income from primary business activities' },
        { accountNumber: '4100', accountName: 'Product Sales', accountType: 'REVENUE', accountCategory: 'OPERATING_REVENUE', description: 'Income from product sales' },
        { accountNumber: '4900', accountName: 'Other Income', accountType: 'REVENUE', accountCategory: 'NON_OPERATING_REVENUE', description: 'Interest, dividends, and other non-operating income' },
        
        // Expenses
        { accountNumber: '5000', accountName: 'Cost of Goods Sold', accountType: 'COST_OF_GOODS_SOLD', accountCategory: 'DIRECT_COSTS', description: 'Direct costs of products sold' },
        { accountNumber: '6000', accountName: 'Salaries and Wages', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Employee compensation' },
        { accountNumber: '6100', accountName: 'Office Supplies', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Office supplies and materials' },
        { accountNumber: '6200', accountName: 'Rent Expense', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Office or facility rent' },
        { accountNumber: '6300', accountName: 'Utilities', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Electricity, water, gas, internet' },
        { accountNumber: '6400', accountName: 'Insurance', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Business insurance premiums' },
        { accountNumber: '6500', accountName: 'Professional Services', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Legal, accounting, consulting fees' },
        { accountNumber: '6600', accountName: 'Marketing and Advertising', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Marketing and promotional expenses' },
        { accountNumber: '6700', accountName: 'Travel and Entertainment', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Business travel and client entertainment' },
        { accountNumber: '6800', accountName: 'Depreciation Expense', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Depreciation of fixed assets' },
        { accountNumber: '6900', accountName: 'Bank Fees', accountType: 'EXPENSE', accountCategory: 'OPERATING_EXPENSE', description: 'Banking fees and charges' },
        { accountNumber: '7000', accountName: 'Interest Expense', accountType: 'EXPENSE', accountCategory: 'NON_OPERATING_EXPENSE', description: 'Interest on loans and credit' }
      ];

      const createdAccounts = [];
      
      for (const accountData of defaultAccounts) {
        try {
          const account = await prisma.account.create({
            data: {
              accountNumber: accountData.accountNumber,
              accountName: accountData.accountName,
              accountType: accountData.accountType as AccountType,
              accountCategory: accountData.accountCategory as AccountCategory,
              description: accountData.description,
              balance: 0,
              isActive: true
            }
          });
          createdAccounts.push(account);
        } catch (error) {
          // Skip if account already exists (unique constraint on accountNumber)
          if (error.code !== 'P2002') {
            throw error;
          }
        }
      }

      return createdAccounts;
    } catch (error) {
      console.error('Error creating default accounts:', error);
      throw new Error('Failed to create default accounts');
    }
  }

  // 📊 Generate Financial Report
  async generateFinancialReport(
    reportType: string | null,
    startDate: Date,
    endDate: Date,
    format: string = 'summary',
    standard: string = 'GAAP'
  ): Promise<any> {
    try {
      const accounts = await prisma.account.findMany({
        where: { isActive: true },
        include: {
          ledgerEntries: {
            where: {
              date: { gte: startDate, lte: endDate },
              journalEntry: { isPosted: true }
            },
            include: { journalEntry: true }
          }
        },
        orderBy: { accountNumber: 'asc' }
      });

      // Calculate account balances for the period
      const accountBalances = accounts.map(account => {
        const periodDebits = account.ledgerEntries.reduce((sum, entry) => sum + entry.debitAmount, 0);
        const periodCredits = account.ledgerEntries.reduce((sum, entry) => sum + entry.creditAmount, 0);
        
        let periodBalance = 0;
        if (['ASSET', 'EXPENSE', 'COST_OF_GOODS_SOLD'].includes(account.accountType)) {
          periodBalance = periodDebits - periodCredits;
        } else {
          periodBalance = periodCredits - periodDebits;
        }

        return {
          ...account,
          periodBalance,
          periodDebits,
          periodCredits
        };
      });

      // Generate specific reports based on type
      const reports: any = {
        metadata: {
          reportType: reportType || 'comprehensive',
          period: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
          standard,
          format,
          generatedAt: new Date().toISOString()
        }
      };

      if (!reportType || reportType === 'balance-sheet' || reportType === 'comprehensive') {
        reports.balanceSheet = this.generateBalanceSheet(accountBalances, endDate, standard);
      }

      if (!reportType || reportType === 'income-statement' || reportType === 'comprehensive') {
        reports.incomeStatement = this.generateIncomeStatement(accountBalances, startDate, endDate, standard);
      }

      if (!reportType || reportType === 'cash-flow' || reportType === 'comprehensive') {
        reports.cashFlowStatement = this.generateCashFlowStatement(accountBalances, startDate, endDate, standard);
      }

      if (reportType === 'trial-balance') {
        reports.trialBalance = accountBalances.map(account => ({
          accountNumber: account.accountNumber,
          accountName: account.accountName,
          debitBalance: account.periodBalance >= 0 ? account.periodBalance : 0,
          creditBalance: account.periodBalance < 0 ? Math.abs(account.periodBalance) : 0
        }));
      }

      return reports;
    } catch (error) {
      console.error('Error generating financial report:', error);
      throw new Error('Failed to generate financial report');
    }
  }

  // 📊 Export Financial Report
  async exportFinancialReport(
    reportType: string | null,
    startDate: Date,
    endDate: Date,
    format: string = 'csv'
  ): Promise<{ content: string; mimeType: string; filename: string }> {
    try {
      const reportData = await this.generateFinancialReport(reportType, startDate, endDate, 'detailed', 'GAAP');
      const timestamp = new Date().toISOString().split('T')[0];
      const reportName = reportType || 'comprehensive-report';

      if (format === 'csv') {
        let csvContent = '';
        
        if (reportData.balanceSheet) {
          csvContent += 'BALANCE SHEET\n';
          csvContent += 'Account,Amount\n';
          
          csvContent += 'ASSETS\n';
          csvContent += 'Current Assets\n';
          reportData.balanceSheet.assets.currentAssets.forEach((asset: any) => {
            csvContent += `${asset.accountName},${asset.balance}\n`;
          });
          
          csvContent += 'Fixed Assets\n';
          reportData.balanceSheet.assets.fixedAssets.forEach((asset: any) => {
            csvContent += `${asset.accountName},${asset.balance}\n`;
          });
          
          csvContent += `Total Assets,${reportData.balanceSheet.assets.totalAssets}\n\n`;
          
          csvContent += 'LIABILITIES\n';
          csvContent += 'Current Liabilities\n';
          reportData.balanceSheet.liabilities.currentLiabilities.forEach((liability: any) => {
            csvContent += `${liability.accountName},${Math.abs(liability.balance)}\n`;
          });
          
          csvContent += 'Long-term Liabilities\n';
          reportData.balanceSheet.liabilities.longTermLiabilities.forEach((liability: any) => {
            csvContent += `${liability.accountName},${Math.abs(liability.balance)}\n`;
          });
          
          csvContent += `Total Liabilities,${reportData.balanceSheet.liabilities.totalLiabilities}\n\n`;
          
          csvContent += 'EQUITY\n';
          reportData.balanceSheet.equity.equityAccounts.forEach((equity: any) => {
            csvContent += `${equity.accountName},${Math.abs(equity.balance)}\n`;
          });
          csvContent += `Total Equity,${reportData.balanceSheet.equity.totalEquity}\n\n`;
        }

        if (reportData.incomeStatement) {
          csvContent += 'INCOME STATEMENT\n';
          csvContent += 'Account,Amount\n';
          
          csvContent += 'REVENUE\n';
          reportData.incomeStatement.revenue.operatingRevenue.forEach((revenue: any) => {
            csvContent += `${revenue.accountName},${Math.abs(revenue.balance)}\n`;
          });
          csvContent += `Total Revenue,${reportData.incomeStatement.revenue.totalRevenue}\n\n`;
          
          csvContent += 'EXPENSES\n';
          reportData.incomeStatement.expenses.operatingExpenses.forEach((expense: any) => {
            csvContent += `${expense.accountName},${expense.balance}\n`;
          });
          csvContent += `Total Expenses,${reportData.incomeStatement.expenses.totalExpenses}\n\n`;
          
          csvContent += `Net Income,${reportData.incomeStatement.netIncome}\n`;
        }

        return {
          content: csvContent,
          mimeType: 'text/csv',
          filename: `${reportName}-${timestamp}.csv`
        };
      }

      // Default to JSON if format not supported
      return {
        content: JSON.stringify(reportData, null, 2),
        mimeType: 'application/json',
        filename: `${reportName}-${timestamp}.json`
      };
    } catch (error) {
      console.error('Error exporting financial report:', error);
      throw new Error('Failed to export financial report');
    }
  }

  // 📊 Export General Ledger
  async exportGeneralLedger(
    accountId?: string,
    startDate?: Date,
    endDate?: Date,
    format: string = 'csv'
  ): Promise<{ content: string; mimeType: string; filename: string }> {
    try {
      const ledgerEntries = await this.getGeneralLedger(accountId, startDate, endDate);
      const timestamp = new Date().toISOString().split('T')[0];

      if (format === 'csv') {
        let csvContent = 'Date,Account Number,Account Name,Description,Reference,Debit,Credit,Entry Number\n';
        
        ledgerEntries.forEach(entry => {
          const date = new Date(entry.date).toISOString().split('T')[0];
          csvContent += `${date},"${entry.accountNumber}","${entry.accountName}","${entry.description}","${entry.reference || ''}",${entry.debitAmount},${entry.creditAmount},"${entry.entryNumber}"\n`;
        });

        return {
          content: csvContent,
          mimeType: 'text/csv',
          filename: `general-ledger-${timestamp}.csv`
        };
      }

      // Default to JSON
      return {
        content: JSON.stringify(ledgerEntries, null, 2),
        mimeType: 'application/json',
        filename: `general-ledger-${timestamp}.json`
      };
    } catch (error) {
      console.error('Error exporting general ledger:', error);
      throw new Error('Failed to export general ledger');
    }
  }

  // 📊 Get Accounting Summary
  async getAccountingSummary(): Promise<any> {
    try {
      return await this.getDashboardSummary();
    } catch (error) {
      console.error('Error getting accounting summary:', error);
      throw new Error('Failed to get accounting summary');
    }
  }

  // 🔢 Get Next Journal Entry Number
  async getNextJournalEntryNumber(): Promise<string> {
    try {
      return await this.getNextEntryNumber();
    } catch (error) {
      console.error('Error getting next journal entry number:', error);
      throw new Error('Failed to get next journal entry number');
    }
  }

  // Helper method to generate balance sheet
  private generateBalanceSheet(accountBalances: any[], asOfDate: Date, standard: string) {
    const currentAssets = accountBalances.filter(a => a.accountCategory === 'CURRENT_ASSET');
    const fixedAssets = accountBalances.filter(a => a.accountCategory === 'FIXED_ASSET');
    const currentLiabilities = accountBalances.filter(a => a.accountCategory === 'CURRENT_LIABILITY');
    const longTermLiabilities = accountBalances.filter(a => a.accountCategory === 'LONG_TERM_LIABILITY');
    const equityAccounts = accountBalances.filter(a => a.accountCategory === 'OWNERS_EQUITY');

    return {
      asOfDate: asOfDate.toISOString(),
      standard,
      assets: {
        currentAssets: currentAssets.map(a => ({ accountName: a.accountName, balance: a.balance })),
        fixedAssets: fixedAssets.map(a => ({ accountName: a.accountName, balance: a.balance })),
        totalAssets: [...currentAssets, ...fixedAssets].reduce((sum, a) => sum + a.balance, 0)
      },
      liabilities: {
        currentLiabilities: currentLiabilities.map(a => ({ accountName: a.accountName, balance: Math.abs(a.balance) })),
        longTermLiabilities: longTermLiabilities.map(a => ({ accountName: a.accountName, balance: Math.abs(a.balance) })),
        totalLiabilities: [...currentLiabilities, ...longTermLiabilities].reduce((sum, a) => sum + Math.abs(a.balance), 0)
      },
      equity: {
        equityAccounts: equityAccounts.map(a => ({ accountName: a.accountName, balance: Math.abs(a.balance) })),
        totalEquity: equityAccounts.reduce((sum, a) => sum + Math.abs(a.balance), 0)
      }
    };
  }

  // Helper method to generate income statement
  private generateIncomeStatement(accountBalances: any[], startDate: Date, endDate: Date, standard: string) {
    const operatingRevenue = accountBalances.filter(a => a.accountCategory === 'OPERATING_REVENUE');
    const nonOperatingRevenue = accountBalances.filter(a => a.accountCategory === 'NON_OPERATING_REVENUE');
    const costOfGoodsSold = accountBalances.filter(a => a.accountCategory === 'DIRECT_COSTS');
    const operatingExpenses = accountBalances.filter(a => a.accountCategory === 'OPERATING_EXPENSE');
    const nonOperatingExpenses = accountBalances.filter(a => a.accountCategory === 'NON_OPERATING_EXPENSE');

    const totalRevenue = [...operatingRevenue, ...nonOperatingRevenue].reduce((sum, a) => sum + Math.abs(a.periodBalance), 0);
    const totalExpenses = [...costOfGoodsSold, ...operatingExpenses, ...nonOperatingExpenses].reduce((sum, a) => sum + a.periodBalance, 0);

    return {
      period: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
      standard,
      revenue: {
        operatingRevenue: operatingRevenue.map(a => ({ accountName: a.accountName, balance: Math.abs(a.periodBalance) })),
        nonOperatingRevenue: nonOperatingRevenue.map(a => ({ accountName: a.accountName, balance: Math.abs(a.periodBalance) })),
        totalRevenue
      },
      expenses: {
        costOfGoodsSold: costOfGoodsSold.map(a => ({ accountName: a.accountName, balance: a.periodBalance })),
        operatingExpenses: operatingExpenses.map(a => ({ accountName: a.accountName, balance: a.periodBalance })),
        nonOperatingExpenses: nonOperatingExpenses.map(a => ({ accountName: a.accountName, balance: a.periodBalance })),
        totalExpenses
      },
      netIncome: totalRevenue - totalExpenses
    };
  }

  // Helper method to generate cash flow statement
  private generateCashFlowStatement(accountBalances: any[], startDate: Date, endDate: Date, standard: string) {
    // Simplified cash flow statement - would need more detailed cash flow analysis in production
    const cashAccounts = accountBalances.filter(a => a.accountName.toLowerCase().includes('cash'));
    const netCashFlow = cashAccounts.reduce((sum, a) => sum + a.periodBalance, 0);

    return {
      period: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
      standard,
      operatingActivities: netCashFlow * 0.7, // Simplified allocation
      investingActivities: netCashFlow * 0.2,
      financingActivities: netCashFlow * 0.1,
      netCashFlow
    };
  }

  // Helper methods for getting account IDs
  private async getCashAccountId(): Promise<string> {
    const cashAccount = await prisma.account.findFirst({
      where: {
        OR: [
          { accountName: { contains: 'Cash', mode: 'insensitive' } },
          { accountNumber: '1000' }
        ]
      }
    });
    
    if (!cashAccount) {
      throw new Error('Cash account not found');
    }
    
    return cashAccount.id;
  }

  private async getRevenueAccountId(): Promise<string> {
    const revenueAccount = await prisma.account.findFirst({
      where: {
        accountType: 'REVENUE'
      }
    });
    
    if (!revenueAccount) {
      throw new Error('Revenue account not found');
    }
    
    return revenueAccount.id;
  }
}

export const accountingService = new AccountingService();
