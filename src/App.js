import './App.css';
import LoginForm from './container/LoginForm';
import { NotificationProvider } from './container/NotificationContext';

function App() {
  return (
    <NotificationProvider>
    <LoginForm />
  </NotificationProvider>
  );
}

export default App;
