"use client"
import { Button } from '@/components/ui/button'
import { loginWithEmail } from '@/lib/authAction'
import React, { useState } from 'react'

function EmailForm() {
  const [email, setEmail] = useState("")

  const login = () => {
    let emailData = new FormData();
    emailData.append("email", email);
    loginWithEmail(emailData)
  }

  return (
    <>
        <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="p-2 w-full mt-5 border-b-2 border-black border-opacity-5"
        />
        <Button onClick={login} className='mt-10 w-full'> 
            Log in with Email
        </Button>
    </>
  )
}

export default EmailForm