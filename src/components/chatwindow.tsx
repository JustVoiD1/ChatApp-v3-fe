import type { User } from "@/App";
import { useEffect, useRef, useState, type FormEvent } from "react";
import MessageBubble from "./chatbubble";
export interface message {
    sender: string,
    content: string,
    ts: Date
}

const ChatWindow = ({ className, roomId, user }: { className?: string, roomId: string, user: User }) => {

    const baseMessageStyle = "relative w-max max-w-[75%] px-3 py-2 text-sm rounded-lg flex bg-muted text-muted-foreground";
    const otherMessageStyle = `${baseMessageStyle} bg-muted text-foreground`;
    const myMessageStyle = `${baseMessageStyle} bg-primary text-primary-foreground ml-auto`;
    const wsRef = useRef<WebSocket | null>(null)
    const [isTyping, setIsTyping] = useState(true)
    // const [user, setUser] = useState({
    //     fullname: 'Mainak',
    //     email: 'mew@example.com',
    //     username: 'mew'
    // });





    const [messages, setMessages] = useState<message[]>([

    ])



    const bottomRef = useRef<HTMLDivElement>(null)

    const inputMessageRef = useRef<HTMLInputElement>(null)

    const sendMessage = (text: string) => {
        // setMessages((prevMessages) => [...prevMessages, { sender: user.username, content: text, ts: new Date() }])
        wsRef.current?.send(JSON.stringify({
            type: "chat",
            payload: {
                message: text,
                roomId: roomId,
                sender: user.username
            }
        }))

    }
    useEffect(() => {
        inputMessageRef.current?.focus()
    }, [])

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('WebSocket connected');
            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId: roomId
                }
            }))
        }

        ws.onmessage = (event) => {
            setIsTyping(true)
            console.log('Received message:', event.data);

            const parsedData = JSON.parse(event.data)

            if (parsedData.type === 'chat') {
                setMessages(m => [
                    ...m,
                    {
                        content: parsedData.payload.message,
                        sender: parsedData.payload.sender,
                        ts: new Date()
                    }
                ]);
            }
        }

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        }

        // CLEANUP FUNCTION - This is crucial!
        return () => {
            console.log('Cleaning up WebSocket connection');
            ws.close();
            wsRef.current = null;
        }

    }, [roomId]) // Keep roomId as dependency but add cleanup


    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const message = inputMessageRef.current?.value
        console.log(message)
        sendMessage(message || '')
        if (inputMessageRef.current) {
            inputMessageRef.current.value = ''
        }
    }
    return (<div className={`${className} w-full bg-muted flex min-h-svh items-center flex-col justify-center gap-6 p-6 md:p-10`}>
        <div className={`flex w-full max-w-sm flex-col gap-6">`}>
            <div
                data-slot="card"
                className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm max-h-full min-h-[70vh] overflow-hidden"
            >
                <div
                    data-slot="card-header"
                    className="@container/card-header auto-rows-min grid-rows-[auto_auto] gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 flex flex-row  justify-between items-center"
                >
                    <div className="flex items-center justify-center gap-4">
                        <span
                            data-slot="avatar"
                            className="relative flex size-8 items-center text-center justify-center shrink-0 overflow-hidden rounded-full border"
                        >
                            {/* <img
                            data-slot="avatar-image"
                            className="aspect-square size-full"
                            alt="Image"
                            src="/avatars/01.png"
                        /> */}
                            <span >
                                R
                            </span>
                        </span>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-sm leading-none font-medium">Room: {roomId}</p>
                            <p className="text-muted-foreground text-xs"><span className="font-semibold">Someone</span> is typing...</p>


                        </div>
                    </div>
                    <div className="w-fit flex items-center justify-around gap-2 text-wrap">
                        <span className="text-muted-foreground text-sm">signed in as <span className="font-bold">{user.username}</span></span>
                        {/* <button
                        data-slot="tooltip-trigger"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([className*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary text-secondary-foreground hover:bg-secondary/80 ml-auto size-8 rounded-full"
                        data-state="closed"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-plus"
                        >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                        </svg>
                        <span className="sr-only">New message</span>
                    </button> */}
                    </div>
                </div>

                <div data-slot="card-content" className="px-2 overflow-y-auto flex-1">
                    <div className="flex flex-col gap-4 max-h-80 overflow-y-auto">

                        {messages.map((m) => {
                            const mine = m.sender === user.username
                            return <MessageBubble className={mine ? myMessageStyle : otherMessageStyle}
                                mine={mine}
                                msg={m} />

                        })}
                        <div ref={bottomRef} />
                    </div>
                </div>

                <div data-slot="card-footer" className="flex items-center px-6 pt-4 sticky bottom-0 bg-card z-10">
                    <form className="relative w-full" onSubmit={handleSubmit}>
                        <input
                            data-slot="input"
                            className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex-1 pr-10"
                            id="message"
                            ref={inputMessageRef}
                            placeholder="Type your message..."
                            autoComplete="off"
                            required
                        />
                        <button
                            data-slot="button"
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([className*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 absolute top-1/2 right-2 size-6 -translate-y-1/2 rounded-full"
                            type="submit"
                            disabled={false}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-arrow-up size-3.5"
                            >
                                <path d="m5 12 7-7 7 7"></path>
                                <path d="M12 19V5"></path>
                            </svg>
                            <span className="sr-only">Send</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
};

export default ChatWindow;
