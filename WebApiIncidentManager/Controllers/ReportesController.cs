using Domain.Dto;
using Microsoft.AspNetCore.Mvc;
using Services.Iservices;

namespace WebApiBD.Controllers
{
    
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

            [HttpGet("{idReporte}")]
            public async Task<ActionResult<ReportesDto>> GetReportePorId(int idReporte)
            {
                var reporte = await _services.ObtenerReportePorId(idReporte);
                if (reporte == null)
                {
                    return NotFound($"Reporte con ID {idReporte} no encontrado.");
                }
                return Ok(reporte);
            }

            [HttpPost]
            public async Task<ActionResult<ReportesDto>> CrearReporte([FromBody] ReportesDto reporteDto)
            {
                var reporteCreado = await _services.CrearReporte(reporteDto);
                return CreatedAtAction(nameof(GetReportePorId), new { idReporte = reporteCreado.IdReporte }, reporteCreado);
            }

            [HttpPut("{idReporte}")]
            public async Task<ActionResult<ReportesDto>> EditarReporte(int idReporte, [FromBody] ReportesDto reporteDto)
            {
                var reporteEditado = await _services.EditarReporte(idReporte, reporteDto);
                if (reporteEditado == null)
                {
                    return NotFound($"Reporte con ID {idReporte} no encontrado.");
                }
                return Ok(reporteEditado);
            }

            [HttpDelete("{idReporte}")]
            public async Task<ActionResult> EliminarReporte(int idReporte)
            {
                var exito = await _services.EliminarReporte(idReporte);
                if (!exito)
                {
                    return NotFound($"Reporte con ID {idReporte} no encontrado.");
                }
                return NoContent();
            }
        }
    
}
