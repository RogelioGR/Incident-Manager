using Domain.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services.Iservices;

namespace WebApiIncidentManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoReporteController : Controller
    {
        private readonly ITipoReporteServices _services;
        public TipoReporteController(ITipoReporteServices services)
        {
            _services = services;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoReporteDto>>> GetTiporeporte()
        {
            var tipo = await _services.ObtenerTipoReporte();
            if (tipo == null)
            {
                return NotFound();
            }
            return Ok(tipo);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TipoReporteDto>> GetTiporeporteId(int id)
        {
            var tipo = await _services.ObtenerTipoReportePorId(id);
            if (tipo == null)
            {
                return NotFound($"prioridades con ID {id} no encontrado.");
            }
            return Ok(tipo);
        }
    }
}
