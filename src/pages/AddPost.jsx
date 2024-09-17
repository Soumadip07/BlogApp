import React from 'react'
import { Container, PostForm } from '../components'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorHandlerPage from '../components/ErrorHandle/ErrorBoundary'

function AddPost() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerPage}
      onError={() => console.log("Error happened!")}
    >
      <div className='py-8'>
        <Container>
          <PostForm />
        </Container>
      </div>
    </ErrorBoundary>
  )
}

export default AddPost