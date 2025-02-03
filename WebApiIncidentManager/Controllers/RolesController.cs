using Domain.Dto;
using Domain.Dto.CreateDto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Iservices;
using Services.Services;

namespace WebApiBD.Controllers
{
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

        [HttpPost]
        public async Task<ActionResult<RolesDto>> CrearRol([FromBody] CreateRolDto request)
        {
            var rolCreado = await _services.CrearRol(request.NombreRol);
            return CreatedAtAction(nameof(GetRoles), new { id = rolCreado.IdRol }, rolCreado);
        }

        [HttpPut("{idRol}")]
        public async Task<ActionResult<RolesDto>> EditarRol(int idRol, [FromBody] CreateRolDto request)
        {
            var rolEditado = await _services.EditarRol(idRol, request.NombreRol);
            if (rolEditado == null)
            {
                return NotFound($"Rol con ID {idRol} no encontrado.");
            }
            return Ok(rolEditado);
        }

        [HttpDelete("{idRol}")]
        public async Task<ActionResult> EliminarRol(int idRol)
        {
            var exito = await _services.EliminarRol(idRol);

            if (!exito)
            {
                return NotFound($"Rol con ID {idRol} no encontrado.");
            }
            return NoContent();
        }



    }
}
