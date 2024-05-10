import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import Input from "../ui/Input";
import Button from "../ui/Button";
import loginAdmin from './api/login';
export function ModalLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;
    try {
      result = await loginAdmin(email, password);
      console.log(result);
      if (result.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
      <Input label="Email" placeholder="Enter your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Password" placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button >Login</Button>
    </form>

  );
}