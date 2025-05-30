import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

export type TimerProps = {
  seconds?: number
  onFinish?: () => void
}

export type TimerRef = {
  start: (seconds?: number) => void
  stop: () => void
}

const InternalTimer = (
  { seconds: timeSeconds = 0, onFinish }: TimerProps,
  ref: React.Ref<TimerRef>,
) => {
  const [totalSeconds, setTotalSeconds] = useState(timeSeconds)
  const [isRunning, setIsRunning] = useState(false)

  const handleStart = useCallback((seconds?: number) => {
    setIsRunning(true)
    if (seconds) {
      setTotalSeconds(seconds)
    }
  }, [])

  const handleStop = useCallback(() => {
    setIsRunning(false)
  }, [])

  useImperativeHandle(ref, () => ({
    start: handleStart,
    stop: handleStop,
  }))

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleUpdatedTime = useCallback(() => {
    setTotalSeconds((prev) => {
      const newTime = prev - 1

      if (newTime < 0) {
        setIsRunning(false)
        onFinish?.()
      }

      return newTime
    })
  }, [onFinish])

  // biome-ignore lint/correctness/useExhaustiveDependencies: handleUpdatedTime
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(handleUpdatedTime, 1000)

      return
    }

    intervalRef.current && clearInterval(intervalRef.current)

    return () => {
      intervalRef.current && clearInterval(intervalRef.current)
    }
  }, [isRunning])

  return (
    <div className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 border border-neutral">
      <span className="font-bold text-4xl">
        {totalSeconds >= 0 ? totalSeconds : 0}
      </span>
    </div>
  )
}

export const Timer = forwardRef<TimerRef, TimerProps>(InternalTimer)
