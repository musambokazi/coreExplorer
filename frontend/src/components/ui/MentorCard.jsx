import React from 'react';
import './MentorCard.css';

export default function MentorCard({ name = 'Jane Doe', title = 'Senior Mentor', bio = 'Passionate about guiding learners.', avatar = 'https://via.placeholder.com/80' }) {
  return (
    <div className="mentor-card glass-card">
      <img src={avatar} alt={`${name}'s avatar`} className="mentor-avatar" />
      <h3 className="mentor-name">{name}</h3>
      <p className="mentor-title">{title}</p>
      <p className="mentor-bio">{bio}</p>
    </div>
  );
}
