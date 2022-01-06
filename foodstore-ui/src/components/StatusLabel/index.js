import React from 'react';
import { Badge } from 'upkit';
import { string } from 'prop-types';

export default function StatusLabel({status}){
    switch (status) {
        case 'waiting_payment':
            return(
                <Badge color="orange">
                    Menunggu pembayaran
                </Badge>
            )
        case 'paid':
            return(
                <Badge color="green">
                    Sudah di bayar
                </Badge>
            )

        case 'processing':
                return (
                    <Badge color="yellow">
                        Sedang di proses
                    </Badge>
                )

        case 'delivered':
            return(
                <Badge color="green">
                    Pesan diterima
                </Badge>
            )
        
        default:
            return <div></div>;
    }
}


StatusLabel.defaultProps = {

}

StatusLabel.propTypes = {
    status:string.isRequired
}
