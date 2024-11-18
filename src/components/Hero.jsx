import React from 'react';
import background from '../assets/object.png';
import SearchBox from './SearchBox';
import FeaturedPost from './FeaturedPost';
import Wave from './Wave';
import Popular from './Popular';
import AllArticles from './AllArticles';
import { useSelector } from 'react-redux';
import FeatureSlider from './FeaturesSlider';
import NewsLetter from './Footer/NewsLetter';
import HomeGrid from './HomeGrid';
function Hero() {
    const waveColor = localStorage.getItem("themeMode") === "dark" ? '#0e1217' : '#ffffff';
    // console.log(waveColor, "===", localStorage.getItem("themeMode"))
    const { posts, status } = useSelector((state) => state.posts || []);
    const post1 = posts?.documents?.[12];
    const post2 = posts?.documents?.[24];
    // console.log(post1)
    return (
        <div className='flex items-center justify-center my-10 flex-column'>
            {/* Hero Section */}
            <div className="flex items-center justify-center mt-5 ">
                {/* <FeaturedPost post={posts?.documents.slice(10, 16)} /> */}
                <HomeGrid />
            </div>
            <div className='py-5'>
                <FeatureSlider posts={posts?.documents.slice(10, 16)} />
            </div>

        </div>
    );
}

export default Hero;
