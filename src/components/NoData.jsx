import React from 'react'
import error from '../assets/Error.svg';
import Container from './container/Container';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function NoDataPage() {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/');
    };

    return (
        <div className='min-h-screen d-flex justify-content-center align-items-center flex-column bg-light-primary'>
            <h1>No Data Found!!</h1>
            <Button className='p-3 bg-primary-blue ' onClick={handleNavigateHome}>
                Homepage
            </Button>
        </div>
    );
}

export default NoDataPage;
