export function buildInvoicePrompt(data: Record<string, unknown>): string {
  const lineItems = Array.isArray(data.lineItems)
    ? data.lineItems.map((item: Record<string, unknown>) =>
        `  - ${item.description} | Qty: ${item.quantity} | Rate: ${item.rate}`
      ).join('\n')
    : '';

  return `Generate a professional invoice document with the following details:

Invoice Number: ${data.invoiceNumber}
Issue Date: ${data.issueDate}
Due Date: ${data.dueDate}
Currency: ${data.currency || 'USD'}
Tax Rate: ${data.taxRate || 'N/A'}%

ISSUER:
Name: ${data.issuerName}
Email: ${data.issuerEmail}
Address: ${data.issuerAddress || 'N/A'}

CLIENT:
Name: ${data.clientName}
Email: ${data.clientEmail}
Address: ${data.clientAddress || 'N/A'}

LINE ITEMS:
${lineItems}

Payment Terms: ${data.paymentTerms || 'Net 30'}
Notes: ${data.notes || 'None'}

Generate a complete professional invoice document including sections for: Invoice Header, Bill From, Bill To, Line Items & Amounts, Payment Details, and any Notes/Terms.`;
}
