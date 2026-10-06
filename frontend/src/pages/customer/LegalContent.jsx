// Legal document renderer (privacy / terms / refund).
import { Link } from 'react-router-dom';
import { LEGAL, OM_CONTACT } from '../../utils/constants.js';

export function LegalContent({ kind }) {
  const doc = LEGAL[kind];
  if (!doc) {
    return (
      <div className="empty">
        <h1>Page not found</h1>
        <Link className="btn" to="/">Back to home</Link>
      </div>
    );
  }

  return (
    <>
      <div className="pagehead">
        <small>OM STATIONARY</small>
        <h1>{doc.title}</h1>
        <p>{doc.intro}</p>
      </div>
      <section className="content-prose">
        {doc.sections.map(([heading, paragraph]) => (
          <div key={heading}>
            <h2>{heading}</h2>
            <p>{paragraph}</p>
          </div>
        ))}
        <p className="muted">
          Last updated 1 September 2026. OM Stationary, {OM_CONTACT.address}.
        </p>
      </section>
    </>
  );
}
