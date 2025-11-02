import { useState } from 'react';

/**
 * 可重用的翻轉卡片組件
 * (移植自 index.html 的 .flip-card 和第 6 點 JS)
 *
 * @param {object} props
 * @param {React.ReactNode} props.frontContent - 卡片正面的內容 (JSX)
 * @param {React.ReactNode} props.backContent - 卡片背面的內容 (JSX)
 * @param {string} [props.className] - 額外的 CSS class (例如 'reveal' 動畫)
 */
const FlipCard = ({ frontContent, backContent, className = '' }) => {
  // 1. 轉換「點擊翻轉」:
  //    使用 useState 追蹤翻轉狀態 (取代 .flipped class)
  const [isFlipped, setIsFlipped] = useState(false);

  // 2. 轉換「點擊事件」:
  //    取代 document.querySelectorAll...addEventListener
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // 3. 組合 class:
  //    - 'flip-card' 是基礎樣式
  //    - 'flipped' class 根據 state 動態添加
  //    - 傳入的 className (例如 'reveal reveal-1')
  const classes = `flip-card ${isFlipped ? 'flipped' : ''} ${className}`;

  return (
    <div
      className={classes}
      onClick={handleClick}
      // 為了鍵盤可訪問性 (Accessibility)
      onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
      tabIndex="0" // 讓 div 可以被 focus, 如原型所示
    >
      <div className="flip-card-inner">
        {/* 卡片正面 */}
        <div className="flip-card-front">
          {frontContent}
        </div>
        
        {/* 卡片背面 */}
        <div className="flip-card-back">
          {backContent}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;