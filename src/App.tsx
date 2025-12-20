import { useState } from 'react';
import './App.css';
import ChatWindow from './components/chatwindow';
import { LoginPage } from './components/login-page';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

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
            element={
              <LoginPage 
                setRoomId={setRoomId}
                roomId={roomId}
                setUser={setUser}
                user={user}/>
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
