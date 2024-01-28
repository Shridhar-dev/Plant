import { auth } from "@/lib/auth";
import AuthButton from "@/components/interface/AuthButton";
import { redirect } from "next/navigation";
import EmailForm from "@/components/interface/EmailForm";

async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="grid grid-flow-col grid-cols-3">
      <div className="flex items-center justify-center h-screen">
        <div className="w-5/6 p-10">
          <p className="text-3xl font-semibold mb-10">Plantsco🪴</p>
          <p className="text-4xl font-semibold mb-3">Welcome!</p>
          <p className="ml-1 text-sm">
            We source the healthiest and most beautiful plants to bring nature
            {"'"}s finest to your home. We provide expert care advice to ensure
            your plants thrive.
          </p>
          {session === null ? (
            <AuthButton style="mt-5" type="login">
              Log in with Google
            </AuthButton>
          ) : (
            <p className="text-sm">You are already logged in!</p>
          )}
        </div>
      </div>
      <div className="bg-blue-500 h-screen col-span-2 leaf-container flex items-center justify-center">
        <div className="bg-white p-10 rounded-md w-1/2">
          <p className="text-center text-2xl font-semibold">Plantsco 🪴</p>
          <p className="text-center mt-5">or login using email</p>
          <EmailForm />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
