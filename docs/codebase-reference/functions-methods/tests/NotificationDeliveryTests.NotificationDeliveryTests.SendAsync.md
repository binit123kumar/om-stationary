# Nested callback parser note — NotificationDeliveryTests.SendAsync

- **Identity:** No method with this identity is declared directly on ``NotificationDeliveryTests``. The lightweight scanner also surfaced nested ``RecordingHandler.SendAsync`` while walking its containing test class.
- **Actual method report:** ``NotificationDeliveryTests.RecordingHandler.SendAsync.md`` documents the helper method and its HTTP request recording behavior.
- **Parser limitation:** Nested class methods may be surfaced once in the containing type as well as under their true declaring class. This file records that duplicate explicitly; it is not a distinct test or callable method.
- **Test evidence:** The actual test assertions are documented in the individual ``NotificationDeliveryTests`` method reports; no test execution is claimed.
- **Maintenance:** Preserve the declaring-type identity when regenerating callable references.

