import Grid from '../../components/layout/Grid';
import Column from '../../components/layout/Column';
import Project from './Project';
import projectJSON from '../../generative.json';

import Hair from "../../gen_proj/hair";
import Intersections from "../../gen_proj/intersections";
import Maze from "../../gen_proj/maze";
import Project04 from "../../gen_proj/project-04";
import PurpleRain from "../../gen_proj/purpleRain";
import Snake from "../../gen_proj/snake";
import Sudoku from "../../gen_proj/sudoku";
import TTables from "../../gen_proj/ttables";
import Fountain from '../../gen_proj/fountain';

const components = {
  fountain: <Fountain />,
  hair: <Hair />,
  intersections: <Intersections />,
  maze: <Maze />,
  project04: <Project04 />,
  purpleRain: <PurpleRain />,
  snake: <Snake />,
  sudoku: <Sudoku />,
  ttables: <TTables />
}

export function getProject(name) {
  const component = getProjectComponent(name);
  const information = projectJSON.projects.find((project) => project.name === name);
  return { ...information, component };
}

export function getProjectComponent(name) {
  return components[name];
}

const generateProjects = () => projectJSON.projects.map((project) =>
  <>
    <Project {...project} key={project.name} />
    <br />
  </>
);

const generateColumns = () => {
  const projects = generateProjects();
  const columns = [[], [], []];
  for (let i = 0; i < projects.length; i++) {
    columns[i % 3].push(projects[i]);
  }
  return columns;
}

export default function ProjectList() {
  const columns = generateColumns();
  return (
    <Grid centered={true}>
      <Column>
        {columns[0]}
      </Column>
      <Column>
        {columns[1]}
      </Column>
      <Column>
        {columns[2]}
      </Column>
    </Grid>
  );
}