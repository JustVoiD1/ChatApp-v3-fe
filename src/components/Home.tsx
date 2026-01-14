import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
const HomePage = () => {
  const nav = useNavigate()
  const roomRef = useRef<HTMLInputElement | null>(null)
  const displayNameRef = useRef<HTMLInputElement | null>(null)

  const [user, setUser] = useState<string>("")
  const signout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    nav("/signin")
  }
  const handleJoinRoom = async (e: FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    if(!token || !user) {
      nav("/signin")
      return
    }

    const roomId = roomRef.current?.value
    const displayName = displayNameRef.current?.value
    
    if (!roomId || !displayName) return
    
    nav("/chat", {
      state: {
        roomId,
        user: {
          username: displayName
        }
      }
    })
  }
  

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    
    if (!user || !token) nav("/signin")
    else setUser(user)

  }, [])
  return (
    <div className="min-h-screen bg-card">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {user.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Welcome back, {user}!
              </h1>
              <p className="text-sm text-muted-foreground">Ready to start chatting?</p>
            </div>
          </div>
          <Button
            onClick={() => signout()}
            variant="outline"
            className="hover:bg-destructive text-destructive hover:text-destructive-foreground transition-colors"
          >
            Signout
          </Button>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-xl backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-2">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">
                  Get Started
                </h2>
                <p className="text-muted-foreground">
                  Create a new room or join an existing one to start chatting with others
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="default">Join Room</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Join Room</DialogTitle>
            <DialogDescription>
              Enter a room Id to Join room
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="room-1">Room id</Label>
              <Input id="room-1" name="room" placeholder='room id here' ref={roomRef}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="displayName-1">Display name</Label>
              <Input id="displayName-1" name="displayName" placeholder='your name to display' ref={displayNameRef} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleJoinRoom}>Join</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>



              </div>
            </div>
          </Card>

          {/* Quick Stats or Info Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="p-6 text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">0</div>
              <div className="text-sm text-muted-foreground mt-1">Active Rooms</div>
            </Card>
            <Card className="p-6 text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">0</div>
              <div className="text-sm text-muted-foreground mt-1">Messages Today</div>
            </Card>
            <Card className="p-6 text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">0</div>
              <div className="text-sm text-muted-foreground mt-1">Online Users</div>
            </Card>
          </div> */}
        </div>
      </div >
    </div >
  )
}

export default HomePage