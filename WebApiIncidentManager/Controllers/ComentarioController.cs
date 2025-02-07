using Domain.Dto;
using Domain.Dto.CreateDto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Iservices;

namespace WebApiIncidentManager.Controllers
{
    [Authorize] // Asegura que solo usuarios autenticados puedan acceder

    [Route("api/[controller]")]
    [ApiController]
    public class ComentarioController : Controller
    {
        private readonly IComentarioServices _services;
        public ComentarioController(IComentarioServices services)
        {
            _services = services;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ComentarioDto>>> GetComentarios()
        {
            var comentarios = await _services.ObtenerComentarios();
            if (comentarios == null)
            {
                return NotFound();
            }
            return Ok(comentarios);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ComentarioDto>> GetComentarioPorId(int id)
        {
            var comentario = await _services.ObtenerComentarioPorId(id);
            if (comentario == null)
            {
                return NotFound($"Comentario con ID {id} no encontrado.");
            }
            return Ok(comentario);
        }

        [HttpPost]
        public async Task<ActionResult<ComentarioDto>> PostComentario([FromBody] CreateComentarioDto request)
        {
            var comentarioCreado = await _services.CrearComentario(request.Comentario1, request.FkReporte);
            return CreatedAtAction(nameof(GetComentarioPorId), new { idComentario = comentarioCreado.IdComentarios }, comentarioCreado);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ComentarioDto>> PutComentario(int id, [FromBody] CreateComentarioDto request)
        {
            var comentarioEditado = await _services.EditarComentario(id, request.Comentario1, request.FkReporte);
            if (comentarioEditado == null)
            {
                return NotFound($"Comentario con ID {id} no encontrado.");
            }
            return Ok(comentarioEditado);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteComentario(int id)
        {
            var exito = await _services.EliminarComentario(id);
            if (!exito)
            {
                return NotFound($"Comentario con ID {id} no encontrado.");
            }
            return NoContent();
        }
    }
}
