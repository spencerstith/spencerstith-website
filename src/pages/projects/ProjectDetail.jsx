import { useParams } from 'react-router-dom';
import Column from "../../components/layout/Column";
import Grid from "../../components/layout/Grid";
import { TagDanger, TagLink } from '../../components/Tag';
import { getProject } from './ProjectList';

export default function ProjectDetail() {
  const projectId = useParams().projectId;
  const project = getProject(projectId);

  return (
    <>
      <Grid centered={true}>
        <Column>
          {project.component}
        </Column>
        <Column>
          <h1 className="title">{project.title}</h1>
          <p>{project.description}</p>
          <TagDanger>{project.language}</TagDanger>
          <TagLink>{project.tag}</TagLink>
          <br />
          
        </Column>
      </Grid>
    </>

  );
}