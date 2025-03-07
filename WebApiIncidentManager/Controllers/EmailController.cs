using Domain.Dto;
using Microsoft.AspNetCore.Mvc;
using Services.Iservices;
using Services.Services;

namespace WebApiIncidentManager.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmailController : Controller
    {
        private readonly IEmailServices _emailService;
        public EmailController(IEmailServices emailService)
        {
            _emailService = emailService;
        }
        [HttpPost("enviar-correo")]
        public async Task<IActionResult> EnviarCorreo([FromBody] EmailDto emailDto, [FromServices] IEmailServices emailService)
        {
            if (emailDto == null || string.IsNullOrWhiteSpace(emailDto.Para))
            {
                return BadRequest("Datos de correo inválidos.");
            }

            try
            {
                await emailService.SendEmail(emailDto);
                return Ok("Correo enviado exitosamente.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error enviando el correo: {ex.Message}");
            }
        }

        [HttpPost("crear")]
        public async Task<IActionResult> CrearReporte([FromBody] ReportesDto reporteDto)
        {
            if (reporteDto == null)
                return BadRequest("El reporte no puede ser nulo.");

            var user = User; // Obtener el usuario autenticado

            var nuevoReporte = await _emailService.CrearReporteConUsuario(reporteDto, user, _emailService);

            return Ok(nuevoReporte);
        }
    }
}
