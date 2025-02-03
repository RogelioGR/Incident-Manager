using Domain.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Iservices
{
    public interface IComentarioServices
    {
        Task<IEnumerable<ComentarioDto>> ObtenerComentarios();
        Task<ComentarioDto> ObtenerComentarioPorId(int idComentario);
        Task<ComentarioDto> CrearComentario(string comentario, int fkReporte);
        Task<ComentarioDto> EditarComentario(int idComentario, string comentario, int fkReporte);
        Task<bool> EliminarComentario(int idComentario);
    }
}