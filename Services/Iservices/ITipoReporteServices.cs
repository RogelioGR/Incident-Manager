using Domain.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Iservices
{
    public interface ITipoReporteServices
    {
        Task<IEnumerable<TipoReporteDto>> ObtenerTipoReporte();
        Task<TipoReporteDto> ObtenerTipoReportePorId(int id);
    }
}
