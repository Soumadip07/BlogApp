import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handleClick = (page) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="pagination">
            <button
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
            >
                Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                    <button
                        key={pageNumber}
                        onClick={() => handleClick(pageNumber)}
                        className={`pagination-button ${currentPage === pageNumber ? 'active' : ''}`}
                    >
                        {pageNumber}
                    </button>
                );
            })}

            <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
