/**
 * 날짜 포맷 함수
 * - ISO 8601 → 읽기 쉬운 형식
 * - 예: 2024-01-01T00:00:00.000Z → 2024년 1월 1일 00:00
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
