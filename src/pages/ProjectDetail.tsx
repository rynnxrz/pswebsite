import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

const ProjectP = lazy(() => import('../components/projects/ProjectP').then((m) => ({ default: m.ProjectP })));
const ProjectOne = lazy(() => import('../components/projects/ProjectOne').then((m) => ({ default: m.ProjectOne })));
const ProjectDialogic = lazy(() => import('../components/projects/ProjectDialogic').then((m) => ({ default: m.ProjectDialogic })));
const ProjectIvy = lazy(() => import('../components/projects/ProjectIvy').then((m) => ({ default: m.ProjectIvy })));
const ProjectAmber = lazy(() => import('../components/projects/ProjectAmber').then((m) => ({ default: m.ProjectAmber })));

export const ProjectDetail = () => {
  const { id } = useParams();

  let projectComponent: JSX.Element | null;

  switch (id) {
    case 'amber-adas':
      projectComponent = <ProjectAmber />;
      break;
    case 'oraweb':
      projectComponent = <ProjectP />;
      break;
    case 'one':
      projectComponent = <ProjectOne />;
      break;
    case 'dialogic':
      projectComponent = <ProjectDialogic />;
      break;
    case 'ivy-j-studio':
      projectComponent = <ProjectIvy />;
      break;
    default:
      projectComponent = null;
  }

  if (!projectComponent) {
    return <div>Project not found</div>;
  }

  return (
    <Suspense fallback={null}>
      {projectComponent}
    </Suspense>
  );
};
