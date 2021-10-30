import { Link } from 'react-router-dom';

// local dependencies
import { useAuth } from 'src/lib/auth';

type UserNavigationItem = {
  name: string;
  to: string;
  onClick?: () => void;
};

export const UserNavigation = () => {
  const { logout } = useAuth();

  const userNavigation = [
    { name: 'Your Profile', to: './profile' },
    {
      name: 'Sign out',
      to: '',
      onClick: () => {
        logout();
      },
    },
  ].filter(Boolean) as UserNavigationItem[];

  return (
    <ul>
      {userNavigation.map((item) => (
        <li key={item.name}>
          <Link
            onClick={item.onClick}
            to={item.to}
            className="'block px-4 py-2 text-sm'"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
