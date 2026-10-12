# Declaration index: services/whatsappService.js

**Source:** `frontend/src/services/whatsappService.js`  
**Named declarations identified:** 4  
**Linked module report:** [whatsappService.md](../../../../services/whatsappService.md)

## Individually reported named declarations

- [`getWhatsAppConfig` (line 6)](getWhatsAppConfig.md)
- [`saveWhatsAppSettings` (line 13)](saveWhatsAppSettings.md)
- [`sendWhatsAppTest` (line 23)](sendWhatsAppTest.md)
- [`retryWhatsAppNotification` (line 28)](retryWhatsAppNotification.md)

## Anonymous callback exclusions

Anonymous arrow expressions/callbacks are not included in the named-declaration total and have no separate named report. The exclusions below are located by lexical arrow scanning; named-arrow association is approximate, so the list/count is an index aid rather than a proof that every entry is anonymous. Snippets are line-level source context, not full callback analyses.

- Anonymous arrow/callback exclusion 1: source line 9; lexical line fragment `if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not load WhatsApp settings.');` (not a separate named declaration report).
- Anonymous arrow/callback exclusion 2: source line 19; lexical line fragment `if (!response.ok) throw new Error((await response.json().catch(() => ({}))).detail || 'Could not save WhatsApp settings.');` (not a separate named declaration report).

## Index limitation

The lexical scan recognizes function declarations and named variable arrows/function expressions. It is not an AST-based declaration inventory; shorthand methods, callbacks, dynamic definitions, and syntactic edge cases may be missed. Runtime/API behavior is not verified.
