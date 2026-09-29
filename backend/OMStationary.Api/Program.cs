using Microsoft.EntityFrameworkCore;
using OMStationary.Api.Data;
var builder=WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<OmDbContext>(o=>o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(o=>o.AddPolicy("frontend",p=>p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
var app=builder.Build();
using(var scope=app.Services.CreateScope()){var db=scope.ServiceProvider.GetRequiredService<OmDbContext>(); db.Database.EnsureCreated(); if(!db.Products.Any()){db.Products.AddRange(new OMStationary.Api.Models.Product{Name="A4 Paper 500 Sheets",Category="Stationery",Price=280,MRP=330,ImageUrl="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80",Description="High quality A4 paper"},new OMStationary.Api.Models.Product{Name="HP 680 Ink Cartridge",Category="Printing & Ink",Price=1020,MRP=1199,ImageUrl="https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80",Description="Compatible HP cartridge"},new OMStationary.Api.Models.Product{Name="Logitech Keyboard",Category="Computer",Price=799,MRP=999,ImageUrl="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",Description="Full-size keyboard"}); db.SaveChanges();}}
app.UseSwagger(); app.UseSwaggerUI(); app.UseCors("frontend"); app.MapControllers();
app.Run();
