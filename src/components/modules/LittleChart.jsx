import React, { useState } from 'react';
//style
import styles from './chart.module.css';
//data
import { convertData } from '../helpers/convertData';
//charts
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const LittleChart = ({lichart,setLiChart}) => {

    const [ type , setType ] = useState('prices');

    const typeHandler = (event) => {
        if(event.target.tagName === "BUTTON"){
            const type = event.target.innerText.toLowerCase().replace(' ','_')
            setType(type)
        }
    }
    
    return (
        <div className={styles.container}>
            <span className={styles.cross} onClick={() => setLiChart(null)}>X</span>
            <div className={styles.chart}>
                <div className={styles.name}>
                    <img src={lichart.coin.thumb} alt={lichart.coin.name}/>
                    <p>{lichart.coin.name}</p>
                </div>
                <div className={styles.graph}>
                    <ResponsiveContainer width='100%' height='100%'>
                            <LineChart 
                            width={400} 
                            height={400} 
                            data={convertData(lichart,type)}>
                                <CartesianGrid stroke='#404042'/>
                                <Line 
                                type='monotone' 
                                dataKey={type} 
                                stroke='#3874ff'
                                strokeWidth='2px'
                                />
                                <YAxis dataKey={type} domain={['auto','auto']}/>
                                <XAxis dataKey='date' hide/>
                                <Legend/>
                                <Tooltip/>
                            </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className={styles.types} onClick={typeHandler}>
                    <button className={type === 'prices' ? styles.selected : null}>Prices</button>
                    <button className={type === 'market_caps' ? styles.selected : null}>Market Caps</button>
                    <button className={type === 'total_volumes' ? styles.selected : null}>Total Volumes</button>
                </div>
            </div>
        </div>
    );
};

export default LittleChart;