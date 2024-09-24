import React, { useState } from 'react';
import './Tooltip.css'; // For styling

const Tooltip = ({ text, children }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && <div className="tooltip-box" style={{textTransform:'capitalize',fontWeight:'500'}}>{text}</div>}
    </div>
  );
};

export default Tooltip;
