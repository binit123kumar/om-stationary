# OrderStateMachine

- **Identity:** `class OrderStateMachine` in `backend/OMStationary.Api/Services/OrderStateMachine.cs`.
- **Source implementation:** [`OrderStateMachine.cs`](../../../../../backend/OMStationary.Api/Services/OrderStateMachine.cs).
- **Purpose (simple Hinglish):** Yeh `OrderStateMachine` service/helper implementation hai; source-defined fields, routes, ya persistence mapping is report me listed hain.
- **Constructor inputs:** None declared.
- **Routes/security attributes:** None declared.
- **Declared properties:** public static string[] Statuses => Transitions.SelectMany(x => new[] { x.Key }.Concat(x.Value)).Distinct(StringComparer.OrdinalIgnoreCase).ToArray();
- **Named callable methods:** CanTransition, NextStatuses
- **Dependencies/data effects:** Source is authoritative; entity/mapping notes describe intended model semantics, not live schema state.
- **Test evidence:** Identified test source methods are documented separately; test execution was not performed.
- **Maintenance:** Keep implementation, migrations and snapshot in sync; never infer current database/runtime state from this reference.

