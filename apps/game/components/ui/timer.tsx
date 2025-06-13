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

  const seconds = totalSeconds >= 0 ? totalSeconds : 0

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
    <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
      <span className="countdown font-mono text-5xl">
        <span
          style={
            {
              '--value': seconds,
            } as React.CSSProperties
          }
          aria-live="polite"
          aria-label="Countdown Timer"
        >
          {seconds}
        </span>
      </span>
    </div>
  )
}

export const Timer = forwardRef<TimerRef, TimerProps>(InternalTimer)
