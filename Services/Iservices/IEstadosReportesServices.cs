using Domain.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Iservices
{
    public interface IEstadosReportesServices
    {
        Task<IEnumerable<EstadosReporteDto>> ObtenerEstadosReportes();
        Task<EstadosReporteDto> ObtenerEstReportePorId(int id);
        Task<EstadosReporteDto> CrearEstadoReporte(string nombreest);
        Task<EstadosReporteDto> EditarEstadoReporte(int idestadoreporte, String nombreest);
        Task<bool> EliminarEstadoReporte(int idestadoreporte);
    }
}
