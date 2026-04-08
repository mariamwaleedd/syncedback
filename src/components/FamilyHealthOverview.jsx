import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './FamilyHealthOverview.css';

const familyMembers = [
  { id: 1, name: 'Mona', score: '92%', role: 'Mother', emoji: '😊' },
  { id: 2, name: 'Ahmed', score: '85%', role: 'Father', emoji: '👨' },
  { id: 3, name: 'Maya', score: '98%', role: 'Daughter', emoji: '😁' },
  { id: 4, name: 'Omar', score: '95%', role: 'Son', emoji: '👦' },
  { id: 5, name: 'Grandpa', score: '78%', role: 'Grandfather', emoji: '👴' },
  { id: 1, name: 'Grandma', score: '88%', role: 'Grandmother', emoji: '👵' },
  { id: 2, name: 'Aunt', score: '91%', role: 'Aunt', emoji: '👩' },
  { id: 3, name: 'Uncle', score: '82%', role: 'Uncle', emoji: '👨' },
  { id: 4, name: 'Cousin', score: '94%', role: 'Cousin', emoji: '👧' },
  { id: 5, name: 'Cousin', score: '96%', role: 'Cousin', emoji: '👧' },
];

const FamilyHealthOverview = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Month');

  return (
    <div className="familyhealthoverview-family-health-container">
      <div className="familyhealthoverview-family-health-header">
        <div className="familyhealthoverview-header-text">
          <h1>Family Health Overview</h1>
          <p>Average Health Score: 81%</p>
        </div>
        <div className="familyhealthoverview-filter-tabs">
          {['Day', 'Week', 'Month'].map(filter => (
            <button 
              key={filter}
              className={activeFilter === filter ? 'active' : ''} 
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="familyhealthoverview-family-grid">
        {familyMembers.map((member, index) => (
          <div 
            key={index} 
            className="familyhealthoverview-member-card"
            onClick={() => navigate(`/family-profile/${member.id}`)}
          >
            <div className="familyhealthoverview-member-emoji">{member.emoji}</div>
            <div className="familyhealthoverview-member-info">
              <h3>{member.name}</h3>
              <div className="familyhealthoverview-member-score">
                <span className={`familyhealthoverview-score-dot ${parseInt(member.score) > 90 ? 'familyhealthoverview-green' : 'familyhealthoverview-yellow'}`}></span>
                <span>{member.score}</span>
              </div>
              <span className="familyhealthoverview-member-role">{member.role}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="familyhealthoverview-view-all-members-btn" onClick={() => navigate('/family')}>
        <span>View All 15 Members</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default FamilyHealthOverview;
