import { useInView } from 'react-intersection-observer';

/**
 * 捲動載入動畫組件
 * @param {object} props
 * @param {React.ReactNode} props.children - 要套用動畫的內容
 * @param {string} [props.className] - 額外的 CSS class, 例如 "reveal-1", "reveal-2"
 * @param {number} [props.threshold=0.1] - 觸發動畫的可見百分比
 */
const Reveal = ({ children, className = '', threshold = 0.1 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // 動畫只觸發一次
    threshold: threshold,
  });

  // 基礎 class 是 'reveal'
  // 當 inView 為 true (進入畫面) 時，添加 'visible' class
  const classes = `reveal ${inView ? 'visible' : ''} ${className}`;

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
};

export default Reveal;