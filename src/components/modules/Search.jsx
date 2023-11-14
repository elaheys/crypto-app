import React, { useEffect, useState } from 'react';
//data
import { searchCoin,marketChart } from '../services/cryptoApi';
//loader
import { RotatingLines } from 'react-loader-spinner';
//style
import styles from './search.module.css';

const Search = ({currency,setCurrency,setSign,setLiChart}) => {

    const [ text,setText ] = useState('');
    const [ coins,setCoins ] = useState([]);
    const [ isLoading,setIsLoading ] = useState(false);

    const changeSign = () => {
        if(currency === 'usd'){
            setSign('$')
        }else if(currency === 'eur'){
            setSign('€')
        }else{
            setSign('¥')
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        setCoins([])
        if(!text){
            setIsLoading(false)
            return;
        };

        const fetchApi =async () => {
            try {
                const res = await fetch(searchCoin(text),{signal:controller.signal})
                const data = await res.json();
                if(data.coins){
                setIsLoading(false)
                setCoins(data.coins)
                }else{
                    alert(data.status.error_message)
                } ;
            } catch (error) {
                if(error.name !== 'AbortError'){
                    alert(error.message)
                }
            }
        }
        setIsLoading(true)
        fetchApi()

        return () => controller.abort();
    },[text])

    const showHandler =async (id,coin) => {
        try {
            const res = await fetch(marketChart(id))
            const json = await res.json()
            setLiChart({...json,coin})

        } catch (error) {
            setLiChart(null)
        }
    }

    return (
        <div className={styles.searchBox}>
            <input 
            type='text' 
            placeholder='Search'
            value={text} 
            onChange={e => setText(e.target.value)}/>
            <select value={currency} 
            onChange={e => setCurrency(e.target.value)} 
            onClick={changeSign}>
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
                <option value='jpy'>JPY</option>
            </select>
            {
                !text ? null : <div className={styles.searchResult}>
                {isLoading && <RotatingLines 
                width='50px' 
                height='50px' 
                strokeWidth='2'
                strokeColor='#3874ff'
                />}
                <ul>
                    {
                        coins.map(coin => <li key={coin.id} onClick={() => showHandler(coin.id,coin)}>
                            <img src={coin.thumb} alt={coin.name}/>
                            <p>{coin.name}</p>
                        </li>)
                    }
                </ul>
            </div>
            }
            
        </div>
    );
};

export default Search;