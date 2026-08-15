import React, { useRef, useState, useCallback } from 'react'

interface MagnetProps {
  children: React.ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = elementRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY

      const inBounds =
        e.clientX >= rect.left - padding &&
        e.clientX <= rect.right + padding &&
        e.clientY >= rect.top - padding &&
        e.clientY <= rect.bottom + padding

      if (inBounds) {
        setIsActive(true)
        setTransform({ x: distX / strength, y: distY / strength })
      } else {
        setIsActive(false)
        setTransform({ x: 0, y: 0 })
      }
    },
    [padding, strength]
  )

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

export default Magnet
