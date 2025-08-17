import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignInpage() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <SignIn/>

    </div>
  )
}

export default SignInpage