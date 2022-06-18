import { tw } from 'twind';
import { Button } from '../components/Button';
import logo from '../assets/LogoIFA.png';
import { Columns } from '../components/Columns';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <Columns className="items-center">
      <div className={tw(`col-span-4`)}>
        <img src={logo} alt="logo" className={tw(`w-full my-16`)} />
        <Button>
          <Link to="/home">Login</Link>
        </Button>
      </div>
    </Columns>
  );
};

export default LoginPage;
