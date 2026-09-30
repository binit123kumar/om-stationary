using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;

namespace OMStationary.Api.Controllers;

[ApiController, Authorize(Roles = "Customer"), Route("api/notifications")]
public sealed class NotificationsController(OmDbContext db) : ControllerBase
{
    private Guid? CurrentUserId => Guid.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out var id) ? id : null;

    [HttpGet]
    public async Task<IActionResult> List([FromQuery] int take = 30)
    {
        var id = CurrentUserId;
        if (id is null) return Unauthorized();
        take = Math.Clamp(take, 1, 100);
        var rows = await db.Notifications.AsNoTracking()
            .Where(x => x.UserId == id && x.Channel == NotificationServiceNames.InApp)
            .OrderByDescending(x => x.CreatedAt)
            .Take(take)
            .Select(x => new { x.Id, x.OrderId, x.Event, x.Title, x.Message, x.IsRead, x.CreatedAt })
            .ToListAsync();
        var unread = await db.Notifications.CountAsync(x => x.UserId == id && x.Channel == NotificationServiceNames.InApp && !x.IsRead);
        return Ok(new { unread, items = rows });
    }

    [HttpPost("{id:int}/read")]
    public async Task<IActionResult> MarkRead(int id)
    {
        var userId = CurrentUserId;
        if (userId is null) return Unauthorized();
        var changed = await db.Notifications
            .Where(x => x.Id == id && x.UserId == userId)
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.IsRead, true));
        return changed == 1 ? NoContent() : NotFound();
    }

    [HttpPost("read-all")]
    public async Task<IActionResult> MarkAllRead()
    {
        var userId = CurrentUserId;
        if (userId is null) return Unauthorized();
        await db.Notifications
            .Where(x => x.UserId == userId && x.Channel == NotificationServiceNames.InApp && !x.IsRead)
            .ExecuteUpdateAsync(s => s.SetProperty(x => x.IsRead, true));
        return NoContent();
    }
}

public static class NotificationServiceNames
{
    public const string InApp = "InApp";
}
