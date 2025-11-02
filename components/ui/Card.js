import React from 'react';

/**
 * 可重用的卡片組件
 * @param {object} props
 * @param {React.ReactNode} props.children - 卡片內容
 * @param {boolean} [props.hoverEffect=false] - 是否啟用 .card-hover 效果
 * @param {string} [props.className] - 額外的 CSS class (例如 'text-center')
 */
const Card = ({ children, hoverEffect = false, className = '' }) => {
  // 組合 CSS class
  const classes = `
    card 
    ${hoverEffect ? 'card-hover' : ''} 
    ${className}
  `;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;