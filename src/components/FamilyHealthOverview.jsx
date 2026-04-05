import React from 'react';
import { ArrowRight } from 'lucide-react';
import './FamilyHealthOverview.css';

const familyMembers = [
  { name: 'Mona', score: '92%', role: 'Mother', emoji: '😊' },
  { name: 'Ahmed', score: '85%', role: 'Father', emoji: '👨' },
  { name: 'Maya', score: '98%', role: 'Daughter', emoji: '😁' },
  { name: 'Grandpa', score: '78%', role: 'Grandfather', emoji: '👴' },
  { name: 'Grandma', score: '88%', role: 'Grandmother', emoji: '👵' },
  { name: 'Omar', score: '95%', role: 'Son', emoji: '👦' },
  { name: 'Aunt', score: '91%', role: 'Aunt', emoji: '👩' },
  { name: 'Uncle', score: '82%', role: 'Uncle', emoji: '👨' },
  { name: 'Cousin', score: '94%', role: 'Cousin', emoji: '👧' },
  { name: 'Cousin', score: '96%', role: 'Cousin', emoji: '👧' },
];

const FamilyHealthOverview = () => {
  return (
    <div className="familyhealthoverview-family-health-container">
      <div className="familyhealthoverview-family-health-header">
        <div className="familyhealthoverview-header-text">
          <h1>Family Health Overview</h1>
          <p>Average Health Score: 81%</p>
        </div>
        <div className="familyhealthoverview-filter-tabs">
          <button>Week</button>
          <button className="active">Month</button>
          <button>Year</button>
        </div>
      </div>

      <div className="familyhealthoverview-family-grid">
        {familyMembers.map((member, index) => (
          <div key={index} className="familyhealthoverview-member-card">
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

      <button className="familyhealthoverview-view-all-members-btn">
        <span>View All 15 Members</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default FamilyHealthOverview;
