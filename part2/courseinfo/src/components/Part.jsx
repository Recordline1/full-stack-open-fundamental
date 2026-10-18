
 const Part = ( {title,exercises} ) => {
  return (
    <li>
      <h3>{title}</h3>
      <p>{exercises} exercises</p>
    </li>
  );
};

export default Part;