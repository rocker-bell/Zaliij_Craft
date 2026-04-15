/* CARD */
const ProjectCard = ({ image, title, desc }) => (
  <div className="project-card">
    <div className="card-img" style={{ backgroundImage: `url(${image})` }} />
    <div className="card-body">
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  </div>
);


export default ProjectCard;