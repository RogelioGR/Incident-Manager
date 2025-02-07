using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Services.Iservices;
using Services.Services;
using System.Text;
using WebApiIncidentManager.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // Configuraci�n para permitir autenticaci�n JWT en Swagger
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Introduce el token JWT en el formato: Bearer {token}"
    });

    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// Registro de servicios personalizados
builder.Services.AddScoped<IRolesServices, RolesServices>();
builder.Services.AddScoped<IDepartamentoServices, DepartamentoServices>();
builder.Services.AddScoped<IPrioridadServices, PrioridadServices>();
builder.Services.AddScoped<IEstadosReportesServices, EstadosReportesServices>();
builder.Services.AddScoped<IUsuarioServices, UsuarioServices>();
builder.Services.AddScoped<IReportesServices, ReportesServices>();
builder.Services.AddScoped<IReporteUsuarioServices, ReporteUsuarioServices>();
builder.Services.AddScoped<IComentarioServices, ComentarioServices>();

// Configuraci?n del DbContext para usar MySQL
builder.Services.AddDbContext<SistemaKempinskiContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DBConnection"),
        Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.30-mysql")
    ));

// Configuraci?n de JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})

.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

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
// Middleware de autenticaci�n
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();

