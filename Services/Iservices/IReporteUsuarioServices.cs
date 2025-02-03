using Domain.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Iservices
{
    public interface IReporteUsuarioServices
    {
        Task<IEnumerable<ReporteUsuarioDto>> ObtenerReportesUsuarios();
        Task<ReporteUsuarioDto> CrearReporteUsuario(int fkReporte, int fkUsuario);
        Task<ReporteUsuarioDto> EditarReporteUsuario(int idReporteU, int fkReporte, int fkUsuario);
        Task<bool> EliminarReporteUsuario(int idReporteU);
        Task<ReporteUsuarioDto> ObtenerReporteUsuarioPorId(int idReporteU);



    }
}
