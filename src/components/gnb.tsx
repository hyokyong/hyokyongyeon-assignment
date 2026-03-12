import { useNavigate } from 'react-router-dom'
import { User, LogIn } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore.ts'

/**
 * GNB (Global Navigation Bar)
 * - 상단 고정 네비게이션
 * - 로그인 상태에 따라 회원정보 or 로그인 아이콘 표시
 */
const GNB = () => {
  const navigate = useNavigate()
  const { accessToken } = useAuthStore()
  const isLoggedIn = !!accessToken

  return (
    <header className="h-14 px-6 flex items-center justify-between bg-bg-card border-b border-border">
      <h1
        className="text-lg font-bold text-primary cursor-pointer"
        onClick={() => navigate('/')}
      >
        Task Manager
      </h1>

      <button
        type="button"
        onClick={() => navigate(isLoggedIn ? '/user' : '/sign-in')}
        className="p-2 rounded-full hover:bg-bg-default transition-colors"
        aria-label={isLoggedIn ? '회원정보' : '로그인'}
      >
        {isLoggedIn ? (
          <User size={20} className="text-text-primary" />
        ) : (
          <LogIn size={20} className="text-text-primary" />
        )}
      </button>
    </header>
  )
}

export default GNB
