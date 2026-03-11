interface ErrorMessageProps {
  message: string
}

/**
 * 공통 에러 메시지 컴포넌트
 * - 폼 유효성 에러 문구에 사용
 * - Input 컴포넌트 내부에서도 사용
 */
export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <p className="text-xs text-danger" role="alert">
      {message}
    </p>
  )
}
