# Missing or partial implementations identified by source inspection

This report is deliberately limited to source-supported gaps. Absence from the inspected source does not prove that a feature was intended or that another deployment component does not provide it.

| Capability | Evidence in current source | Status | Scope of gap |
|---|---|---|---|
| Automated UPI/payment provider verification | Payment endpoint status returns `verified=false`; no provider verification route/service was mapped. | `PARTIALLY_IMPLEMENTED` | Do not treat a client-visible payment state as provider-confirmed settlement. |
| Provider-executed refund | Refund status/entity paths exist, but no dedicated refund controller/service endpoint to execute a provider refund was found. | `PARTIALLY_IMPLEMENTED` | Status workflow and record are not proof of money movement or provider confirmation. |
| Durable WhatsApp configuration through settings endpoint | Admin settings update changes in-memory configuration and writes an audit record; no `StoreSettings` persistence path was mapped there. | `PARTIALLY_IMPLEMENTED` / `NOT_MAPPED` | Persistence across process restarts was not established. |
| Runtime integrations | The source has payment, email/SMS/WhatsApp and SQL Server configuration/code paths. | `NOT_TESTED` | Credentials, provider reachability, API/database startup, deployment and real delivery were not tested. |
| End-to-end route/API/database tests | Two backend test source files contain 14 `[Fact]` methods; this documentation pass did not run them. Frontend route integration coverage was not mapped. | `NOT_TESTED` / `NOT_MAPPED` | No claim of browser-to-database behavior. |

Other features listed as source-present should not be interpreted as runtime validated. Refer to [runtime test status](RUNTIME_TEST_STATUS.md) and the [completeness audit](COMPLETENESS_AUDIT.md).
