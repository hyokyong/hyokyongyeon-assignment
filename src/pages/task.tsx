import { useEffect, useRef, useMemo } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useTaskList } from '@/hooks/useTaskList'
import TaskCard from '@/components/taskCard'
import { EmptyState } from '@/components/common/EmptyState'

const TaskPage = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useTaskList()

  const scrollRef = useRef<HTMLDivElement>(null) // 스크롤 컨테이너 ref

  const tasks = useMemo(
    () => data.pages.flatMap((page) => page.data), //1차원 배열로 평탄화
    [data.pages] // data.pages가 바뀔 때만 재실행
  )

  const virtualizer = useVirtualizer({
    count: tasks.length, // 전체 아이템 수
    getScrollElement: () => scrollRef.current, // 스크롤 컨테이너
    estimateSize: () => 100, // 아이템 예상 높이
    overscan: 5, // 화면 밖 미리 렌더링할 아이템 수 (스크롤 버벅임 방지)
  })

  const virtualItems = virtualizer.getVirtualItems() // 현재 화면에 보여야할 목록만 보임

  /**
   * 스크롤 끝 감지 → 다음 페이지 호출
   * - 마지막 가상 아이템이 전체 목록 끝 5개 안에 들어오면 fetchNextPage 호출
   */
  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1]
    if (!lastItem) return

    if (
      lastItem.index >= tasks.length - 5 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage()
    }
  }, [
    virtualItems,
    tasks.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ])

  /** 빈 목록 */
  if (tasks.length === 0) {
    return (
      <EmptyState
        title="할 일이 없어요."
        description="아직 등록된 할 일이 없습니다."
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 페이지 타이틀 */}
      <h2 className="text-xl font-bold text-text-primary">할 일 목록</h2>

      {/**
       * 스크롤 컨테이너
       * - h-[calc(100vh-160px)]: 화면 높이에서 GNB/타이틀 높이 제외
       */}
      <div ref={scrollRef} className="overflow-auto h-[calc(100vh-160px)]">
        {/**
         * 가상 스크롤 전체 높이 컨테이너
         * - 실제로는 보이는 아이템만 렌더링되지만
         * - 스크롤바는 전체 높이 기준으로 표시됨
         */}
        <div
          style={{ height: `${virtualizer.getTotalSize()}px` }}
          className="relative"
        >
          {virtualItems.map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualItem.start}px)`,
              }}
              ref={virtualizer.measureElement}
              data-index={virtualItem.index}
            >
              {/* 각 가상 아이템 - absolute + transform으로 위치, measureElement로 높이 보정 */}
              <div className="pb-3">
                <TaskCard task={tasks[virtualItem.index]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TaskPage
