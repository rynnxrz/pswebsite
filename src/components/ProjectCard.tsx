// src/components/ProjectCard.tsx

import './ProjectCard.css';

interface ProjectCardProps {
  title: string;
  image: string;
  description: string;
  tags: string[];
  date?: string;
}

export const ProjectCard = ({ title, image, description, tags, date }: ProjectCardProps) => (
  <div className="project-card">
    <img src={image} alt={title} className="project-card-image" />

    <div className="project-card-content">
      <div className="card-body">
        <div className="card-header">
          <h3 className="card-title">{title.toLowerCase()}</h3>
        </div>
        {date && <p className="card-meta">{date}</p>}
        <p className="card-description">{description}</p>
        <div className="card-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag.toLowerCase()}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);
