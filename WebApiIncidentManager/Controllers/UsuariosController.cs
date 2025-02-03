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
        [HttpPost]
        public async Task<ActionResult<UsuariosDto>> CrearUsuario([FromBody] CreateUsuariosDto request)
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

        [HttpPut("{idUsuario}")]
        public async Task<ActionResult<UsuariosDto>> EditarUsuario(int idUsuario, [FromBody] CreateUsuariosDto request)
        {
            var usuarioEditado = await _services.EditarUsuario(idUsuario, new UsuariosDto
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
                return NotFound($"Usuario con ID {idUsuario} no encontrado.");
            }
            return Ok(usuarioEditado);
        }
        [HttpDelete("{idUsuario}")]
        public async Task<ActionResult> EliminarUsuario(int idUsuario)
        {
            var exito = await _services.EliminarUsuario(idUsuario);
            if (!exito)
            {
                return NotFound($"Usuario con ID {idUsuario} no encontrado.");
            }
            return NoContent();
        }
    }
}