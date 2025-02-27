using Domain.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Iservices;

namespace WebApiBD.Controllers
{
    [Authorize] // Asegura que solo usuarios autenticados
    [Route("api/[controller]")]
    [ApiController]

        public class ReportesController : ControllerBase
        {
            private readonly IReportesServices _services;
            public ReportesController(IReportesServices services)
            {
                _services = services;
            }

            [HttpGet]
            public async Task<ActionResult<IEnumerable<ReportesDto>>> GetReportes()
            {
                var reportes = await _services.ObtenerReportes();
                if (reportes == null)
                {
                    return NotFound();
                }
                return Ok(reportes);
            }
        [HttpGet("GetReportesByUsers/{id}")]
        public async Task<IActionResult> GetReportesByUsuario(int id)
        {
            var reportes = await _services.ObtenerReportesPorUsers(id);

            if (reportes == null || !reportes.Any())
            {
                return NotFound("No se encontraron reportes para este usuario.");
            }

            return Ok(reportes);
        }


        [HttpGet("{id}")]
            public async Task<ActionResult<ReportesDto>> GetReportePorId(int idReporte)
            {
                var reporte = await _services.ObtenerReportePorId(idReporte);
                if (reporte == null)
                {
                    return NotFound($"Reporte con ID {idReporte} no encontrado.");
                }
                return Ok(reporte);
            }

            [HttpPost("create")]
            public async Task<IActionResult> PostReporte([FromBody] ReportesDto reporteDto)
        {
            try
            {
                var reporteCreado = await _services.CrearReporteConUsuario(reporteDto, User);
                return Ok(reporteCreado);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }

            [HttpPut("Update{id}")]
            public async Task<ActionResult<ReportesDto>> PutReporte(int id, [FromBody] ReportesDto reporteDto)
            {
                var reporteEditado = await _services.EditarReporte(id, reporteDto);
                if (reporteEditado == null)
                {
                    return NotFound($"Reporte con ID {id} no encontrado.");
                }
                return Ok(reporteEditado);
            }

      
            [HttpDelete("delete/{id}")]
            public async Task<ActionResult> DeleteReporte(int id)
            {
                var mensaje = await _services.EliminarReporte(id);

                if (mensaje.StartsWith("Error"))
                {
                    return NotFound(mensaje); 
                }

                return Ok(mensaje); 
            }


        }

}
