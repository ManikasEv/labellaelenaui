import { motion, useReducedMotion } from 'framer-motion'

const easeOut = [0.22, 1, 0.36, 1]

const variants = {
  hero: {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85, ease: easeOut },
    },
  },
  about: {
    hidden: { opacity: 0, x: -72, rotate: -1 },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: { duration: 0.95, ease: easeOut },
    },
  },
  gallery: {
    hidden: { opacity: 0, y: 48, scale: 0.88 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 62, damping: 16, mass: 0.9 },
    },
  },
  menu: {
    hidden: { opacity: 0, y: 80, skewY: 3 },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { duration: 0.85, ease: easeOut },
    },
  },
  contact: {
    hidden: { opacity: 0, x: 72, scale: 0.97 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.9, ease: easeOut },
    },
  },
}

export default function ScrollReveal({ children, variant = 'hero', className = '', delay = 0 }) {
  const reducedMotion = useReducedMotion()
  const preset = variants[variant] ?? variants.hero

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -8% 0px' }}
      variants={{
        hidden: preset.hidden,
        visible: {
          ...preset.visible,
          transition: {
            ...preset.visible.transition,
            delay: delay / 1000,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
