import React, {useState} from 'react';

const Tabs = ({onTabChange, tabs, initialTab}) => {

  const [activeTab, setActiveTab] = useState(initialTab || 0);
  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    onTabChange(tabIndex);
  }
  
  return (
    <div className="tabs">
    <ul>
      {
        tabs.map((t, index) => (
          <li 
            key={index} 
            className={index === activeTab ? 'is-active':''}
            onClick={() => handleTabChange(index)}
            >
              <a>{t.label}</a>
          </li>
        ))
      }
    </ul>
  </div>
  )

}

export default Tabs;