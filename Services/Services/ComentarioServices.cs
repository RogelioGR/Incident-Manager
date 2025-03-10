using Domain.Dto;
using Microsoft.EntityFrameworkCore;
using Services.Iservices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Repository.ModelsDb;

namespace Services.Services
{
    public class ComentarioServices : IComentarioServices
    {
        private readonly SistemaKempinskiContext _dBcontext;

        public ComentarioServices(SistemaKempinskiContext sistemaKempinskiContext)
        {
            _dBcontext = sistemaKempinskiContext;
        }

        public async Task<IEnumerable<ComentarioDto>> ObtenerComentarios()
        {
            return await _dBcontext.Comentarios
                .AsNoTracking()
                .Select(c => new ComentarioDto
                {
                    IdComentarios = c.IdComentarios,
                    Comentario1 = c.Comentario1,
                    FkReporte = c.FkReporte
                }).ToListAsync();
        }

        public async Task<ComentarioDto> ObtenerComentarioPorId(int idComentario)
        {
            var comentario = await _dBcontext.Comentarios
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.IdComentarios == idComentario);

            if (comentario == null)
            {
                return null;
            }

            return new ComentarioDto
            {
                IdComentarios = comentario.IdComentarios,
                Comentario1 = comentario.Comentario1,
                FkReporte = comentario.FkReporte
            };
        }

        public async Task<ComentarioDto> CrearComentario(string comentario, int fkReporte)
        {
            if (string.IsNullOrWhiteSpace(comentario))
            {
                throw new ArgumentException("El comentario no puede estar vacío.");
            }

            if (fkReporte <= 0)
            {
                throw new ArgumentException("El ID del reporte es inválido.");
            }

            var nuevoComentario = new Comentario
            {
                Comentario1 = comentario,
                FkReporte = fkReporte
            };

            await _dBcontext.Comentarios.AddAsync(nuevoComentario);
            await _dBcontext.SaveChangesAsync();

            return new ComentarioDto
            {
                IdComentarios = nuevoComentario.IdComentarios,
                Comentario1 = nuevoComentario.Comentario1,
                FkReporte = nuevoComentario.FkReporte
            };
        }

        public async Task<ComentarioDto> EditarComentario(int idComentario, string comentario, int fkReporte)
        {
            var comentarioExistente = await _dBcontext.Comentarios
                .FirstOrDefaultAsync(c => c.IdComentarios == idComentario);

            if (comentarioExistente == null)
            {
                return null;
            }

            comentarioExistente.Comentario1 = comentario;
            comentarioExistente.FkReporte = fkReporte;

            await _dBcontext.SaveChangesAsync();

            return new ComentarioDto
            {
                IdComentarios = comentarioExistente.IdComentarios,
                Comentario1 = comentarioExistente.Comentario1,
                FkReporte = comentarioExistente.FkReporte
            };
        }

        public async Task<bool> EliminarComentario(int idComentario)
        {
            var comentario = await _dBcontext.Comentarios
                .FirstOrDefaultAsync(c => c.IdComentarios == idComentario);

            if (comentario == null)
            {
                return false;
            }

            _dBcontext.Comentarios.Remove(comentario);
            await _dBcontext.SaveChangesAsync();

            return true;
        }
    }
}