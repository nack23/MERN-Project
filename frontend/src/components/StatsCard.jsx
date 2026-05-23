function StatsCard({

  title,
  value,
  icon,
  type

}) {

  return (

    <div
    className={`stats-card ${type}`}
    >

      <div className="stats-top">

        <div className="stats-icon">

          <i className={icon}></i>

        </div>

      </div>

      <div className="stats-content">

        <h3>

          {title}

        </h3>

        <h1>

          {value}

        </h1>

      </div>

    </div>
  );
}

export default StatsCard;