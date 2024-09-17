import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import appwriteService from "../appwrite/conifg.js";
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorHandlerPage from '../components/ErrorHandle/ErrorBoundary.jsx';

function EditPost() {
    const [post, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    return post ? (
        <ErrorBoundary
            FallbackComponent={ErrorHandlerPage}
            onError={() => console.log("Error happened!")}
        >
            <div className='py-8'>
                <Container>
                    <PostForm post={post} />
                </Container>
            </div>
        </ErrorBoundary>
    ) : null
}

export default EditPost