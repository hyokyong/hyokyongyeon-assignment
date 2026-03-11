import { http, HttpResponse } from 'msw'
import type {
  TaskListResponse,
  TaskDetailResponse,
  DeleteTaskResponse,
} from '@/types/api/task'
import type { ErrorResponse } from '@/types/api/common'

/** 목 데이터 총 페이지 수 */
const TOTAL_PAGES = 3

/** 페이지당 아이템 수 */
const ITEMS_PER_PAGE = 20

/**
 * 할 일 목록 조회 (페이지네이션)
 * - page 쿼리 파라미터 필수 (1부터 시작)
 * - 페이지당 ITEMS_PER_PAGE 개 반환
 * - TOTAL_PAGES 초과 시 빈 배열 + hasNext: false 반환
 */
const getTaskList = http.get('/api/task', ({ request }) => {
  const url = new URL(request.url)
  const page = Number(url.searchParams.get('page') ?? '1')

  if (page > TOTAL_PAGES) {
    return HttpResponse.json<TaskListResponse>({
      data: [],
      hasNext: false,
    })
  }

  const data = Array.from({ length: ITEMS_PER_PAGE }, (_, i) => {
    const id = String((page - 1) * ITEMS_PER_PAGE + i + 1)
    return {
      id,
      title: `할 일 ${id}`,
      memo: `할 일 ${id}번의 메모 내용입니다.`,
      status: (i % 2 === 0 ? 'TODO' : 'DONE') as 'TODO' | 'DONE',
    }
  })

  return HttpResponse.json<TaskListResponse>({
    data,
    hasNext: page < TOTAL_PAGES,
  })
})

/**
 * 할 일 상세 조회
 * - id: 9999 는 404 테스트용 목 데이터
 */
const getTaskDetail = http.get('/api/task/:id', ({ params }) => {
  const { id } = params

  if (id === '9999') {
    return HttpResponse.json(
      { errorMessage: '존재하지 않는 할 일입니다.' } satisfies ErrorResponse,
      { status: 404 }
    )
  }

  return HttpResponse.json({
    title: `할 일 ${id}`,
    memo: `할 일 ${id}번의 상세 메모 내용입니다.`,
    registerDatetime: new Date().toISOString(),
  } satisfies TaskDetailResponse)
})

/**
 * 할 일 삭제
 * - id: 9999 는 404 테스트용 목 데이터
 */
const deleteTask = http.delete('/api/task/:id', ({ params }) => {
  const { id } = params

  if (id === '9999') {
    return HttpResponse.json(
      { errorMessage: '존재하지 않는 할 일입니다.' } satisfies ErrorResponse,
      { status: 404 }
    )
  }

  return HttpResponse.json({ success: true } satisfies DeleteTaskResponse)
})

export const taskHandlers = [getTaskList, getTaskDetail, deleteTask]
