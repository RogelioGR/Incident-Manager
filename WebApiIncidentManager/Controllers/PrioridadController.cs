using Domain.Dto;
using Domain.Dto.CreateDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Iservices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApiBD.Controllers
{
    [Authorize] // Asegura que solo usuarios autenticados puedan acceder
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

        [HttpGet("{id}")]
        public async Task<ActionResult<DepartamentoDto>> GetPrioridadPorId(int id)
        {
            var prioridades = await _services.ObtenerPrioridadPorId(id);
            if (prioridades == null)
            {
                return NotFound($"prioridades con ID {id} no encontrado.");
            }
            return Ok(prioridades);
        }

        [HttpPost("create")]
        public async Task<ActionResult<PrioridadDto>> PostPrioridad([FromBody] CreatePrioridadDto request)
        {
            var prioridadCreada = await _services.CrearPrioridad(request.NombrePrioridad);
            return CreatedAtAction(nameof(GetPrioridades), new { id = prioridadCreada.IdPrioridad }, prioridadCreada);
        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<PrioridadDto>> PutPrioridad(int id, [FromBody] CreatePrioridadDto request)
        {
            var prioridadEditada = await _services.Editarprioridad(id, request.NombrePrioridad);
            if (prioridadEditada == null)
            {
                return NotFound($"Prioridad con ID {id} no encontrada.");
            }
            return Ok(prioridadEditada);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeletePrioridad(int id)
        {
            var exito = await _services.EliminarPrioridad(id);
            if (!exito)
            {
                return NotFound($"Prioridad con ID {id} no encontrada.");
            }
            return NoContent();
        }
    }
}

