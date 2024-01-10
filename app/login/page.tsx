import { auth } from "@/auth"
import AuthButton from "@/components/interface/AuthButton";

async function LoginPage() {
  const session = await auth();
  return (
    <div className='grid grid-flow-col grid-cols-3'>
      <div className='flex items-center justify-center h-screen'>
        <div className='w-5/6 p-10'>
          <p className='text-3xl font-semibold mb-10'>Plant.co🪴</p>
          <p className='text-4xl font-semibold mb-3'>Welcome!</p>
          <p className='ml-1 text-sm'>We source the healthiest and most beautiful plants to bring nature's finest to your home. We provide expert care advice to ensure your plants thrive.</p>
          {
            session === null ?
            <AuthButton style='mt-5' type="login">Log in with Google</AuthButton> :
            <p className="text-sm">You are already logged in!</p>
          }
        </div>
      </div>
      <div className='bg-blue-500 h-screen col-span-2 leaf-container flex items-center justify-center'>
        <div className='bg-white p-10 rounded-md w-1/2'>
          <p className="text-center text-2xl font-semibold">Plant.co 🪴</p>
          <p className='text-center mt-5'>or login using email and password</p>
          <input placeholder='Username' className='p-2 w-full  mt-5 border-b-2 border-black border-opacity-5'/>
          <input placeholder='Email' type="email" className='p-2 w-full mt-5 border-b-2 border-black border-opacity-5'/>
          <div className="flex items-center mt-5 w-full border-b-2 border-black border-opacity-5">
            <input placeholder='Password' type="password" className='p-2 w-full '/>
          </div>
          <AuthButton style='mt-10 w-full' type="logout">Log in with Email</AuthButton>

        </div>
      </div>
    </div>
  )
}

export default LoginPage