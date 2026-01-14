import './App.css';
import { Routes, Route, Navigate} from 'react-router-dom'
import SigninPage from './components/Signin';
import SignupPage from './components/Signup';
import HomePage from './components/Home';
import ChatWindow from './components/chatwindow';
import { useLocation } from 'react-router-dom';

export type User = {
  username: string
}

function ChatRoute() {
  const location = useLocation()
  const roomId = location.state?.roomId
  const user = location.state?.user
  
  if (!localStorage.getItem("token") || !roomId || !user) {
    return <Navigate to="/signin" replace />
  }
  return <ChatWindow roomId={roomId} user={user}/>
}

function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-background">
        <Routes>
          <Route
            path="/signup"
            element={
              < SignupPage />
            }
          />
          <Route
            path="/signin"
            element={
              <SigninPage />
            }
          />
          <Route
            path="/home"
            element={ 
              // auth.user ? 
            <HomePage /> 
            // : <Navigate to="/signin" replace/>
            }
          />
          <Route
            path="/chat"
            element={<ChatRoute />}
          />
          <Route
            path="/"
            element={<Navigate to={"/signin"} replace />}
          />
        </Routes>
    </div>
  );
}

export default App;
