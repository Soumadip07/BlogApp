import React from 'react'
import cardPlaceholder from '../../assets/centralpush.png';
import appwriteService from '../../appwrite/conifg'
function NewsLetter(props) {
    const { posts } = props;

    return (

        <div className='pb-12 d-flex justify-content-evenly'>
            <div className="gap-3 footer-left d-flex flex-column">
                <h4>Get the latest news and updates from us.</h4>
                <form className='gap-3 mb-4 d-flex'>
                    <input type="email" placeholder='Enter your email' />
                    <button type='submit' className='px-4 py-2 text-white bg-blue-600 rounded-lg '>Subscribe</button>
                </form>
                <p>By subscribing to our newsletter, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.</p>
            </div>
            <div className="footer-right">
                <div className="footer-card">
                    <img
                        src={posts?.[0]?.featuredImage ? appwriteService.getFilePreview(posts?.[0]?.featuredImage) : cardPlaceholder}
                        alt=''
                        className='footer-card-img' />
                    <div className="footer-card-body">
                        <h5 className='footer-card-title'>{posts?.[0]?.title}</h5>
                        <p className='d-flex justify-content-end text-dark'>{posts?.[0]?.category}</p>
                        <p className=' footer-card-info'
                        // dangerouslySetInnerHTML={{ __html: posts?.[0]?.content }}
                        >
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos pariatur excepturi tempora veritatis, similique suscipit laudantium! Aliquam ad quae maiores aperiam dolorem debitis corrupti eius, voluptates, repellendus doloremque quos mollitia officia atque quia rem quam. Suscipit temporibus odit rerum vitae soluta sed, eveniet ipsam sunt, in, earum perspiciatis. Nam, inventore!
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NewsLetter
