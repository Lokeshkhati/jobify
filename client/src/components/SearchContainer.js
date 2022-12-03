import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useApp } from '../contexts/app-context';
const SearchContainer = () => {
    const {
        isLoading,
        search,
        searchStatus,
        searchType,
        sort,
        sortOptions,
        statusOptions,
        jobTypeOptions,
        handleChange,
        clearFilters,
    } = useApp();

    const handleSearch = (event) => {
        if (isLoading) return;
        handleChange({ name: event.target.name, value: event.target.value });
    };
    const handleSubmit = (event) => {
        event.preventDefault()
        clearFilters()
    }

    return (
        <Wrapper>
            <form className='form'>
                <h4>search form</h4>

                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='search'
                        value={search}
                        handleChange={handleSearch}
                    ></FormRow>

                    <FormRowSelect
                        labelText='job status'
                        name='searchStatus'
                        value={searchStatus}
                        handleChange={handleSearch}
                        list={['all', ...statusOptions]}
                    ></FormRowSelect>

                    <FormRowSelect
                        labelText='job type'
                        name='searchType'
                        value={searchType}
                        handleChange={handleSearch}
                        list={['all', ...jobTypeOptions]}
                    ></FormRowSelect>

                    <FormRowSelect
                        name='sort'
                        value={sort}
                        handleChange={handleSearch}
                        list={sortOptions}
                    ></FormRowSelect>
                    <button
                        className='btn btn-block btn-danger'
                        disabled={isLoading}
                        onClick={handleSubmit}
                    >
                        clear filters
                    </button>
                </div>
            </form>
        </Wrapper>
    );
};

export default SearchContainer;