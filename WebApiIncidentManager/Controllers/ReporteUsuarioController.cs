using Domain.Dto.CreateDto;
using Domain.Dto;
using Microsoft.AspNetCore.Mvc;
using Services.Iservices;

namespace WebApiIncidentManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReporteUsuarioController : Controller
    {
        private readonly IReporteUsuarioServices _services;

        public ReporteUsuarioController(IReporteUsuarioServices services)
        {
            _services = services;
        }

        // Obtener todos los reportes de usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReporteUsuarioDto>>> GetReportesUsuarios()
        {
            var reportesUsuarios = await _services.ObtenerReportesUsuarios();
            if (reportesUsuarios == null)
            {
                return NotFound();
            }
            return Ok(reportesUsuarios);
        }
        // Obtener un reporte de usuario por ID
        [HttpGet("{idReporteU}")]
        public async Task<ActionResult<ReporteUsuarioDto>> GetReporteUsuarioPorId(int idReporteU)
        {
            var reporteUsuario = await _services.ObtenerReporteUsuarioPorId(idReporteU);
            if (reporteUsuario == null)
            {
                return NotFound($"Reporte de usuario con ID {idReporteU} no encontrado.");
            }
            return Ok(reporteUsuario);
        }


        // Crear un nuevo reporte de usuario
        [HttpPost]
        public async Task<ActionResult<ReporteUsuarioDto>> CrearReporteUsuario([FromBody] CreateReporteUsuarioDto request)
        {
            var reporteUsuarioCreado = await _services.CrearReporteUsuario(request.FkReporte, request.FkUsuario);
            return CreatedAtAction(nameof(GetReportesUsuarios), new { id = reporteUsuarioCreado.IdReporteU }, reporteUsuarioCreado);
        }

        // Editar un reporte de usuario existente
        [HttpPut("{idReporteU}")]
        public async Task<ActionResult<ReporteUsuarioDto>> EditarReporteUsuario(int idReporteU, [FromBody] CreateReporteUsuarioDto request)
        {
            var reporteUsuarioEditado = await _services.EditarReporteUsuario(idReporteU, request.FkReporte, request.FkUsuario);
            if (reporteUsuarioEditado == null)
            {
                return NotFound($"Reporte de usuario con ID {idReporteU} no encontrado.");
            }
            return Ok(reporteUsuarioEditado);
        }

        // Eliminar un reporte de usuario
        [HttpDelete("{idReporteU}")]
        public async Task<ActionResult> EliminarReporteUsuario(int idReporteU)
        {
            var exito = await _services.EliminarReporteUsuario(idReporteU);
            if (!exito)
            {
                return NotFound($"Reporte de usuario con ID {idReporteU} no encontrado.");
            }
            return NoContent();
        }
    }

}
