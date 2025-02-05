import { useParams } from 'react-router-dom';
import { ProjectP } from './projects/ProjectP';
import { ProjectOne } from './projects/ProjectOne';

export const ProjectDetail = () => {
  const { id } = useParams();

  switch (id) {
    case 'p':
      return <ProjectP />;
    case 'one':
      return <ProjectOne />;
    default:
      return <div>Project not found</div>;
  }
};