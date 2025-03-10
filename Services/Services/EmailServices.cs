using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain.Dto;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Text;
using MailKit.Net.Smtp;
using Microsoft.EntityFrameworkCore;
using Services.Iservices;
using Repository.ModelsDb;

namespace Services.Services
{
    public class EmailServices : IEmailServices
    {
        private readonly IConfiguration _config;
        private readonly SistemaKempinskiContext _dBcontext;

        // Inyección del contexto de base de datos y configuración
        public EmailServices(IConfiguration config, SistemaKempinskiContext sistemaKempinskiContext)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
            _dBcontext = sistemaKempinskiContext ?? throw new ArgumentNullException(nameof(sistemaKempinskiContext));
        }

        public async Task SendEmail(EmailDto request)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config["Email:UserName"]));
            email.To.Add(MailboxAddress.Parse(request.Para));
            email.Subject = request.Asunto;
            email.Body = new TextPart(TextFormat.Html) { Text = request.Contenido };

            using var smtp = new SmtpClient();

            await smtp.ConnectAsync(
                _config["Email:Host"],
                Convert.ToInt32(_config["Email:Port"]),
                SecureSocketOptions.StartTls
            );

            await smtp.AuthenticateAsync(_config["Email:UserName"], _config["Email:PassWord"]);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);
        }

        public async Task<ReportesDto> CrearReporteConUsuario(ReportesDto reporteDto, ClaimsPrincipal user, IEmailServices _emailService)
        {
            if (_dBcontext == null) throw new InvalidOperationException("El contexto de base de datos no está inicializado.");

            var userIdClaim = user.FindFirst("UserId");
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                throw new UnauthorizedAccessException("Usuario no autenticado.");
            }

            //  Validar datos del reporte
            if (string.IsNullOrWhiteSpace(reporteDto.Titulo) || string.IsNullOrWhiteSpace(reporteDto.Descripcion))
            {
                throw new ArgumentException("El título y la descripción son requeridos.");
            }
            var reporte = new Reporte
            {
                Titulo = reporteDto.Titulo,
                FkDestinatario = reporteDto.FkDestinatario,
                FkPrioridad = reporteDto.FkPrioridad,
                Descripcion = reporteDto.Descripcion,
                FkEstado = reporteDto.FkEstado,
                FkTipoReporte = reporteDto.FkTipoReporte,
                FechaCreada = DateTime.Now
            };

            await _dBcontext.Reportes.AddAsync(reporte);
            await _dBcontext.SaveChangesAsync();

            var reporteUsuario = new ReporteUsuario
            {
                FkReporte = reporte.IdReporte,
                FkUsuario = userId
            };

            await _dBcontext.ReporteUsuarios.AddAsync(reporteUsuario);
            await _dBcontext.SaveChangesAsync();

            //  Obtener el destinatario del reporte
            var destinatario = await _dBcontext.Usuarios.FindAsync(reporteDto.FkDestinatario);
            if (destinatario != null && !string.IsNullOrWhiteSpace(destinatario.CorreoPersonal))
            {
                try
                {
                    // 6️⃣ Construir el mensaje del correo
                    var emailDto = new EmailDto
                    {
                        Para = destinatario.CorreoPersonal,
                        Asunto = "Nuevo Reporte Asignado",
                        Contenido = $@"
                    <p>Hola {destinatario.Nombre} {destinatario.Apellidos},</p>
                    <p>Se te ha asignado un nuevo reporte con el siguiente detalle:</p>
                    <ul>
                        <li><b>Título:</b> {reporte.Titulo}</li>
                        <li><b>Descripción:</b> {reporte.Descripcion}</li>
                        <li><b>Fecha de creación:</b> {reporte.FechaCreada}</li>
                    </ul>
                    <p>Por favor, revisa la plataforma para más detalles.</p>
                "
                    };

                    //  Enviar el correo de forma asíncrona
                    await _emailService.SendEmail(emailDto);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error enviando correo al destinatario: {ex.Message}");
                }
            }

            return new ReportesDto
            {
                IdReporte = reporte.IdReporte,
                Titulo = reporte.Titulo,
                FkDestinatario = reporte.FkDestinatario,
                FkPrioridad = reporte.FkPrioridad,
                Descripcion = reporte.Descripcion,
                FkEstado = reporte.FkEstado,
                FkTipoReporte = reporteDto.FkTipoReporte,
                FechaCreada = reporte.FechaCreada
            };
        }
    }
}
