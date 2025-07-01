// 💰 Accounting API Endpoint
// Comprehensive Accounting & Bookkeeping System

import { NextRequest, NextResponse } from 'next/server';
import { accountingService } from '@/lib/accounting';
import { requirePermission } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await requirePermission(request, 'accounting:read');
    if ('error' in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const accountId = searchParams.get('accountId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    switch (action) {
      case 'chart-of-accounts':
        const accounts = await accountingService.getChartOfAccounts();
        return NextResponse.json({
          success: true,
          data: accounts,
        });

      case 'trial-balance':
        const asOfDate = searchParams.get('asOfDate') 
          ? new Date(searchParams.get('asOfDate')!) 
          : new Date();
        const trialBalance = await accountingService.getTrialBalance(asOfDate);
        return NextResponse.json({
          success: true,
          data: trialBalance,
        });

      case 'financial-statements':
        const statementDate = searchParams.get('asOfDate') 
          ? new Date(searchParams.get('asOfDate')!) 
          : new Date();
        const statements = await accountingService.getFinancialStatements(statementDate);
        return NextResponse.json({
          success: true,
          data: statements,
        });

      case 'account-details':
        if (!accountId) {
          return NextResponse.json(
            { error: 'Account ID is required' },
            { status: 400 }
          );
        }
        const accountDetails = await accountingService.getAccountDetails(accountId);
        return NextResponse.json({
          success: true,
          data: accountDetails,
        });

      case 'account-history':
        if (!accountId || !startDate || !endDate) {
          return NextResponse.json(
            { error: 'Account ID, start date, and end date are required' },
            { status: 400 }
          );
        }
        const history = await accountingService.getAccountBalanceHistory(
          accountId,
          new Date(startDate),
          new Date(endDate)
        );
        return NextResponse.json({
          success: true,
          data: history,
        });

      case 'journal-entries':
        const entries = await accountingService.getJournalEntries();
        return NextResponse.json({
          success: true,
          data: entries,
        });

      case 'general-ledger':
        const ledgerEntries = await accountingService.getGeneralLedger(
          accountId ? accountId : undefined,
          startDate ? new Date(startDate) : undefined,
          endDate ? new Date(endDate) : undefined
        );
        return NextResponse.json({
          success: true,
          data: ledgerEntries,
        });

      case 'financial-reports':
        const reportType = searchParams.get('reportType');
        const format = searchParams.get('format') || 'summary';
        const standard = searchParams.get('standard') || 'GAAP';
        
        const reportData = await accountingService.generateFinancialReport(
          reportType,
          startDate ? new Date(startDate) : new Date(new Date().getFullYear(), 0, 1),
          endDate ? new Date(endDate) : new Date(),
          format,
          standard
        );
        return NextResponse.json({
          success: true,
          data: reportData,
        });

      case 'export-report':
        const exportFormat = searchParams.get('exportFormat') || 'csv';
        const exportReportType = searchParams.get('reportType');
        
        // Generate export data
        const exportData = await accountingService.exportFinancialReport(
          exportReportType,
          startDate ? new Date(startDate) : new Date(new Date().getFullYear(), 0, 1),
          endDate ? new Date(endDate) : new Date(),
          exportFormat
        );
        
        return new Response(exportData.content, {
          headers: {
            'Content-Type': exportData.mimeType,
            'Content-Disposition': `attachment; filename="${exportData.filename}"`
          }
        });

      case 'export-ledger':
        const ledgerData = await accountingService.exportGeneralLedger(
          accountId ? accountId : undefined,
          startDate ? new Date(startDate) : undefined,
          endDate ? new Date(endDate) : undefined,
          'csv'
        );
        
        return new Response(ledgerData.content, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="general-ledger-${new Date().toISOString().split('T')[0]}.csv"`
          }
        });

      case 'dashboard-summary':
        const summary = await accountingService.getAccountingSummary();
        return NextResponse.json({
          success: true,
          data: summary,
        });

      case 'next-entry-number':
        const nextNumber = await accountingService.getNextJournalEntryNumber();
        return NextResponse.json({
          success: true,
          data: nextNumber,
        });

      default:
        // Default dashboard data
        const dashboardData = await accountingService.getDashboardData();
        return NextResponse.json({
          success: true,
          data: dashboardData,
        });
    }

  } catch (error) {
    console.error('Accounting API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch accounting data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await requirePermission(request, 'accounting:write');
    if ('error' in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'initialize-accounts':
        await accountingService.initializeChartOfAccounts();
        return NextResponse.json({
          success: true,
          message: 'Chart of accounts initialized successfully',
        });

      case 'create-account':
        const { accountData } = body;
        if (!accountData) {
          return NextResponse.json(
            { error: 'Account data is required' },
            { status: 400 }
          );
        }
        const newAccount = await accountingService.createAccount(accountData);
        return NextResponse.json({
          success: true,
          data: newAccount,
          message: 'Account created successfully',
        });

      case 'create-journal-entry':
        const { description, entries, reference, date } = body;
        if (!description || !entries || !Array.isArray(entries)) {
          return NextResponse.json(
            { error: 'Description and entries array are required' },
            { status: 400 }
          );
        }
        
        const journalEntry = await accountingService.createJournalEntry(
          description,
          entries,
          reference,
          date ? new Date(date) : new Date(),
          authResult.user.id
        );
        
        return NextResponse.json({
          success: true,
          data: journalEntry,
          message: 'Journal entry created successfully',
        });

      case 'post-journal-entry':
        const { journalEntryId } = body;
        if (!journalEntryId) {
          return NextResponse.json(
            { error: 'Journal entry ID is required' },
            { status: 400 }
          );
        }
        
        await accountingService.postJournalEntry(journalEntryId);
        return NextResponse.json({
          success: true,
          message: 'Journal entry posted successfully',
        });

      case 'create-invoice':
        const { invoiceData } = body;
        if (!invoiceData) {
          return NextResponse.json(
            { error: 'Invoice data is required' },
            { status: 400 }
          );
        }
        
        const invoice = await accountingService.createInvoice(invoiceData, authResult.user.id);
        return NextResponse.json({
          success: true,
          data: invoice,
          message: 'Invoice created successfully',
        });

      case 'record-expense':
        const { expenseData } = body;
        if (!expenseData) {
          return NextResponse.json(
            { error: 'Expense data is required' },
            { status: 400 }
          );
        }
        
        const expense = await accountingService.recordExpense(expenseData, authResult.user.id);
        return NextResponse.json({
          success: true,
          data: expense,
          message: 'Expense recorded successfully',
        });

      case 'record-payment':
        const { paymentData } = body;
        if (!paymentData) {
          return NextResponse.json(
            { error: 'Payment data is required' },
            { status: 400 }
          );
        }
        
        const payment = await accountingService.recordPayment(paymentData, authResult.user.id);
        return NextResponse.json({
          success: true,
          data: payment,
          message: 'Payment recorded successfully',
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Accounting API error:', error);
    return NextResponse.json(
      { error: 'Failed to process accounting request' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await requirePermission(request, 'accounting:write');
    if ('error' in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const body = await request.json();
    const { action, id } = body;

    switch (action) {
      case 'update-account':
        const { accountData } = body;
        if (!id || !accountData) {
          return NextResponse.json(
            { error: 'Account ID and data are required' },
            { status: 400 }
          );
        }
        
        const updatedAccount = await accountingService.updateAccount(id, accountData);
        return NextResponse.json({
          success: true,
          data: updatedAccount,
          message: 'Account updated successfully',
        });

      case 'update-invoice':
        const { invoiceData } = body;
        if (!id || !invoiceData) {
          return NextResponse.json(
            { error: 'Invoice ID and data are required' },
            { status: 400 }
          );
        }
        
        const updatedInvoice = await accountingService.updateInvoice(id, invoiceData);
        return NextResponse.json({
          success: true,
          data: updatedInvoice,
          message: 'Invoice updated successfully',
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Accounting API error:', error);
    return NextResponse.json(
      { error: 'Failed to update accounting data' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await requirePermission(request, 'accounting:delete');
    if ('error' in authResult) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'delete-account':
        await accountingService.deleteAccount(id);
        return NextResponse.json({
          success: true,
          message: 'Account deleted successfully',
        });

      case 'delete-journal-entry':
        await accountingService.deleteJournalEntry(id);
        return NextResponse.json({
          success: true,
          message: 'Journal entry deleted successfully',
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Accounting API error:', error);
    return NextResponse.json(
      { error: 'Failed to delete accounting data' },
      { status: 500 }
    );
  }
}
