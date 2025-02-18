using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Services.Iservices;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain.Dto;
using WebApiIncidentManager.Models;

namespace WebApiIncidentManager.Controllers
{

    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUsuarioServices _usuarioServices;
        private readonly SistemaKempinskiContext _sistemaKempinskiContext;
        private readonly IConfiguration _configuration;

        public AuthController(SistemaKempinskiContext sistemaKempinskiContext, IConfiguration configuration, IUsuarioServices usuariosServices)
        {
            _configuration = configuration;
            _usuarioServices = usuariosServices;
            _sistemaKempinskiContext = sistemaKempinskiContext;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioLoginDto usuarioLogin)
        {
            if (usuarioLogin == null || string.IsNullOrWhiteSpace(usuarioLogin.Correo) || string.IsNullOrWhiteSpace(usuarioLogin.Contraseña))
            {
                return BadRequest("Correo y contraseña son obligatorios.");
            }

            var usuario = await _usuarioServices.ValidarUsuario(usuarioLogin.Correo, usuarioLogin.Contraseña);
            if (usuario == null)
            {
                return Unauthorized("Credenciales incorrectas");
            }

            var persona = await _sistemaKempinskiContext.Usuarios.FirstOrDefaultAsync(x => x.IdUsuarios == usuario.IdUsuarios);
            if (persona == null)
            {
                return BadRequest("Usuario no encontrado.");
            }

            var jwtKey = _configuration["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
            {
                return StatusCode(500, "Error en la configuración del servidor.");
            }

            var key = Encoding.UTF8.GetBytes(jwtKey);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("UserId", usuario.IdUsuarios.ToString()),
                    new Claim(ClaimTypes.Email, usuario.CorreoElectronico),
                }),
                Expires = DateTime.UtcNow.AddHours(2), //tiempo de vida de token
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);

            return Ok(
                new {
                    Token = jwtToken,
                    usuario.IdUsuarios,
                    usuario.FkRol
                });
        }
    }
}
