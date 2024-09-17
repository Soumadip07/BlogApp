import React from 'react'
import { Signup as SignupComponent } from '../components'
import { ErrorBoundary } from 'react-error-boundary'

function Signup() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerPage}
      onError={() => console.log("Error happened!")}
    >
      <div className='py-8'>
        <SignupComponent />
      </div>
    </ErrorBoundary>
  )
}

export default Signup