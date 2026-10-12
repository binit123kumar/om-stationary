# Declaration index: pages/admin/AdminNotificationsPage.jsx

**Source:** `frontend/src/pages/admin/AdminNotificationsPage.jsx`  
**Named declarations identified:** 1  
**Linked module report:** [AdminNotificationsPage.md](../../../../../pages/admin/AdminNotificationsPage.md)

## Individually reported named declarations

- [`AdminNotificationsPage` (line 6)](AdminNotificationsPage.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 6; lexical line fragment `export function AdminNotificationsPage({user,onLogout}) { const [data,setData]=useState(null); const [error,setError]=useState(''); useEffect(()=>{getAdminNotifications(a` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 6; lexical line fragment `export function AdminNotificationsPage({user,onLogout}) { const [data,setData]=useState(null); const [error,setError]=useState(''); useEffect(()=>{getAdminNotifications(a` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 3: source line 6; lexical line fragment `export function AdminNotificationsPage({user,onLogout}) { const [data,setData]=useState(null); const [error,setError]=useState(''); useEffect(()=>{getAdminNotifications(a` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 4: source line 6; lexical line fragment `export function AdminNotificationsPage({user,onLogout}) { const [data,setData]=useState(null); const [error,setError]=useState(''); useEffect(()=>{getAdminNotifications(a` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 5: source line 6; lexical line fragment `export function AdminNotificationsPage({user,onLogout}) { const [data,setData]=useState(null); const [error,setError]=useState(''); useEffect(()=>{getAdminNotifications(a` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
