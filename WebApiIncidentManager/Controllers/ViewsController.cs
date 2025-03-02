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
        private readonly IReportesServices _reportesServices;
        private readonly SistemaKempinskiContext _sistemaKempinskiContext;

        public ViewsController(IUsuarioServices usuarioServices, IReportesServices reportesServices)
        {
            _usuarioServices = usuarioServices;
            _reportesServices = reportesServices;
        }
        [HttpGet("viewUsers")]
        public async Task<ActionResult<IEnumerable<VistaUsuarioDto>>> ViewUsuario()
        {
            var  ViewUsuario = await _usuarioServices.ObtenerVistaUsuarios();
            if (ViewUsuario == null)
            {
                return NotFound();
            }
            return Ok(ViewUsuario);
        }

        [HttpGet("viewReports")]
        public async Task<ActionResult<IEnumerable<VistaUsuarioDto>>> ViewReportes()
        {
            var ViewReportes = await _reportesServices.ObtenerVistaReporte();
            if (ViewReportes == null)
            {
                return NotFound();
            }
            return Ok(ViewReportes);
        }

        [HttpGet("viewReports/{id}")]
        public async Task<ActionResult<IEnumerable<VistaUsuarioDto>>> ViewReportesId(int id)
        {
            var ViewReportes = await _reportesServices.ObtenerVistaReportePorId(id);
            if (ViewReportes == null)
            {
                return NotFound($"El reporte con ID {id} no encontrado.");
            }
            return Ok(ViewReportes);
        }

    }
}
