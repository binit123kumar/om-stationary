// Order lookup form ("find my order by number").
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function OrderFilters({ onLookup }) {
  const [number, setNumber] = useState('');
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    const value = number.trim();
    if (!value) return;
    if (onLookup) onLookup(value);
    else navigate('/track/' + encodeURIComponent(value));
  };

  return (
    <form className="order-lookup panel" onSubmit={submit}>
      <label className="field-label">
        Order number
        <input
          required
          value={number}
          onChange={(event) => setNumber(event.target.value)}
          placeholder="OM123456789"
        />
      </label>
      <button className="btn" type="submit">Find order</button>
    </form>
  );
}
