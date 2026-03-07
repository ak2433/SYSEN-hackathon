import DashCard from './DashCard';
import ShippingProgress from './ShippingProgress';
import './Dashboard.css';

const METRICS = [
  {
    title: 'Active Shipments',
    value: '1,248',
    subtitle: '▲ 12% vs Last Week',
    accentColor: '#14b8a6',
  },
  {
    title: 'Avg Transit Delay',
    value: '1.4 Days',
    subtitle: 'Synthetic Risk Elevated',
    accentColor: '#ec4899',
  },
  {
    title: 'Synthetic Threat Index',
    value: '72/100',
    subtitle: 'Typhoon Warning Active',
    accentColor: '#f59e0b',
  },
  {
    title: 'AI Confidence',
    value: '94.6%',
    subtitle: 'Model Re-trained 2h ago',
    accentColor: '#a855f7',
  },
];

export default function Dashboard() {
  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Supply Chain Dashboard</h1>
        <p className="dashboard__subtitle">Real-time metrics overview</p>
      </header>
      <section className="dashboard__cards">
        {METRICS.map((metric) => (
          <DashCard key={metric.title} {...metric} />
        ))}
      </section>
      <ShippingProgress progress={50} />
    </main>
  );
}
