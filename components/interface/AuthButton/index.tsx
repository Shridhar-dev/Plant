
import { Button } from "@/components/ui/button"
import { signIn, signOut } from "../../../lib/auth"


function AuthButton({type, style, children}: {type: "login"|"logout", style:string, children:string}) {
  
  return (
    <form action={async () => {
      "use server"
      if(type === "login")
        await signIn("google") 
      else
        await signOut()
    }}>
      <Button className={style}>
        {children}
      </Button>
    </form>
  )
}

export default AuthButton