using Services.Iservices;
using Domain.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;
using Repository.ModelsDb;

namespace Services.Services
{
    public class EstadosReportesServices : IEstadosReportesServices
    {
        private readonly SistemaKempinskiContext _dBcontext;

        public EstadosReportesServices(SistemaKempinskiContext sistemaKempinskiContext)
        {
            _dBcontext = sistemaKempinskiContext;
        }

        public async Task<IEnumerable<EstadosReporteDto>> ObtenerEstadosReportes()
        {
            return await _dBcontext.EstadosReportes
                .AsNoTracking()
                .Select(est => new EstadosReporteDto
                {
                    IdEstado = est.IdEstado,
                    NombreEstado = est.NombreEstado,
                }).ToListAsync();

        }
        public async Task<EstadosReporteDto> ObtenerEstReportePorId(int id)
        {
            var estadoReporte = await _dBcontext.EstadosReportes
                .AsNoTracking()
                .FirstOrDefaultAsync(er => er.IdEstado == id);

            if (estadoReporte == null)
            {
                return null;
            }

            return new EstadosReporteDto
            {
                IdEstado = estadoReporte.IdEstado,
                NombreEstado = estadoReporte.NombreEstado,
            };
        }


        public async Task<EstadosReporteDto> CrearEstadoReporte(string nombreest)
        {
            var est = new EstadosReporte
            {
                NombreEstado = nombreest
            };

            if(string.IsNullOrWhiteSpace(nombreest))
            {
                throw new ArgumentException("El nombre del estado es requerido");
            }
            await _dBcontext.EstadosReportes.AddAsync(est);
            await _dBcontext.SaveChangesAsync();

            return new EstadosReporteDto
            {
                IdEstado = est.IdEstado,
                NombreEstado = est.NombreEstado
            };
        }

        public async Task<EstadosReporteDto> EditarEstadoReporte(int idestadoreporte , String nombreest)
        {
            var est = await _dBcontext.EstadosReportes.FirstOrDefaultAsync(er => er.IdEstado == idestadoreporte);

            if(est == null)
            {
                return null;
            }
            est.IdEstado = idestadoreporte;
            est.NombreEstado = nombreest;
            await _dBcontext.SaveChangesAsync();

            return new EstadosReporteDto
            {
                IdEstado = est.IdEstado,
                NombreEstado = est.NombreEstado
            };

        }

        public async Task<bool> EliminarEstadoReporte(int idestadoreporte)
        {
            try
            {
                var est = await _dBcontext.EstadosReportes.FindAsync(idestadoreporte);
                if(est == null)
                {
                    return false; 
                }
                _dBcontext.EstadosReportes.Remove(est);
                await _dBcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el departamento", ex);
            }

        }
    }
}
