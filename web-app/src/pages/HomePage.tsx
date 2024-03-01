import { useNavigate } from "react-router-dom";
import { FooterDefault } from "../components/base/footers";

type Props = {}

export function HomePage(props: Props) {
  const navigate = useNavigate();

  function handleClickLogin() {
    navigate('/login')
  }

  function handleClickRegister() {
    navigate('/register')
  }

  return <div className="w-screen h-screen p-4 bg-cover flex flex-col">
    <div className="flex flex-col items-center justify-center grow gap-4">
      <button onClick={handleClickLogin}>
        Login
      </button>
      <button onClick={handleClickRegister}>
        Register
      </button>
    </div>
    <FooterDefault/>
  </div>
}
