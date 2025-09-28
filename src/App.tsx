import { useState } from 'react';
import './App.css';
import ChatWindow from './components/chatwindow';
import { LoginForm } from './components/login-form';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { MessageCircle } from 'lucide-react';

export type User = {
  fullname: string,
  email: string,
  username: string
}
function App() {
  const [user, setUser] = useState<User | null>(null)
  const [roomId, setRoomId] = useState<string | null>(null)
  return (

    <div className="h-screen flex items-center justify-center bg-background">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<>
              
              <div className="w-full bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                  <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                      <MessageCircle className="size-6" />
                    </div>
                    ChatMon
                  </a>
                  <LoginForm
                    onLogin={(roomId, userInfo) => {
                      setRoomId(roomId)
                      setUser(userInfo)
                    }}
                  />
                </div>
              </div>
            </>
            }
          />
          <Route
            path="/chat"
            element={
              roomId && user ? (
                <ChatWindow roomId={roomId} user={user} />
              ) : (
                // If not logged in, redirect to login
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/"
            element={<Navigate to={roomId && user ? "/chat" : "/login"} replace />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
