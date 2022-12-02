import React, { useState } from 'react';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../assets/wrappers/Charts';

export default function Charts() {
    const [isBarChart, setIsBarChart] = useState(true);
    const { monthlyApplications: data } = useApp();

    return (
        <Wrapper>
            <h4>Monthly Applications</h4>

            <button type='button' onClick={() => setIsBarChart(!isBarChart)}>
                {isBarChart ? 'AreaChart' : 'BarChart'}
            </button>
            {isBarChart ? <BarChart data={data} /> : <AreaChart data={data} />}
        </Wrapper>
    );
} 