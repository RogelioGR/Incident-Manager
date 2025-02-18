using Domain.Dto;
using Domain.Dto.CreateDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Iservices;

namespace WebApiBD.Controllers
{
    [Authorize] // Asegura que solo usuarios autenticados puedan acceder
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

        [HttpPost("create")]
        public async Task<ActionResult<EstadosReporteDto>> PostEstadoReporte([FromBody] CreateEstadoReporteDto request)
        {
            var estadoCreado = await _services.CrearEstadoReporte(request.NombreEstado);
            return CreatedAtAction(nameof(GetEstadosReportes), new { id = estadoCreado.IdEstado }, estadoCreado);
        }

        [HttpPut("update{id}")]
        public async Task<ActionResult<EstadosReporteDto>> PutEstadoReporte(int id, [FromBody] CreateEstadoReporteDto request)
        {
            var estadoEditado = await _services.EditarEstadoReporte(id, request.NombreEstado);
            if (estadoEditado == null)
            {
                return NotFound($"Estado de reporte con ID {id} no encontrado.");
            }
            return Ok(estadoEditado);
        }

        [HttpDelete("delete{id}")]
        public async Task<ActionResult> DeleteEstadoReporte(int id)
        {
            var exito = await _services.EliminarEstadoReporte(id);
            if (!exito)
            {
                return NotFound($"Estado de reporte con ID {id} no encontrado.");
            }
            return NoContent();
        }

    }
}
