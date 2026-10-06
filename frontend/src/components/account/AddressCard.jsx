// Single saved address.
export function AddressCard({ address, onRemove }) {
  return (
    <article>
      <b>{address.label}{address.isDefault ? ' · Default' : ''}</b>
      <span>{address.recipientName} · {address.phone}</span>
      <span>
        {address.line1}{address.line2 ? `, ${address.line2}` : ''}, {address.city}, {address.state} {address.pincode}
      </span>
      {onRemove && (
        <button className="outline" onClick={() => onRemove(address)}>
          Remove
        </button>
      )}
    </article>
  );
}
