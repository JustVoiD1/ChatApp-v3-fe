import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, type ChangeEvent, type FormEvent } from "react"
import type { User } from "@/App"
import { useNavigate } from "react-router-dom"

interface FormDataType {
    roomId: string,
    fullname: string,
    email: string,
    username: string,
}
export function LoginForm({className, onLogin}: {className?: string, onLogin: (roomId: string, user: User) => void}) {

    const navigate = useNavigate()

    const [formData, setFormData] = useState<FormDataType>({
        roomId: "",
        fullname: "",
        email: "",
        username: ""
    })

    const handleJoinRoom = (e: FormEvent) => {
        const {fullname, email, username} = formData
        e.preventDefault()
        const user = {fullname, email, username}
        const roomId = formData.roomId
        onLogin(roomId, user)

        
        console.log('Logged in')
        navigate('/chat')

    }



    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Card>
                
                <CardContent>
                    <form onSubmit={handleJoinRoom}>
                        <div className="grid gap-6">
                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground font-bold text-xl font-stretch-semi-condensed relative z-10 px-2">
                                    Join a chat room
                                </span>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="roomId">Room Id</Label>
                                    <Input
                                        className="border-2 border-border"
                                        onChange={handleChange}
                                        id="roomId"
                                        name="roomId"
                                        type="text"
                                        placeholder="Enter room id"
                                        required
                                        value={formData.roomId}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        className="border-2 border-border"
                                        onChange={handleChange}
                                        id="fullname"
                                        name="fullname"
                                        type="text"
                                        placeholder="Your Full name"
                                        required
                                        value={formData.fullname}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        className="border-2 border-border"
                                        onChange={handleChange}
                                        id="email"
                                        name="email"
                                        type="text"
                                        placeholder="Your email"
                                        required
                                        value={formData.email}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        className="border-2 border-border"
                                        onChange={handleChange}
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Your username"
                                        required
                                        value={formData.username}
                                    />
                                </div>
                                {/* <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div> */}
                                <Button type="submit" className="w-full">
                                    Join Room
                                </Button>
                            </div>
                            {/* <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <a href="#" className="underline underline-offset-4">
                                    Sign up
                                </a>
                            </div> */}
                        </div>
                    </form>
                </CardContent>
            </Card>
            {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div> */}
        </div>
    )
}
