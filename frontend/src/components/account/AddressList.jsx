// Saved address list with remove action.
import { AddressCard } from './AddressCard.jsx';

export function AddressList({ addresses = [], onRemove }) {
  if (!addresses.length) {
    return (
      <section className="panel saved-addresses">
        <h2>Saved addresses</h2>
        <p>No saved addresses yet. Add one below to speed up checkout.</p>
      </section>
    );
  }
  return (
    <section className="panel saved-addresses">
      <h2>Saved addresses</h2>
      {addresses.map((address) => (
        <AddressCard key={address.id} address={address} onRemove={onRemove} />
      ))}
    </section>
  );
}
