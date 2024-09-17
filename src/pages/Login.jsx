import React from 'react'
import { Login as loginComponent } from '../components'
import { ErrorBoundary } from 'react-error-boundary'
function Login() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerPage}
      onError={() => console.log("Error happened!")}
    >
      <div className='py-8'>
        <loginComponent />
      </div>
    </ErrorBoundary>
  )
}

export default Login