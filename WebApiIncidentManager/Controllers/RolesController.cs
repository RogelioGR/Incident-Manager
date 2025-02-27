using Domain.Dto;
using Domain.Dto.CreateDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Iservices;
using Services.Services;

namespace WebApiBD.Controllers
{
    [Authorize] // Asegura que solo usuarios autenticados puedan acceder
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : Controller
    {
       private readonly IRolesServices _services;

        public RolesController(IRolesServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RolesDto>>> GetRoles()
        {
            var r = await _services.ObtenerRoles();
            if (r == null)
            {
                return NotFound();
            }
            return Ok(r);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DepartamentoDto>> GetRolPorId(int id)
        {
            var rols = await _services.ObtenerRolesPorId(id);
            if (rols == null)
            {
                return NotFound($"rols con ID {id} no encontrado.");
            }
            return Ok(rols);
        }


        [HttpPost("create")]
        public async Task<ActionResult<RolesDto>> PostRol([FromBody] CreateRolDto request)
        {
            var rolCreado = await _services.CrearRol(request.NombreRol);
            return CreatedAtAction(nameof(GetRoles), new { id = rolCreado.IdRol }, rolCreado);
        }

        [HttpPut("update{id}")]
        public async Task<ActionResult<RolesDto>> PutRol(int id, [FromBody] CreateRolDto request)
        {
            var rolEditado = await _services.EditarRol(id, request.NombreRol);
            if (rolEditado == null)
            {
                return NotFound($"Rol con ID {id} no encontrado.");
            }
            return Ok(rolEditado);
        }

        [HttpDelete("delete{id}")]
        public async Task<ActionResult> DeleteRol(int id)
        {
            var exito = await _services.EliminarRol(id);

            if (!exito)
            {
                return NotFound($"Rol con ID {id} no encontrado.");
            }
            return NoContent();
        }



    }
}
