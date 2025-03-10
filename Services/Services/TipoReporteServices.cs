using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Services.Iservices;
using Repository.ModelsDb;
using Domain.Dto;
using Microsoft.EntityFrameworkCore;

namespace Services.Services
{
    public class TipoReporteServices : ITipoReporteServices
    {
        private readonly SistemaKempinskiContext _dBcontext;
        public TipoReporteServices(SistemaKempinskiContext dBcontext)
        {
            _dBcontext = dBcontext;
        }

        public async Task<IEnumerable<TipoReporteDto>> ObtenerTipoReporte()
        {
            return await _dBcontext.TipoReportes
                .AsNoTracking()
                .Select(t => new TipoReporteDto
                {
                    IdTipo = t.IdTipo,
                    NombreTipo = t.NombreTipo,

                }).ToListAsync();
        }

        public async Task<TipoReporteDto> ObtenerTipoReportePorId(int id)
        {
            var Tipo = await _dBcontext.TipoReportes
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.IdTipo == id);

            if (Tipo == null)
            {
                return null;
            }

            return new TipoReporteDto
            {
                IdTipo = Tipo.IdTipo,
                NombreTipo = Tipo.NombreTipo
            };
        }
    }

}
