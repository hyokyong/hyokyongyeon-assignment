/**
 * 스피너 크기 — Button size와 맞춤
 */
type SpinnerSize = 'sm' | 'md' | 'lg'

interface SpinnerProps {
  size?: SpinnerSize
  className?: string
}

/** size별 박스/보더 두께 */
const sizeClass: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-6 w-6 border-[3px]',
}

/**
 * 로딩 스피너
 * - animate-spin + border 트릭
 * - 색상: 부모에 text-white 등 주면 border-current로 맞춰짐
 */
export const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => {
  return (
    <span
      role="status"
      aria-label="로딩 중"
      className={[
        'inline-block shrink-0 rounded-full border-solid border-current border-t-transparent animate-spin',
        sizeClass[size],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}
