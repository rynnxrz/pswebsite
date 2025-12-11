import { useParams } from 'react-router-dom';
import { ProjectP } from '../components/projects/ProjectP';
import { ProjectOne } from '../components/projects/ProjectOne';
import { ProjectDialogic } from '../components/projects/ProjectDialogic';

export const ProjectDetail = () => {
  const { id } = useParams();

  switch (id) {
    case 'p':
      return <ProjectP />;
    case 'one':
      return <ProjectOne />;
    case 'dialogic':
      return <ProjectDialogic />;
    default:
      return <div>Project not found</div>;
  }
};