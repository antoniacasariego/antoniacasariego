import { useCallback, useEffect, useMemo, useRef, useState } from "react"

const CHAR_W = 72   // a bit larger for your custom art
const CHAR_H = 90

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n))
}

function Buddy({ tint = "#2B6CB0" }: { tint?: string }) {
  // fallback vector if you don't provide images
  return (
    <svg width={CHAR_W} height={CHAR_H} viewBox="0 0 48 60" fill="none" aria-label="character">
      <rect x="6" y="10" width="36" height="36" rx="12" fill={tint} opacity="0.95" />
      <circle cx="18" cy="26" r="4" fill="#fff" />
      <circle cx="30" cy="26" r="4" fill="#fff" />
      <rect x="16" y="36" width="16" height="3" rx="1.5" fill="#fff" opacity="0.9" />
      <rect x="10" y="50" width="12" height="6" rx="2" fill="#334155" />
      <rect x="26" y="50" width="12" height="6" rx="2" fill="#334155" />
    </svg>
  )
}

function Star({ size = 16, className = "" }: { size?: number; className?: string }) {
  const isTwinkling = className.includes("star-twinkle")
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <img 
        src="/stars/star.png"
        alt="star"
        width={size}
        height={size}
        className={isTwinkling ? "star-normal" : ""}
        style={{ display: "block", position: "absolute", top: 0, left: 0 }}
      />
      <img 
        src="/stars/star_twinkle.png"
        alt="star twinkle"
        width={size}
        height={size}
        className={isTwinkling ? "star-twinkle-img" : ""}
        style={{ display: "block", position: "absolute", top: 0, left: 0 }}
      />
    </div>
  )
}

