import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, type ChangeEvent } from "react"

interface FormDataType {
    fullname: string,
    email: string,
    username: string
}


export function JoinRoomModal() {
    const [formData, setFormdata] = useState<FormDataType>({
        fullname: "",
        email: "",
        username: ""
    })
    const handleJoinRoom = () => {
        console.log(formData)

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormdata((prev) => ({
            ...prev,
            [name]: value
        }))

    }
    return (
        <div className="flex items-center justify-center">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Join Room</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleJoinRoom}>
                        <DialogHeader>
                            <DialogTitle>Join a chat room</DialogTitle>
                            <DialogDescription>
                                Join to chat with your friends!
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name-1">Name</Label>
                                <Input id="fullname" value={formData.fullname} name="fullname" placeholder="Your Name" onChange={handleChange} required />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={formData.email} name="email" placeholder="youremail@example.com" onChange={handleChange} required />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" value={formData.username} name="username" placeholder="yourusername" onChange={handleChange} required />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog >
        </div>
    )
}
