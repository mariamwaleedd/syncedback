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
    <div className="family-health-container">
      <div className="family-health-header">
        <div className="header-text">
          <h1>Family Health Overview</h1>
          <p>Average Health Score: 81%</p>
        </div>
        <div className="filter-tabs">
          <button>Week</button>
          <button className="active">Month</button>
          <button>Year</button>
        </div>
      </div>

      <div className="family-grid">
        {familyMembers.map((member, index) => (
          <div key={index} className="member-card">
            <div className="member-emoji">{member.emoji}</div>
            <div className="member-info">
              <h3>{member.name}</h3>
              <div className="member-score">
                <span className={`score-dot ${parseInt(member.score) > 90 ? 'green' : 'yellow'}`}></span>
                <span>{member.score}</span>
              </div>
              <span className="member-role">{member.role}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="view-all-members-btn">
        <span>View All 15 Members</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default FamilyHealthOverview;
