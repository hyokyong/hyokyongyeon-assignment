import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@/stores/authStore'
import { Button, Input, Modal } from '@/components/common'
import { signIn } from '@/api/auth'

/**
 * 로그인 폼 유효성 스키마
 * - email: 이메일 규약, 필수
 * - password: 영문·숫자만, 8~24자, 필수
 */
const signInSchema = z.object({
  email: z
    .string()
    .min(1, '이메일을 입력해주세요.')
    .email('이메일 형식이 올바르지 않습니다.'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요.')
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(24, '비밀번호는 24자 이하여야 합니다.')
    .regex(/^[a-zA-Z0-9]+$/, '비밀번호는 영문과 숫자만 사용할 수 있습니다.'),
})

type SignInFormValues = z.infer<typeof signInSchema>

/**
 * 로그인 페이지
 * - React Hook Form + Zod
 * - axios(apiClient) + useMutation 으로 POST /api/sign-in
 */
const SignInPage = () => {
  const navigate = useNavigate()
  const { setAccessToken } = useAuthStore()

  /** 에러 모달 상태 */
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  /** 로딩 상태 */
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  })

  /** 폼 제출 핸들러 */
  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true)

    try {
      const { accessToken, refreshToken } = await signIn(data)

      /** accessToken: Zustand 메모리 저장 */
      setAccessToken(accessToken)
      /** refreshToken: localStorage 저장 */
      localStorage.setItem('refreshToken', refreshToken)

      /** 로그인 성공 시 대시보드로 이동 */
      navigate('/')
    } catch (error: any) {
      /** API 실패 시 errorMessage 모달 표시 */
      const message =
        error.response?.data?.errorMessage ?? '로그인에 실패했습니다.'
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-default px-4">
      <div className="w-full max-w-sm bg-bg-card rounded-lg shadow-sm border border-border p-8">
        <h1 className="text-xl font-semibold text-text-primary text-center mb-6">
          로그인
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          <Input
            label="이메일"
            type="email"
            autoComplete="email"
            placeholder="example@email.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="비밀번호"
            type="password"
            autoComplete="current-password"
            placeholder="영문·숫자 8~24자"
            error={errors.password?.message}
            {...register('password')}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            disabled={!isValid || isLoading}
          >
            로그인
          </Button>
        </form>
      </div>

      {errorMessage && (
        <Modal
          title="로그인 실패"
          onClose={() => setErrorMessage(null)}
          footer={
            <Button
              variant="primary"
              size="md"
              onClick={() => setErrorMessage(null)}
            >
              확인
            </Button>
          }
        >
          <p className="text-sm text-text-secondary">{errorMessage}</p>
        </Modal>
      )}
    </div>
  )
}

export default SignInPage
