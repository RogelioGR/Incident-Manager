using Domain.Dto;
using Domain.Dto.CreateDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Iservices;
using System.Threading.Tasks;

namespace WebApiBD.Controllers
{
    [Authorize] // Asegura que solo usuarios autenticados puedan acceder
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentosController : Controller
    {
        private readonly IDepartamentoServices _services;
        public DepartamentosController(IDepartamentoServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartamentoDto>>> GetDepartamentos()
        {
            var departamentos = await _services.ObtenerRoles();
            if (departamentos == null)
            {
                return NotFound();
            }
            return Ok(departamentos);
        }

        [HttpPost("create")]
        public async Task<ActionResult<DepartamentoDto>> PostDepartamento([FromBody] CreateDepartamentoDto request)
        {
            var departamentoCreado = await _services.CrearDepartamento(request.NombreDepartamento, request.Extension);
            return CreatedAtAction(nameof(GetDepartamentos), new { id = departamentoCreado.IdDepartamento }, departamentoCreado);
        }

        [HttpPut("update{id}")]
        public async Task<ActionResult<DepartamentoDto>> PutDepartamento(int id, [FromBody] CreateDepartamentoDto request)
        {
            var departamentoEditado = await _services.EditarDepartamento(id, request.NombreDepartamento, request.Extension);
            if (departamentoEditado == null)
            {
                return NotFound($"Departamento con ID {id} no encontrado.");
            }
            return Ok(departamentoEditado);
        }

        [HttpDelete("delete{id}")]
        public async Task<ActionResult> DeleteDepartamento(int id)
        {
            var exito = await _services.EliminarDepartamento(id);
            if (!exito)
            {
                return NotFound($"Departamento con ID {id} no encontrado.");
            }
            return NoContent();
        }
    }
}