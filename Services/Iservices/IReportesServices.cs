using Domain.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Iservices
{
    public interface IReportesServices
    {
        Task<IEnumerable<ReportesDto>> ObtenerReportes();
        Task<ReportesDto> ObtenerReportePorId(int idReporte);
        Task<ReportesDto> CrearReporte(ReportesDto reporteDto);
        Task<ReportesDto> EditarReporte(int idReporte, ReportesDto reporteDto);
        Task<bool> EliminarReporte(int idReporte);
    }
}
