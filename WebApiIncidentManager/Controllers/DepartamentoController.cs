using Domain.Dto;
using Domain.Dto.CreateDto;
using Microsoft.AspNetCore.Mvc;
using Services.Iservices;
using System.Threading.Tasks;

namespace WebApiBD.Controllers
{
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

        [HttpPost]
        public async Task<ActionResult<DepartamentoDto>> CrearDepartamento([FromBody] CreateDepartamentoDto request)
        {
            var departamentoCreado = await _services.CrearDepartamento(request.NombreDepartamento, request.Extension);
            return CreatedAtAction(nameof(GetDepartamentos), new { id = departamentoCreado.IdDepartamento }, departamentoCreado);
        }

        [HttpPut("{idDepartamento}")]
        public async Task<ActionResult<DepartamentoDto>> EditarDepartamento(int idDepartamento, [FromBody] CreateDepartamentoDto request)
        {
            var departamentoEditado = await _services.EditarDepartamento(idDepartamento, request.NombreDepartamento, request.Extension);
            if (departamentoEditado == null)
            {
                return NotFound($"Departamento con ID {idDepartamento} no encontrado.");
            }
            return Ok(departamentoEditado);
        }

        [HttpDelete("{idDepartamento}")]
        public async Task<ActionResult> EliminarDepartamento(int idDepartamento)
        {
            var exito = await _services.EliminarDepartamento(idDepartamento);
            if (!exito)
            {
                return NotFound($"Departamento con ID {idDepartamento} no encontrado.");
            }
            return NoContent();
        }
    }
}