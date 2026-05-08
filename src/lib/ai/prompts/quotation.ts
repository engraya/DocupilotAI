export function buildQuotationPrompt(data: Record<string, unknown>): string {
  const lineItems = Array.isArray(data.lineItems)
    ? data.lineItems.map((item: Record<string, unknown>) =>
        `  - ${item.description} | Qty: ${item.quantity} | Rate: ${item.rate}`
      ).join('\n')
    : '';

  return `Generate a professional price quotation document with the following details:

Quotation Number: ${data.quotationNumber}
Valid Until: ${data.validUntil}
Currency: ${data.currency || 'USD'}
Tax Rate: ${data.taxRate || '0'}%

FROM:
${data.issuerName} (${data.issuerEmail})

TO:
${data.clientName} (${data.clientEmail})

ITEMS QUOTED:
${lineItems}

Notes: ${data.notes || 'None'}

Generate a complete quotation including: Quotation Header, From/To Details, Itemized Pricing Table, Subtotal/Tax/Total Calculations, Validity & Acceptance Terms, and Payment Terms.`;
}
