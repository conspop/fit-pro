import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../components/Invoice/Invoice'

const InvoicePage = () => {
  return (
    <div className='invoice-frame'>
      {/* <PDFViewer>
        <Invoice />
      </PDFViewer> */}
      <PDFDownloadLink document={<Invoice />} fileName="invoice.pdf">
        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
      </PDFDownloadLink>
    </div>
  )
}

export default InvoicePage