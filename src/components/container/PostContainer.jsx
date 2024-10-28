import React from 'react';
import Container from './Container'; // Adjust the import path based on your folder structure

function PostContainer({ children }) {
    return (
        <div className="relative flex">
            {/* Sidebar padding */}
            <div className="hidden md:block w-60"></div>

            <Container>
                <div className="pl-4 md:pl-8">
                    {children}
                </div>
            </Container>
        </div>
    );
}

export default PostContainer;
