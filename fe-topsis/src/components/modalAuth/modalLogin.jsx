import { useState } from 'react'; 
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Link } from 'react-router-dom';

export function ModalLogin({ setIsOpen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="mb-4 flex flex-col gap-4">
      <Input label="Email" placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Password" placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={() => setIsOpen(false)}>Login</Button>
    </form>

  );
}