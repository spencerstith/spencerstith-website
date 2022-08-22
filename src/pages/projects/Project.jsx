import { Link } from 'react-router-dom';
import Box from '../../components/Box';
import { TagDanger, TagLink } from '../../components/Tag';

export default function Project(props) {
  return (
    <Link to={`${props.name}`}>
      <Box title={props.title} figure={`generative/${props.name}.png`}>
        <p>{props.description}</p>
        <TagDanger>{props.language}</TagDanger>
        <TagLink>{props.tag}</TagLink>
      </Box>
    </Link>
  );
}