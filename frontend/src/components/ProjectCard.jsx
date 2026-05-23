function ProjectCard({ name, members }) {

  return (

    <div className="project-card">

      <h2>{name}</h2>

      <p>Members: {members}</p>

    </div>
  );
}

export default ProjectCard;