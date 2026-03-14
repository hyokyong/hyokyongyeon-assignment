/** 할 일 상태 - TODO: 미완료, DONE: 완료 */
export type TaskStatus = 'TODO' | 'DONE'

/** 할 일 목록 카드 아이템 */
export interface TaskItem {
  id: string
  title: string
  memo: string
  status: TaskStatus
}

/** 할 일 목록 응답 (페이지네이션) */
export interface TaskListResponse {
  data: TaskItem[]
  hasNext: boolean
}

/** 할 일 상세 응답 */
export interface TaskDetailResponse {
  title: string
  memo: string
  registerDatetime: string
}

/** 할 일 삭제 응답 */
export interface DeleteTaskResponse {
  success: true
}
