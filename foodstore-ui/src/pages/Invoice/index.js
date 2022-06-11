import React from 'react';

import { useRouteMatch } from 'react-router-dom';
import Axios from 'axios';

import { getInvoiceByOrderId } from '../../api/invoice';
import { LayoutOne, Text, Table, Button } from 'upkit';
import TopBar from '../../components/TopBar';
import BounceLoader from 'react-spinners/BounceLoader';
import { formatRupiah } from '../../utils/format-rupiah';
import StatusLabel from '../../components/StatusLabel';

import { config } from '../../config';

export default function Invoice() {
  let [invoice, setInvoice] = React.useState(null);
  let [error, setError] = React.useState('');
  let [status, setStatus] = React.useState('process');

  let [initiatingPayment, setInitiating] = React.useState(false);
  let [requestError, setRequestError] = React.useState(false);

  let { params } = useRouteMatch();

  React.useEffect(() => {
    getInvoiceByOrderId(params?.order_id)
      .then(({ data }) => {
        if (data?.error) {
          setError(data.message || 'terjadi kesalahan yang tidak di ketahui');
        }

        setInvoice(data);
      })
      .finally(() => setStatus('idle')); //rubah status dari process menjadi idle
  }, []);

  if (error.length) {
    return (
      <LayoutOne>
        <TopBar />
        <Text as="h3">terjadi kesalahan</Text>
        {error}
      </LayoutOne>
    );
  }

  if (status === 'process') {
    return (
      <LayoutOne>
        <div className="text-center py-10">
          <div className="inline-block">
            <BounceLoader color="red" />
          </div>
        </div>
      </LayoutOne>
    );
  }

  let handlePayment = async function () {
    setInitiating(true);

    let {
      data: { token }
    } = await Axios.get(`${config.api_host}/api/invoices/${params?.order_id}/initiate-payment`);

    if (!token) {
      setRequestError(true);
      return;
    }

    setInitiating(false);
    window.snap.pay(token);
  };

  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3"> Invoice</Text>
      <br />

      <Table
        showPagination={false}
        items={[
          {
            label: 'status',
            value: <StatusLabel status={invoice?.payment_status} />
          },
          {
            label: 'Order Id',
            value: '#' + invoice?.order?.order_number
          },
          {
            label: 'Total amount',
            value: formatRupiah(invoice?.total)
          },
          {
            label: 'Billed to',
            value: (
              <div>
                <strong>{invoice?.user?.full_name}</strong>
                <br />
                {invoice?.user?.email}
                <br />
                {invoice?.delivery_address?.detail}
                <br />
                {invoice?.delivery_address?.kelurahan}
                <br />
                {invoice?.delivery_address?.kecamatan}
                <br />
                {invoice?.delivery_address?.kelurahan}
                <br />
                {invoice?.delivery_address?.kabupaten}
                <br />
                {invoice?.delivery_address?.provinsi}
              </div>
            )
          },
          {
            label: 'Payment to',
            value: (
              <div>
                {config.owner} <br />
                {config.contact} <br />
                {config.billing.account_no} <br />
                {config.billing.bank_name} <br />
                {invoice.payment_status !== 'paid' ? (
                  <>
                    <Button onClick={handlePayment} disabled={initiatingPayment}>
                      {' '}
                      {initiatingPayment ? 'Loading ... ' : 'Bayar dengan Midtrans'}{' '}
                    </Button>
                  </>
                ) : null}
                {requestError ? (
                  <>
                    <div className="text-red-400">Terjadi kesalahan saat meminta token untuk pembayaran.</div>
                  </>
                ) : null}
              </div>
            )
          }
        ]}
        columns={[
          { Header: 'Invoice', accessor: 'label' },
          { Header: '', accessor: 'value' }
        ]}
      />
    </LayoutOne>
  );
}
