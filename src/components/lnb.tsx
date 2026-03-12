import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, ListTodo } from 'lucide-react'

interface NavItem {
  path: string
  label: string
  icon: ReactNode
}

const NAV_ITEMS: NavItem[] = [
  { path: '/', label: '대시보드', icon: <LayoutDashboard size={18} /> },
  { path: '/task', label: '할 일', icon: <ListTodo size={18} /> },
]

const LNB = () => {
  return (
    <nav className="w-48 min-h-full bg-bg-card border-r border-border py-4">
      <ul className="flex flex-col gap-1 px-2">
        {NAV_ITEMS.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-text-secondary hover:bg-bg-default',
                ].join(' ')
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default LNB
