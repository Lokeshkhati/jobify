import { useEffect } from 'react';
import Loading from './Loading';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsList';
import { useApp } from '../contexts/app-context';
import PageButtons from './PageButtons';

const JobsList = () => {
    const { getJobs, jobs, isLoading, page, totalJobs, search, searchStatus, searchType, sort, numOfPages } = useApp();
    useEffect(() => {
        getJobs();
    }, [page, search, searchStatus, searchType, sort]);

    console.log(jobs, 'from jobslist');

    if (isLoading) return <Loading center />;

    if (jobs?.length === 0) {
        return (
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <h5>
                {totalJobs} job{jobs?.length > 1 && 's'} found lokesh
            </h5>
            <div className='jobs'>
                {jobs?.length > 0 && jobs?.map((job) => {
                    return <Job key={job._id} {...job} />;
                })}
            </div>
            <PageButtons />
            {/* {numOfPages > 1 && <PageButtons />} */}
        </Wrapper>
    );
};

export default JobsList;