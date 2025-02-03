using Microsoft.EntityFrameworkCore;
using Services.Iservices;
using Services.Services;
using WebApiIncidentManager.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Registro de servicios personalizados
builder.Services.AddScoped<IRolesServices, RolesServices>();
builder.Services.AddScoped<IDepartamentoServices, DepartamentoServices>();
builder.Services.AddScoped<IPrioridadServices, PrioridadServices>();
builder.Services.AddScoped<IEstadosReportesServices, EstadosReportesServices>();
builder.Services.AddScoped<IUsuarioServices, UsuarioServices>();
builder.Services.AddScoped<IReportesServices, ReportesServices>();
builder.Services.AddScoped<IReporteUsuarioServices, ReporteUsuarioServices>();
builder.Services.AddScoped<IComentarioServices, ComentarioServices>();








builder.Services.AddDbContext<SistemaKempinskiContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DBConnection"),
        Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.30-mysql")
    ));

// Configuración de CORS (si es necesario)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
    );
});

// Construir la aplicación
var app = builder.Build();

// Configuración del pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// Middleware de CORS (opcional)
app.UseCors("AllowAll");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

