<script setup lang="ts">
defineOptions({ name: 'AboutEmanatingParticles' })

const props = withDefaults(
  defineProps<{
    active?: boolean
  }>(),
  { active: true },
)

const containerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  r: number
}

const particles: Particle[] = []
let raf = 0
let w = 0
let h = 0
let ctx: CanvasRenderingContext2D | null = null
let creamFill = '#ffcf99'

function readCreamColor() {
  const el = containerRef.value ?? document.documentElement
  const v = getComputedStyle(el).getPropertyValue('--cream').trim()
  if (v) creamFill = v
}

function resize() {
  const el = containerRef.value
  const c = canvasRef.value
  if (!el || !c) return
  readCreamColor()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = Math.max(1, Math.floor(el.clientWidth))
  h = Math.max(1, Math.floor(el.clientHeight))
  c.width = Math.floor(w * dpr)
  c.height = Math.floor(h * dpr)
  c.style.width = `${w}px`
  c.style.height = `${h}px`
  ctx = c.getContext('2d')
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function spawn() {
  particles.push({
    x: Math.random() * w,
    y: h + 6 + Math.random() * 18,
    vx: (Math.random() - 0.5) * 0.5,
    vy: -(0.85 + Math.random() * 1.65),
    life: 1 + Math.random() * 0.45,
    r: 1.1 + Math.random() * 3.2,
  })
}

function tick() {
  const c = canvasRef.value
  if (!c || !ctx || w < 1 || h < 1) {
    raf = requestAnimationFrame(tick)
    return
  }

  if (!props.active) {
    ctx.clearRect(0, 0, w, h)
    if (particles.length) particles.length = 0
    raf = requestAnimationFrame(tick)
    return
  }

  ctx.clearRect(0, 0, w, h)

  const spawnChance = w > 600 ? 0.62 : 0.44
  if (Math.random() < spawnChance) spawn()
  if (Math.random() < spawnChance * 0.72) spawn()
  if (Math.random() < spawnChance * 0.38) spawn()

  ctx.fillStyle = creamFill

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]!
    p.x += p.vx
    p.y += p.vy
    p.vx += (Math.random() - 0.5) * 0.02
    p.life -= 0.0024 + Math.random() * 0.0011

    if (p.y < -12 || p.life <= 0) {
      particles.splice(i, 1)
      continue
    }

    const t = 1 - p.y / (h + 48)
    const edgeFade = Math.min(1, t * 1.08)
    const a = Math.max(0, p.life * 0.68 * edgeFade)
    ctx.globalAlpha = a
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1

  raf = requestAnimationFrame(tick)
}

let ro: ResizeObserver | null = null

onMounted(() => {
  readCreamColor()
  resize()
  window.addEventListener('resize', resize)
  ro = new ResizeObserver(() => resize())
  if (containerRef.value) ro.observe(containerRef.value)
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  ro?.disconnect()
  cancelAnimationFrame(raf)
  particles.length = 0
})
</script>

<template>
  <div
    ref="containerRef"
    class="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-[min(50vh,420px)] mask-[linear-gradient(to_top,black_0%,black_38%,black_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_0%,black_38%,black_55%,transparent_100%)]"
    aria-hidden="true"
  >
    <canvas ref="canvasRef" class="block size-full" />
  </div>
</template>
