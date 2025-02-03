using Domain.Dto;
using Domain.Dto.CreateDto;
using Microsoft.AspNetCore.Mvc;
using Services.Iservices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApiBD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrioridadController : Controller
    {
        private readonly IPrioridadServices _services;

        public PrioridadController(IPrioridadServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PrioridadDto>>> GetPrioridades()
        {
            var prioridades = await _services.ObtenerPrioridad();
            if (prioridades == null)
            {
                return NotFound();
            }
            return Ok(prioridades);
        }

        [HttpPost]
        public async Task<ActionResult<PrioridadDto>> CrearPrioridad([FromBody] CreatePrioridadDto request)
        {
            var prioridadCreada = await _services.CrearPrioridad(request.NombrePrioridad);
            return CreatedAtAction(nameof(GetPrioridades), new { id = prioridadCreada.IdPrioridad }, prioridadCreada);
        }

        [HttpPut("{idPrioridad}")]
        public async Task<ActionResult<PrioridadDto>> EditarPrioridad(int idPrioridad, [FromBody] CreatePrioridadDto request)
        {
            var prioridadEditada = await _services.Editarprioridad(idPrioridad, request.NombrePrioridad);
            if (prioridadEditada == null)
            {
                return NotFound($"Prioridad con ID {idPrioridad} no encontrada.");
            }
            return Ok(prioridadEditada);
        }

        [HttpDelete("{idPrioridad}")]
        public async Task<ActionResult> EliminarPrioridad(int idPrioridad)
        {
            var exito = await _services.EliminarPrioridad(idPrioridad);
            if (!exito)
            {
                return NotFound($"Prioridad con ID {idPrioridad} no encontrada.");
            }
            return NoContent();
        }
    }
}

