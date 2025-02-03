using Domain.Dto;
using Domain.Dto.CreateDto;
using Microsoft.AspNetCore.Mvc;
using Services.Iservices;

namespace WebApiBD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoReporteController : Controller
    {
        private readonly IEstadosReportesServices _services;

        public EstadoReporteController(IEstadosReportesServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstadosReporteDto>>> GetEstadosReportes()
        {
            var estados = await _services.ObtenerEstadosReportes();
            if (estados == null)
            {
                return NotFound();
            }
            return Ok(estados);
        }

        [HttpPost]
        public async Task<ActionResult<EstadosReporteDto>> CrearEstadoReporte([FromBody] CreateEstadoReporteDto request)
        {
            var estadoCreado = await _services.CrearEstadoReporte(request.NombreEstado);
            return CreatedAtAction(nameof(GetEstadosReportes), new { id = estadoCreado.IdEstado }, estadoCreado);
        }

        [HttpPut("{idEstado}")]
        public async Task<ActionResult<EstadosReporteDto>> EditarEstadoReporte(int idEstado, [FromBody] CreateEstadoReporteDto request)
        {
            var estadoEditado = await _services.EditarEstadoReporte(idEstado, request.NombreEstado);
            if (estadoEditado == null)
            {
                return NotFound($"Estado de reporte con ID {idEstado} no encontrado.");
            }
            return Ok(estadoEditado);
        }

        [HttpDelete("{idEstado}")]
        public async Task<ActionResult> EliminarEstadoReporte(int idEstado)
        {
            var exito = await _services.EliminarEstadoReporte(idEstado);
            if (!exito)
            {
                return NotFound($"Estado de reporte con ID {idEstado} no encontrado.");
            }
            return NoContent();
        }

    }
}
