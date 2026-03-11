import { authHandlers } from './auth'
import { userHandlers } from './user'
import { dashboardHandlers } from './dashboard'
import { taskHandlers } from './task'

/** MSW에 등록할 전체 핸들러 — 도메인만 쓸 때는 `@/mocks/handlers/auth` 등에서 직접 import */
export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...dashboardHandlers,
  ...taskHandlers,
]
