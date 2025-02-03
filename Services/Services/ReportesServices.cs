using Domain.Dto;
using Microsoft.EntityFrameworkCore;
using Services.Iservices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApiIncidentManager.Models;

namespace Services.Services
{
    public class ReportesServices : IReportesServices
    {
        private readonly SistemaKempinskiContext _dBcontext;

        public ReportesServices(SistemaKempinskiContext sistemaKempinskiContext)
        {
            _dBcontext = sistemaKempinskiContext;
        }
        public async Task<IEnumerable<ReportesDto>> ObtenerReportes()
        {
            return await _dBcontext.Reportes
                .AsNoTracking()
                .Select(r => new ReportesDto
                {
                    IdReporte = r.IdReporte,
                    Titulo = r.Titulo,
                    FkDestinatario = r.FkDestinatario,
                    FkPrioridad = r.FkPrioridad,
                    Descripcion = r.Descripcion,
                    FkEstado = r.FkEstado,
                    FechaCreada = r.FechaCreada
                }).ToListAsync();
        }
        public async Task<ReportesDto> ObtenerReportePorId(int idReporte)
        {
            var reporte = await _dBcontext.Reportes
                .FirstOrDefaultAsync(r => r.IdReporte == idReporte);

            if (reporte == null)
            {
                return null;
            }

            return new ReportesDto
            {
                IdReporte = reporte.IdReporte,
                Titulo = reporte.Titulo,
                FkDestinatario = reporte.FkDestinatario,
                FkPrioridad = reporte.FkPrioridad,
                Descripcion = reporte.Descripcion,
                FkEstado = reporte.FkEstado,
                FechaCreada = reporte.FechaCreada
            };
        }

        public async Task<ReportesDto> CrearReporte(ReportesDto reporteDto)
        {
            if (string.IsNullOrWhiteSpace(reporteDto.Titulo) || string.IsNullOrWhiteSpace(reporteDto.Descripcion))
            {
                throw new ArgumentException("El título y la descripción son requeridos.");
            }

            var reporte = new Reporte
            {
                Titulo = reporteDto.Titulo,
                FkDestinatario = reporteDto.FkDestinatario,
                FkPrioridad = reporteDto.FkPrioridad,
                Descripcion = reporteDto.Descripcion,
                FkEstado = reporteDto.FkEstado,
                FechaCreada = DateTime.UtcNow 
            };

            await _dBcontext.Reportes.AddAsync(reporte);
            await _dBcontext.SaveChangesAsync();

            reporteDto.IdReporte = reporte.IdReporte;
            return reporteDto;
        }

       
        public async Task<ReportesDto> EditarReporte(int idReporte, ReportesDto reporteDto)
        {
            var reporte = await _dBcontext.Reportes.FirstOrDefaultAsync(r => r.IdReporte == idReporte);

            if (reporte == null)
            {
                return null; 
            }

            reporte.Titulo = reporteDto.Titulo;
            reporte.FkDestinatario = reporteDto.FkDestinatario;
            reporte.FkPrioridad = reporteDto.FkPrioridad;
            reporte.Descripcion = reporteDto.Descripcion;
            reporte.FkEstado = reporteDto.FkEstado;

            await _dBcontext.SaveChangesAsync();

            return reporteDto;
        }

        public async Task<bool> EliminarReporte(int idReporte)
        {
            var reporte = await _dBcontext.Reportes.FindAsync(idReporte);

            if (reporte == null)
            {
                return false; 
            }

            _dBcontext.Reportes.Remove(reporte);
            await _dBcontext.SaveChangesAsync();

            return true; 
        }
    }
}
