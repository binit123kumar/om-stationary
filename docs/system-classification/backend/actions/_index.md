# Backend action reports

- [Controller route/action inventory](../../evidence/endpoint-inventory.md) — 90 attribute-declared controller actions, each linked to its source implementation report; includes overload-qualified `OrdersController.Get` and `ProductsController.Get`.
- [Minimal health endpoint](Program.Health.md) — `GET /api/health`, declared in `Program.cs` rather than a controller.
- [Controller class reports](../controllers/_index.md).

Two unlinked files in this directory, `OrdersController.OrdersController.md` and `ProductsController.ProductsController.md`, are controller class summaries emitted by the secondary reference inventory; they are **not** action reports and are excluded from action counts. Use the controller index for class reports.

