import { useNavigate } from 'react-router-dom'
import { useUser } from '@/hooks/useUser'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/common/Button'
import { Card } from '@/components/common/Card'

const UserPage = () => {
  const navigate = useNavigate()
  const { data } = useUser()
  const { clearAuth } = useAuthStore()

  /** 로그아웃 처리 */
  const handleLogout = () => {
    clearAuth()
    /** 로그인 페이지로 redirect */
    navigate('/sign-in')
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary">회원정보</h2>
        <Button variant="ghost" size="md" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>

      {/* 회원정보 카드 */}
      <Card>
        <div className="flex flex-col gap-4">
          {/* 이름 */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-text-secondary">이름</span>
            <p className="text-base font-semibold text-text-primary">
              {data.name}
            </p>
          </div>

          {/* 메모 */}
          <div className="flex flex-col gap-1">
            <span className="text-xs text-text-secondary">메모</span>
            <p className="text-sm text-text-primary whitespace-pre-wrap">
              {data.memo}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default UserPage
