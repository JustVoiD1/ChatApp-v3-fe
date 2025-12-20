import { LoginForm } from "./login-form"
import { MessageCircle } from 'lucide-react';

export type User = {
  fullname: string,
  email: string,
  username: string
}
export const LoginPage = ({setRoomId, roomId, setUser, user}) => {


  return <>

    <div className="w-full bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <MessageCircle className="size-6" />
          </div>
          ChatMon
        </a>
        <LoginForm
          onLogin={(roomId, user) => {
            setRoomId(roomId)
            setUser(user)
          }}
        />
      </div>
    </div>
  </>
}