export default function CharacterWalker(props: {
  nameText?: string
  nameSize?: number
  railYPercent?: number   // 0–100: where the rail sits vertically
  speed?: number
  onFinish?: () => void
  avatarTint?: string
  height?: number
  idleSrc?: string        // NEW: custom idle image (PNG/SVG)
  walkSrc?: string        // NEW: custom walk image (PNG/SVG); falls back to idleSrc
}) {
  const {
    nameText = "Antonia Casariego Oronoz",
    nameSize = 72,
    railYPercent = 62,
    speed = 300,
    onFinish,
    avatarTint = "#2B6CB0",
    height = Math.max(520, window.innerHeight),
    idleSrc,
    walkSrc,
  } = props

  // Keep title and rail the same color
  const titleColor = "#1F2937"
  const lineColor  = titleColor

  const wrapRef = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(960)
  const [x, setX] = useState(8)
  const [y, setY] = useState(0)
  const [finished, setFinished] = useState(false)
  const [collectedStars, setCollectedStars] = useState<Set<number>>(new Set())

  const keys = useRef<Record<string, boolean>>({})
  const raf = useRef<number | null>(null)
  const last = useRef<number | null>(null)

  const letters = useMemo(() => nameText.split(""), [nameText])

  // Trigger onFinish when all 3 stars are collected
  useEffect(() => {
    if (collectedStars.size === 3 && !finished) {
      setFinished(true)
      onFinish?.()
    }
  }, [collectedStars.size, finished, onFinish])

  // measure
  const measure = useCallback(() => {
    const r = wrapRef.current?.getBoundingClientRect()
    if (!r) return
    setW(r.width)
    const railY = (railYPercent / 100) * r.height
    // sit above the line
    setY(railY - CHAR_H - 6)
    setX((cur) => Math.min(cur, r.width - CHAR_W))
  }, [railYPercent])

  useEffect(() => {
    measure()
    const onResize = () => measure()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [measure])

  // keyboard (and prevent page scrolling on space/arrow)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if ([" ", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(k)) {
        e.preventDefault() // <— stop the browser from scrolling the page
      }
      if (["arrowleft","a","arrowright","d"].includes(k)) keys.current[k] = true
    }
    const up = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false }
    window.addEventListener("keydown", down, { passive: false as any })
    window.addEventListener("keyup", up)
    return () => {
      window.removeEventListener("keydown", down as any)
      window.removeEventListener("keyup", up)
    }
  }, [])

  // movement loop
  const [isMoving, setIsMoving] = useState(false)
  const [dir, setDir] = useState<1 | -1 | 0>(0)

  useEffect(() => {
    function frame(t: number) {
      if (last.current == null) last.current = t
      const dt = Math.min(0.033, (t - last.current) / 1000)
      last.current = t

      const left = keys.current["arrowleft"] || keys.current["a"]
      const right = keys.current["arrowright"] || keys.current["d"]

      let vx = 0
      if (left && !right) { vx = -speed; setDir(-1) }
      else if (right && !left) { vx = speed; setDir(1) }
      else { setDir(0) }

      const moving = vx !== 0
      setIsMoving(moving)

      const nextX = clamp(x + vx * dt, 0, w - CHAR_W)
      setX(nextX)

      // Check for star collection
      const starSize = 50  // Match the star size constant
      const starGap = 20   // Match the star gap constant
      const starRightOffset = 60
      const characterCenterY = y + CHAR_H / 2 // Character's vertical center
      
      // Calculate star positions (from right to left)
      const starPositions = [0, 1, 2].map(i => {
        const starX = w - starRightOffset - (starSize + starGap) * (2 - i) - starSize / 2
        return starX
      })

      setCollectedStars(prev => {
        const newCollected = new Set(prev)
        const charCenterX = nextX + CHAR_W / 2
        const charCenterY = characterCenterY // Character's vertical center
        
        starPositions.forEach((starX, index) => {
          if (!newCollected.has(index)) {
            const starCenterX = starX + starSize / 2
            const starCenterYPos = characterCenterY // Stars are aligned at character's center
            const distance = Math.sqrt(
              Math.pow(charCenterX - starCenterX, 2) + 
              Math.pow(charCenterY - starCenterYPos, 2)
            )
            if (distance < (CHAR_W / 2 + starSize / 2)) {
              newCollected.add(index)
            }
          }
        })
        return newCollected
      })

      if (!finished && nextX >= w - CHAR_W - 1) {
        setFinished(true)
        onFinish?.()
      }

      raf.current = requestAnimationFrame(frame)
    }
    raf.current = requestAnimationFrame(frame)
    return () => { if (raf.current) cancelAnimationFrame(raf.current); last.current = null }
  }, [x, y, w, speed, finished, onFinish])

  const railTop  = y + CHAR_H + 6
  const titleTop = Math.max(24, y - nameSize - 28)

  // choose which art to render
  const showWalk = isMoving && (walkSrc || idleSrc)
  const showIdle = !isMoving && (idleSrc != null)

  // Calculate rotation: tilt right when walking forward (dir === 1)
  const rotation = isMoving && dir === 1 ? 15 : isMoving && dir === -1 ? -4 : 0

  // Star positions - aligned with character's center (half height)
  const starSize = 55  // Increased size for better visibility
  const starGap = -10   // Increased gap between stars
  const starRightOffset = 60
  const characterCenterY = y + CHAR_H / 2 // Character's vertical center
  const starPositions = [0, 1, 2].map(i => ({
    x: w - starRightOffset - (starSize + starGap) * (2 - i) - starSize / 2,
    y: characterCenterY - starSize / 2, // Center stars at character's vertical center
    index: i
  }))

  return (
    <div
      ref={wrapRef}
      className="walker"
      style={{ width: "100%", height, background: "transparent", position: "relative" }}
    >
      {/* Headline */}
      <div
        style={{
          position: "absolute",
          left: 0, right: 0, top: titleTop,
          textAlign: "center",
          userSelect: "none",
          color: titleColor,
          fontWeight: 500,
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          letterSpacing: -10,
          fontSize: nameSize,
          lineHeight: 1,
        }}
      >
        {letters.map((ch, i) => (
          <span key={i} style={{ display: "inline-block", padding: "0 4px" }}>
            {ch === " " ? <span style={{ display: "inline-block", width: 18 }} /> : ch}
          </span>
        ))}
      </div>

      {/* Rail — same color as name */}
      <div
        style={{
          position: "absolute",
          left: 0, right: 0,
          top: railTop,
          height: 1,
          background: lineColor,
        }}
      />

      {/* Three stars at the end of the rail */}
      {starPositions.map((star) => {
        if (collectedStars.has(star.index)) return null
        return (
          <div
            key={star.index}
            className="star-twinkle"
            style={{
              position: "absolute",
              left: star.x,
              top: star.y,
              animationDelay: `${star.index * 0.3}s`,
            }}
          >
            <Star size={starSize} className="star-twinkle" />
          </div>
        )
      })}

      {/* Character */}
      <div
        style={{
          position: "absolute",
          transform: `translate(${x}px, ${y}px)${rotation !== 0 ? ` rotate(${rotation}deg)` : ""}`,
          transformOrigin: "50% 100%",
          animation: isMoving ? "none" : "idleBob 1.4s ease-in-out infinite",
          width: CHAR_W, height: CHAR_H,
        }}
      >
        {showWalk ? (
          <img src={walkSrc || idleSrc!} alt="character walk" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : showIdle ? (
          <img src={idleSrc!} alt="character" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          <Buddy tint={avatarTint} />
        )}
      </div>

      <style>{`
        @keyframes idleBob {
          0%   { transform: translate(${x}px, ${y}px) }
          50%  { transform: translate(${x}px, ${y - 4}px) }
          100% { transform: translate(${x}px, ${y}px) }
        }
        @keyframes starShow {
          0% { 
            opacity: 1;
          }
          50% { 
            opacity: 0;
          }
          100% { 
            opacity: 1;
          }
        }
        @keyframes starTwinkleShow {
          0% { 
            opacity: 0;
          }
          50% { 
            opacity: 1;
          }
          100% { 
            opacity: 0;
          }
        }
        .star-normal {
          animation: starShow 1.5s ease-in-out infinite;
          opacity: 1;
        }
        .star-twinkle-img {
          animation: starTwinkleShow 1.5s ease-in-out infinite;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

