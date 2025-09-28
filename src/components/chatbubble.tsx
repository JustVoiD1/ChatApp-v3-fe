import type { message } from './chatwindow'


const MessageBubble = ({ className, mine, msg }: { className?: string, mine: boolean, msg: message }) => {
    const formatTime = (ts: Date) => {
        const d = new Date(ts)
        const hh = String(d.getHours()).padStart(2, '0')
        const mm = String(d.getMinutes()).padStart(2, '0')
        return `${hh}:${mm}`

    }

    return (<div className='flex flex-end items-start gap-2'>
        {!mine && <span
            data-slot="avatar"
            className="relative bg-muted-foreground/20 flex size-7 items-center text-center justify-center shrink-0 overflow-hidden rounded-full border text-sm"
        >
            {/* <img
                            data-slot="avatar-image"
                            className="aspect-square size-full"
                            alt="Image"
                            src="/avatars/01.png"
                        /> */}
            <span >
                {msg.sender[0]}
            </span>
        </span>}
        <div className={className}>
            <div className="pr-10 pb-4"> {/* padding to make room for timestamp */}
                {msg.content}
            </div>
            <span className={`absolute bottom-1 right-2 text-[10px] text-muted-foreground  ${mine ? 'text-white/50' : 'text-slate-400'}`}>
                {formatTime(msg.ts)}
            </span>
        </div>

    </div>
    )
}

export default MessageBubble