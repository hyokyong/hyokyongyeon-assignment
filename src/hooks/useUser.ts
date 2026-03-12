import { useSuspenseQuery } from '@tanstack/react-query'
import { getUser } from '@/api/user'

/** 회원정보 조회 훅 */
export const useUser = () => {
  return useSuspenseQuery({
    queryKey: ['user'],
    queryFn: getUser,
  })
}
