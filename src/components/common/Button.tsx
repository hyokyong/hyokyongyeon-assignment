import type { ButtonHTMLAttributes } from 'react'

/** 버튼 variant 타입 */
type ButtonVariant = 'primary' | 'danger' | 'ghost'

/** 버튼 size 타입 */
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼 스타일 종류 - primary: 주요 액션, danger: 삭제/위험, ghost: 보조 액션 */
  variant?: ButtonVariant
  /** 버튼 크기 */
  size?: ButtonSize
  /** 로딩 상태 - true면 Spinner 표시 및 클릭 비활성화 */
  isLoading?: boolean
}

/** variant별 스타일 */
const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:opacity-90',
  danger: 'bg-danger text-white hover:opacity-90',
  ghost:
    'bg-transparent text-text-primary border border-border-strong hover:bg-bg-default',
}

/** size별 스타일 */
const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

/**
 * 공통 버튼 컴포넌트
 * - variant: primary(주요액션), danger(삭제), ghost(보조)
 * - size: sm, md, lg
 * - isLoading: 로딩 스피너 표시
 * - disabled: disabled 색상 토큰 적용
 */
export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || isLoading

  return (
    <button
      disabled={isDisabled}
      className={[
        'flex items-center justify-center gap-2 rounded-md font-medium transition-opacity',
        /* disabled/loading 아닐 때만 variant 스타일 적용 */
        !isDisabled ? variantStyles[variant] : '',
        sizeStyles[size],
        /* disabled 상태: disabled 색상 토큰 적용, 클릭 불가 */
        isDisabled
          ? 'bg-disabled text-white cursor-not-allowed opacity-60 border-none'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {/* 로딩 시 Spinner 연동은 사용처에서 children 앞에 배치하거나 추후 확장 */}
      {children}
    </button>
  )
}
