export default function Box(props) {
  return (
    <div className="box">
      {props.figure &&
        <figure className="image">
          <img src={props.figure} />
        </figure>
      }
      <p className="title">
        {props.title}
      </p>
      {props.children}
    </div>
  );
}