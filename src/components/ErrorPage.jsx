import React from 'react'
import error from '../assets/Error.svg';
import Container from './container/Container';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/');
    };

    return (
        <Container>
            <div className='min-h-screen d-flex justify-content-center align-items-center flex-column bg-light-primary'>
                <img src={error} alt='404' className='' />
                <h1 className='p-3'>Page Not Found</h1>
                <p className='p-3'>
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Button className='p-3 bg-primary-blue ' onClick={handleNavigateHome}>
                    Homepage
                </Button>
            </div>
        </Container>
    );
}

export default ErrorPage;
