// src/utils/animations.ts

// 用于整个页面的过渡 (如进入 Portfolio 页面)
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

// 新增：用于主页下半部分内容的左右切换动画
export const sectionVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 50 : -50, // 根据方向从右或左进入
    opacity: 0
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50, // 根据方向向右或左退出
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  })
};