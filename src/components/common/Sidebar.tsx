import { Link } from 'react-router-dom';
import { House } from 'lucide-react';

type SidebarProps = {
  collapsed: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  return (
    <ul
      className={`menu text-base-content min-h-full space-y-2 border-e border-e-gray-700 bg-zinc-900 p-4 text-xl ${
        collapsed ? 'w-20' : 'w-80'
      }`}
    >
      <li>
        <Link title="Tarantulas" to="/">
          {collapsed ? (
            <House size={26}/>
          ) : (
            'Tarantula'
          )}
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;