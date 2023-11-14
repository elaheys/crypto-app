import React from 'react';

//loader
import {RotatingLines} from 'react-loader-spinner';
//style
import styles from './tablecoin.module.css'; 
//components
import TableRow from './TableRow';

const TableCoin = ({coins,isLoading,sign,setChart}) => {
    return (
        <div className={styles.container}>
            {
                isLoading ? <RotatingLines
                strokeColor="#3874ff"
                strokeWidth="2"
                        /> :
                <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Coin</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>24h</th>
                        <th>Total Volume</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        coins.map(coin => <TableRow
                                        key={coin.id} 
                                        coin={coin} 
                                        sign={sign} 
                                        setChart={setChart}
                                        />)
                    }
                </tbody>
            </table>
            }
        </div>
    );
};

export default TableCoin;