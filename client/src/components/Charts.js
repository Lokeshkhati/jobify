import React, { useState } from 'react';
import BarChartComponent from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../assets/wrappers/Charts';
import { useApp } from '../contexts/app-context';

const Charts = () => {
    const [isBarChart, setIsBarChart] = useState(true);
    const { monthlyApplications: data } = useApp();

    return (
        <Wrapper>
            <h4>Monthly Applications</h4>

            <button type='button' onClick={() => setIsBarChart(!isBarChart)}>
                {isBarChart ? 'AreaChart' : 'BarChart'}
            </button>
            {isBarChart ? <BarChartComponent data={data} /> : <AreaChart data={data} />}
        </Wrapper>
    );
}
export default Charts