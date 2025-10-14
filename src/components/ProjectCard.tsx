// src/components/ProjectCard.tsx

import './ProjectCard.css';

interface ProjectCardProps {
  title: string;
  image: string;
  description: string;
  tags: string[];
}

export const ProjectCard = ({ title, image, description, tags }: ProjectCardProps) => (
  <div className="project-card">
    <img src={image} alt={title} className="project-card-image" />
    
    <div className="project-card-overlay">
      <div className="overlay-content">
        <h3 className="overlay-title">{title.toLowerCase()}</h3>
        <p className="overlay-description">{description}</p>
        <div className="overlay-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">{tag.toLowerCase()}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);