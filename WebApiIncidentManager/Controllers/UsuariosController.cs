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
    public class UsuariosController : Controller
    {
        private readonly IUsuarioServices _services;
        public UsuariosController(IUsuarioServices services)
        {
            _services = services;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuariosDto>>> GetUsuarios()
        {
            var usuarios = await _services.ObtenerUsuarios();
            if (usuarios == null)
            {
                return NotFound();
            }
            return Ok(usuarios);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioLoginDto>> GetUsuarioPorId(int id)
        {
            var usuario = await _services.ObtenerUsuarioPorId(id);
            if (usuario == null)
            {
                return NotFound($"Usuario con ID {id} no encontrado.");
            }
            return Ok(usuario);
        }

        [HttpPost("create")]
        public async Task<ActionResult<UsuariosDto>> PostUsuario([FromBody] CreateUsuariosDto request)
        {
            var usuarioCreado = await _services.CrearUsuario(new UsuariosDto
            {
                Nombre = request.Nombre,
                Apellidos = request.Apellidos,
                CorreoElectronico = request.CorreoElectronico,
                CorreoPersonal = request.CorreoPersonal,
                Contraseña = request.Contraseña,
                FkDepartamento = request.FkDepartamento,
                FkRol = request.FkRol
            });

            return CreatedAtAction(nameof(GetUsuarios), new { id = usuarioCreado.IdUsuarios }, usuarioCreado);
        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<UsuariosDto>> PutUsuario(int id, [FromBody] CreateUsuariosDto request)
        {
            var usuarioEditado = await _services.EditarUsuario(id, new UsuariosDto
            {
                Nombre = request.Nombre,
                Apellidos = request.Apellidos,
                CorreoElectronico = request.CorreoElectronico,
                CorreoPersonal = request.CorreoPersonal,
                Contraseña = request.Contraseña,
                FkDepartamento = request.FkDepartamento,
                FkRol = request.FkRol
            });

            if (usuarioEditado == null)
            {
                return NotFound($"Usuario con ID {id} no encontrado.");
            }
            return Ok(usuarioEditado);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult> DeleteUsuario(int id)
        {
            var exito = await _services.EliminarUsuario(id);
            if (!exito)
            {
                return NotFound($"Usuario con ID {id} no encontrado.");
            }
            return NoContent();
        }
    }
}