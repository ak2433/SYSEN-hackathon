import './DashCard.css';

export default function DashCard({ title, value, subtitle, accentColor }) {
  return (
    <article className="dash-card" style={{ '--accent': accentColor }}>
      <h3 className="dash-card__title">{title}</h3>
      <p className="dash-card__value">{value}</p>
      <p className="dash-card__subtitle">{subtitle}</p>
    </article>
  );
}
