export default function Grid(props) {
  return (
    <div className="section">
      <div className={`columns ${props.centered && props.centered ? 'has-text-centered' : ''}`}>
        {props.children}
      </div>
    </div>
  );
}