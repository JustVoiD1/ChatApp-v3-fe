// src/pages/Signin.tsx

import { Card, CardContent } from "./ui/card";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, type FormEvent } from "react";
import api from "@/lib/api";
export default function SigninPage() {
  const usernameOrEmailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState("")
  const nav = useNavigate()
  const handleSignIn = async (e: FormEvent) => {
    try {
      e.preventDefault()
      setLoading(true)
      const usernameOrEmail = usernameOrEmailRef.current?.value || ""
      const password = passwordRef.current?.value || ""
      const response = await api.post("/auth/signin",{usernameOrEmail, password})
      if(!response.data.message){
        throw new Error(response.data.error)
      }
      console.log(response.data)
      
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", response.data.user)      
      nav("/home")

    } catch (err: any) {
      setErr(err?.message || "Signin Failed")
    } finally {
      setLoading(false)
    }
    
  }
  

  return (
    <div className="w-full bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <MessageCircle className="size-6" />
          </div>
          ChatMon
        </a>
        <div className={cn("flex flex-col gap-6")}>
            <Card>
                
                <CardContent>
                    <form onSubmit={handleSignIn}>
                        <div className="grid gap-6">
                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground font-bold text-xl font-stretch-semi-condensed relative z-10 px-2">
                                    Sign in
                                </span>
                            </div>
                            <div className="grid gap-6">
                                
                                <div className="grid gap-3">
                                    <Label htmlFor="usernameOrEmail">Username or Email</Label>
                                    <Input
                                        className="border-2 border-border"
                                        ref={usernameOrEmailRef}
                                        id="username or email"
                                        name="username or email"
                                        type="text"
                                        placeholder="Your username or email"
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="password">Password</Label>
                                    <Input

                                        className="border-2 border-border"
                                        ref={passwordRef}
                                        id="password"
                                        name="password"
                                        type="text"
                                        placeholder="Your password"
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Link
                      to="/signup"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Don't have an account?
                    </Link>
                  </div>
                </div>
                {err && <div className="w-full text-center text-red-500">{err}</div>}
                                <Button type="submit" className="w-full" disabled={loading}>
                                    Sign in
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
      </div>
    </div>
  );
}