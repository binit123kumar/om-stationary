# EmailNotificationService.SendAsync

- **Identity:** `EmailNotificationService.SendAsync` in `backend/OMStationary.Api/Services/EmailNotificationService.cs`.
- **Purpose (simple Hinglish):** Configured notification/delivery work perform ya retry karta hai; provider/config checks source implementation mein hain.
- **Inputs:** `public async Task<EmailSendResult> SendAsync(string recipient, string subject, string body, CancellationToken cancellationToken = default)`
- **Flow:** Control flow contains conditional/guard branches (nested predicates are not fully parsed); calls/framework operations identified: LogInformation, Add, LogError | Observed return paths: new EmailSendResult(false, false, "NotConfigured", "SMTP is not configured."); new EmailSendResult(true, true, "Sent", null); new EmailSendResult(true, false, "Failed", "The SMTP server did not accept the email.")
- **Output:** Declared return type `async Task<EmailSendResult>`; observed returns: new EmailSendResult(false, false, "NotConfigured", "SMTP is not configured."); new EmailSendResult(true, true, "Sent", null); new EmailSendResult(true, false, "Failed", "The SMTP server did not accept the email.")
- **Dependencies/calls:** LogInformation, Add, LogError
- **Endpoint:** Not an HTTP controller action.
- **Data/external effects:** No persistent or external side effect apparent from this method body.
- **Security:** Not an HTTP endpoint; method-level authorization attribute not identified.
- **Error handling:** Contains a try/catch path; inspect source for handled exception types.
- **Test evidence:** NOT TESTED: no result from running this method/test suite was collected for this documentation task.
- **Maintenance:** Parameter bounds, side effects, and response contracts should remain consistent with the source implementation; update any callers/tests when changing them.

