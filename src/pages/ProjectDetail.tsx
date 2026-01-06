import { useParams } from 'react-router-dom';
import { ProjectP } from '../components/projects/ProjectP';
import { ProjectOne } from '../components/projects/ProjectOne';
import { ProjectDialogic } from '../components/projects/ProjectDialogic';
import { ProjectIvy } from '../components/projects/ProjectIvy';

export const ProjectDetail = () => {
  const { id } = useParams();

  switch (id) {
    case 'oraweb':
      return <ProjectP />;
    case 'one':
      return <ProjectOne />;
    case 'dialogic':
      return <ProjectDialogic />;
    case 'ivy-j-studio':
      return <ProjectIvy />;
    default:
      return <div>Project not found</div>;
  }
};