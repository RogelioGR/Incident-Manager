using Domain.Dto.CreateDto;
using Domain.Dto;
using Microsoft.AspNetCore.Mvc;
using Services.Iservices;
using Microsoft.AspNetCore.Authorization;

namespace WebApiIncidentManager.Controllers
{
    [Authorize] // Asegura que solo usuarios autenticados puedan acceder
    [Route("api/[controller]")]
    [ApiController]
    public class ReporteUsuarioController : Controller
    {
        private readonly IReporteUsuarioServices _services;

        public ReporteUsuarioController(IReporteUsuarioServices services)
        {
            _services = services;
        }
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

        [HttpGet("{id}")]
        public async Task<ActionResult<ReporteUsuarioDto>> GetReporteUsuarioPorId(int id)
        {
            var reporteUsuario = await _services.ObtenerReporteUsuarioPorId(id);
            if (reporteUsuario == null)
            {
                return NotFound($"Reporte de usuario con ID {id} no encontrado.");
            }
            return Ok(reporteUsuario);
        }

        [HttpPost("create")]
        public async Task<ActionResult<ReporteUsuarioDto>> PostReporteUsuario([FromBody] CreateReporteUsuarioDto request)
        {
            var reporteUsuarioCreado = await _services.CrearReporteUsuario(request.FkReporte, request.FkUsuario);
            return CreatedAtAction(nameof(GetReportesUsuarios), new { id = reporteUsuarioCreado.IdReporteU }, reporteUsuarioCreado);
        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<ReporteUsuarioDto>>PutReporteUsuario(int id, [FromBody] CreateReporteUsuarioDto request)
        {
            var reporteUsuarioEditado = await _services.EditarReporteUsuario(id, request.FkReporte, request.FkUsuario);
            if (reporteUsuarioEditado == null)
            {
                return NotFound($"Reporte de usuario con ID {id} no encontrado.");
            }
            return Ok(reporteUsuarioEditado);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteReporteUsuario(int id)
        {
            var exito = await _services.EliminarReporteUsuario(id);
            if (!exito)
            {
                return NotFound($"Reporte de usuario con ID {id} no encontrado.");
            }
            return NoContent();
        }
    }

}
