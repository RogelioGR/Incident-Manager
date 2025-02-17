using Domain.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services.Iservices;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApiIncidentManager.Models;

namespace WebApiIncidentManager.Controllers
{
    [Authorize] // Asegura que solo usuarios autenticados puedan acceder
    [Route("[controller]")]
    [ApiController]
    public class ViewsController : Controller
    {
        private readonly IUsuarioServices _usuarioServices;
        private readonly SistemaKempinskiContext _sistemaKempinskiContext;

   
        private readonly IUsuarioServices _services;
        public ViewsController(IUsuarioServices services)
        {
            _services = services;
        }
        [HttpGet("viewUsers")]
        public async Task<ActionResult<IEnumerable<VistaUsuarioDto>>> ViewUsuario()
        {
            var  ViewUsuario = await _services.ObtenerVistaUsuarios();
            if (ViewUsuario == null)
            {
                return NotFound();
            }
            return Ok(ViewUsuario);
        }


    }
}
