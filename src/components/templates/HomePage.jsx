import React, { useEffect, useState } from 'react';
//data
import { getCoinList } from '../services/cryptoApi';
//components
import TableCoin from '../modules/TableCoin';
import Pagination from '../modules/Pagination';
import Search from '../modules/Search';
import Chart from '../modules/Chart';
import LittleChart from '../modules/LittleChart';

const HomePage = () => {
    
    const [coins,setCoins] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [page,setPage] = useState(1);
    const [currency,setCurrency] = useState("usd");
    const [sign,setSign] = useState("$");
    const [chart,setChart] = useState(null);
    const [lichart,setLiChart] = useState(null);

    useEffect(() => {
        setIsLoading(true)
        const fetchApi = async () =>{
            try {
                const res = await fetch(getCoinList(page,currency))
                const data = await res.json()
                setCoins(data)
                setIsLoading(false)
            } catch (error) {
                alert(error.message)
            }
        
        } 
        fetchApi()
    },[page,currency])

    

    return (
        <div>
            <Search currency={currency} setCurrency={setCurrency} setSign={setSign} setLiChart={setLiChart} />
            <TableCoin coins={coins} isLoading={isLoading} sign={sign} setChart={setChart}/>
            <Pagination page={page} setPage={setPage}/>
            {!!chart && <Chart chart={chart} setChart={setChart}/>}
            {!!lichart && <LittleChart lichart={lichart} setLiChart={setLiChart}/>}
        </div>
    );
};

export default HomePage;