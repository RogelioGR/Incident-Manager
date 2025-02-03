using Domain.Dto;
using Domain.Dto.CreateDto;
using Microsoft.AspNetCore.Mvc;
using Services.Iservices;

namespace WebApiIncidentManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComentarioController : Controller
    {
        private readonly IComentarioServices _services;

        public ComentarioController(IComentarioServices services)
        {
            _services = services;
        }

        // Obtener todos los comentarios
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

        // Obtener un comentario por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<ComentarioDto>> GetComentarioPorId(int idComentario)
        {
            var comentario = await _services.ObtenerComentarioPorId(idComentario);
            if (comentario == null)
            {
                return NotFound($"Comentario con ID {idComentario} no encontrado.");
            }
            return Ok(comentario);
        }

        // Crear un nuevo comentario
        [HttpPost]
        public async Task<ActionResult<ComentarioDto>> CrearComentario([FromBody] CreateComentarioDto request)
        {
            var comentarioCreado = await _services.CrearComentario(request.Comentario1, request.FkReporte);
            return CreatedAtAction(nameof(GetComentarioPorId), new { idComentario = comentarioCreado.IdComentarios }, comentarioCreado);
        }

        // Editar un comentario existente
        [HttpPut("{id}")]
        public async Task<ActionResult<ComentarioDto>> EditarComentario(int idComentario, [FromBody] CreateComentarioDto request)
        {
            var comentarioEditado = await _services.EditarComentario(idComentario, request.Comentario1, request.FkReporte);
            if (comentarioEditado == null)
            {
                return NotFound($"Comentario con ID {idComentario} no encontrado.");
            }
            return Ok(comentarioEditado);
        }

        // Eliminar un comentario
        [HttpDelete("{id}")]
        public async Task<ActionResult> EliminarComentario(int idComentario)
        {
            var exito = await _services.EliminarComentario(idComentario);
            if (!exito)
            {
                return NotFound($"Comentario con ID {idComentario} no encontrado.");
            }
            return NoContent();
        }
    }
}
