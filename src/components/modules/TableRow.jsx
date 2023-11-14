import React from 'react';
//style
import styles from './tablecoin.module.css'; 
//icone
import chartUp from '../../assets/chart-up.svg';
import chartDown from '../../assets/chart-down.svg';
//data
import { marketChart } from '../services/cryptoApi';

const TableRow = ({coin,sign,setChart}) => {

    const {id,image,name,symbol,current_price,price_change_percentage_24h,total_volume} = coin;

    const showHandler =async () => {
        try {
            const res = await fetch(marketChart(id))
            const json = await res.json()
            setChart({...json,coin})
        } catch (error) {
            setChart(null)
        }

    }

    return (
        <tr> 
            <td>
                <div className={styles.symbol} onClick={showHandler}>
                    <img src={image} alt={name}/>
                    <span>{symbol.toUpperCase()}</span>
                </div>
            </td>
                <td>{name}</td>
                <td>{sign}{' '}{current_price.toLocaleString()}</td>
                <td className={price_change_percentage_24h > 0 ? styles.success : styles.error}>{price_change_percentage_24h.toFixed(2)}%</td>
                <td>{total_volume.toLocaleString()}</td>
                <td><img src={price_change_percentage_24h > 0 ? chartUp : chartDown} alt={name}/></td>
        </tr>
    );
};

export default TableRow;
