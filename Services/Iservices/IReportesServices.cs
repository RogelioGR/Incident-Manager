using Domain.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Services.Iservices
{
    public interface IReportesServices
    {
        Task<IEnumerable<ReportesDto>> ObtenerReportes();
        Task<IEnumerable<ReportesDto>> ObtenerReportesPorUsers(int id);
        Task<ReportesDto> ObtenerReportePorId(int idReporte);
        Task<ReportesDto> CrearReporteConUsuario(ReportesDto reporteDto, ClaimsPrincipal user);
        Task<ReportesDto> EditarReporte(int idReporte, ReportesDto reporteDto);
        Task<string> EliminarReporte(int idReporte);
    }
}
