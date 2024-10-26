import React, { useState } from 'react'
import appwriteService from "../appwrite/conifg.js"
import { Link } from 'react-router-dom'
import SkeletonCard from '../utils/SkeletonCard.jsx';
import formatDate from '../utils/ConstanFunc.js';
import moment from 'moment';
import cardPlaceholder from '../assets/centralpush.png';
import { useErrorBoundary } from 'react-error-boundary';

function PostCard({ $id, title, featuredImage, content, category, date }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showBoundary } = useErrorBoundary();

  const handleToggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateLength = 20;

  const truncatedContent = content.length > truncateLength ?
    content.substring(0, truncateLength) + '...' :
    content;
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SkeletonCard />; // Show skeleton while loading
  }
  return (
    <Link to={`/post/${$id}`} className='block'>
      <div className='flex flex-col gap-4'>
        <div className='post-card'>
          {/* User Info Section */}
          <div className="flex items-center gap-2 p-2">
            {/* <div className="w-12 h-12 overflow-hidden bg-gray-200 rounded-full">
            <img
              src="https://via.placeholder.com/48" // Fallback profile image
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <span className="font-semibold text-gray-900"> "Username"</span>
            <span className="text-sm text-gray-500">@ "username"</span>
          </div> */}
            <span className='flex gap-3'>
              {date && (
                <p className='fs-300 fw-bold'>{formatDate(moment(date).format("YYYY,MM, DD"))}</p>
              )}
              <p className='fs-300 category-card'>#{category}</p>
            </span>
          </div>
          {/* Title Section */}
          <div className="flex items-center justify-center flex-grow p-2 post-card__title">
            <span>{title}</span>
          </div>

          {/* Image Section */}
          <div className="flex items-center justify-center flex-grow overflow-hidden rounded-lg shadow-md">
            <img
              key={$id}
              src={featuredImage ? appwriteService.getFilePreview(featuredImage)
                : cardPlaceholder}
              alt={title}
              className="post-card__image"
            />
          </div>


          {/* Content Section */}
          <div className="flex-grow p-2 text-center">
            <div
              dangerouslySetInnerHTML={{ __html: isExpanded ? content : truncatedContent }}
              className="truncate text-wrap"
            />
            <button
              onClick={handleToggleContent}
              className="mt-2 text-blue-500 hover:underline"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard