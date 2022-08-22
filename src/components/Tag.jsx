export default function Tag(props) {
  return (
    <span className={`tag ${props.kind} is-light`}>{props.children}</span>
  );
}

export function TagDanger(props) {
  return (
    <Tag kind="is-danger">
      {props.children}
    </Tag>
  );
}

export function TagLink(props) {
  return (
    <Tag kind="is-link">
      {props.children}
    </Tag>
  );
}