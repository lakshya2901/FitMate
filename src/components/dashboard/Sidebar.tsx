import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const pathname = usePathname();
  const isDashboardActive = pathname === '/dashboard';

  return (
    <aside
      className={`fixed h-full bg-gray-850 border-r border-gray-800 transition-all duration-300 z-20 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-cyan-500 hover:bg-cyan-600 rounded-full p-1 shadow-lg text-white"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Main Menu */}
      <nav className="mt-6 px-3">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard">
              <div
                className={`relative flex items-center p-3 rounded-lg transition-all ${
                  isDashboardActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 text-cyan-400'
                    : 'hover:bg-gray-800 text-gray-400 hover:text-white'
                }`}
              >
                <div className={isDashboardActive ? 'text-cyan-400' : 'text-gray-400'}>
                  <Home size={20} />
                </div>
                {!isCollapsed && (
                  <span className="ml-3">Dashboard</span>
                )}
                {isDashboardActive && !isCollapsed && (
                  <div className="w-1 h-6 bg-cyan-400 absolute right-0 rounded-l-full"></div>
                )}
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
