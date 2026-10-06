// WhatsApp integration status panel. The access token
// lives in server configuration and is never returned by
// the API, so there is nothing here that can leak it.
export function WhatsAppStatus({ config }) {
  if (!config) return <p>Loading WhatsApp settings...</p>;
  const connected = config.configuration?.configured;

  return (
    <div className={connected ? 'wa-ok' : 'wa-warn'}>
      <b>{connected ? 'WhatsApp Business API is connected' : 'WhatsApp Business API is not configured'}</b>
      <p>{config.configuration?.note}</p>
      <p>
        Admin number: <b>{config.configuration?.adminNumber || '-'}</b>
        {config.configuration?.adminNumberNormalised
          ? ` (sends as ${config.configuration.adminNumberNormalised})`
          : ''}
        {' '}&middot; API version {config.configuration?.apiVersion}
      </p>
      {!connected && config.configuration?.missing?.length > 0 && (
        <p>
          <small>Set these server settings: {config.configuration.missing.join(', ')}</small>
        </p>
      )}
      <p>
        <small>
          The access token is stored in server configuration only. It is never
          returned by this API and cannot be set from the browser.
        </small>
      </p>
    </div>
  );
}
