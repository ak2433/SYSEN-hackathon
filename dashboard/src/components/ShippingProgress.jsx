import './ShippingProgress.css';

export default function ShippingProgress({ progress = 50 }) {
  return (
    <section className="shipping-progress">
      <h3 className="shipping-progress__title">Shipping Progress</h3>
      <div className="shipping-progress__bar">
        <div
          className="shipping-progress__fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="shipping-progress__label">{progress}% complete</p>
    </section>
  );
}
