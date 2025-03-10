using Domain.Dto;
using Microsoft.EntityFrameworkCore;
using Services.Iservices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.ModelsDb;

namespace Services.Services
{
    public class ReporteUsuarioServices : IReporteUsuarioServices
    {
        private readonly SistemaKempinskiContext _dBcontext;

        public ReporteUsuarioServices(SistemaKempinskiContext sistemaKempinskiContext)
        {
            _dBcontext = sistemaKempinskiContext;
        }
        public async Task<IEnumerable<ReporteUsuarioDto>> ObtenerReportesUsuarios()
        {
            return await _dBcontext.ReporteUsuarios
                .Include(ru => ru.FkReporteNavigation) 
                .Include(ru => ru.FkUsuarioNavigation) 
                .AsNoTracking()
                .Select(ru => new ReporteUsuarioDto
                {
                    IdReporteU = ru.IdReporteU,
                    FkReporte = ru.FkReporte,
                    FkUsuario = ru.FkUsuario,
                    FkReporteNavigation = ru.FkReporteNavigation != null ? new ReportesDto
                    {
                        IdReporte = ru.FkReporteNavigation.IdReporte,
                        Titulo = ru.FkReporteNavigation.Titulo,
                        FkDestinatario = ru.FkReporteNavigation.FkDestinatario,
                        FkPrioridad = ru.FkReporteNavigation.FkPrioridad,
                        Descripcion = ru.FkReporteNavigation.Descripcion,
                        FkEstado = ru.FkReporteNavigation.FkEstado,
                        FechaCreada = ru.FkReporteNavigation.FechaCreada
                    } : null,
                    FkUsuarioNavigation = ru.FkUsuarioNavigation != null ? new UsuariosDto
                    {
                        IdUsuarios = ru.FkUsuarioNavigation.IdUsuarios,
                        Nombre = ru.FkUsuarioNavigation.Nombre,
                        Apellidos = ru.FkUsuarioNavigation.Apellidos,
                        CorreoElectronico = ru.FkUsuarioNavigation.CorreoElectronico,
                        CorreoPersonal = ru.FkUsuarioNavigation.CorreoPersonal,
                        Contraseña = ru.FkUsuarioNavigation.Contraseña,
                        FkDepartamento = ru.FkUsuarioNavigation.FkDepartamento,
                        FkRol = ru.FkUsuarioNavigation.FkRol
                    } : null
                }).ToListAsync();
        }

        public async Task<ReporteUsuarioDto> ObtenerReporteUsuarioPorId(int idReporteU)
        {
            var reporteUsuario = await _dBcontext.ReporteUsuarios
                .Include(ru => ru.FkReporteNavigation) 
                .Include(ru => ru.FkUsuarioNavigation) 
                .AsNoTracking()
                .FirstOrDefaultAsync(ru => ru.FkUsuario == idReporteU);

            if (reporteUsuario == null)
            {
                return null;
            }

            return new ReporteUsuarioDto
            {
                IdReporteU = reporteUsuario.IdReporteU,
                FkReporte = reporteUsuario.FkReporte,
                FkUsuario = reporteUsuario.FkUsuario,
                FkReporteNavigation = reporteUsuario.FkReporteNavigation != null ? new ReportesDto
                {
                    IdReporte = reporteUsuario.FkReporteNavigation.IdReporte,
                    Titulo = reporteUsuario.FkReporteNavigation.Titulo,
                    FkDestinatario = reporteUsuario.FkReporteNavigation.FkDestinatario,
                    FkPrioridad = reporteUsuario.FkReporteNavigation.FkPrioridad,
                    Descripcion = reporteUsuario.FkReporteNavigation.Descripcion,
                    FkEstado = reporteUsuario.FkReporteNavigation.FkEstado,
                    FechaCreada = reporteUsuario.FkReporteNavigation.FechaCreada
                } : null,
                FkUsuarioNavigation = reporteUsuario.FkUsuarioNavigation != null ? new UsuariosDto
                {
                    IdUsuarios = reporteUsuario.FkUsuarioNavigation.IdUsuarios,
                    Nombre = reporteUsuario.FkUsuarioNavigation.Nombre,
                    Apellidos = reporteUsuario.FkUsuarioNavigation.Apellidos,
                    CorreoElectronico = reporteUsuario.FkUsuarioNavigation.CorreoElectronico,
                    CorreoPersonal = reporteUsuario.FkUsuarioNavigation.CorreoPersonal,
                    Contraseña = reporteUsuario.FkUsuarioNavigation.Contraseña,
                    FkDepartamento = reporteUsuario.FkUsuarioNavigation.FkDepartamento,
                    FkRol = reporteUsuario.FkUsuarioNavigation.FkRol
                } : null
            };
        }

        public async Task<ReporteUsuarioDto> CrearReporteUsuario(int fkReporte, int fkUsuario)
        {
            var reporteUsuario = new ReporteUsuario
            {
                FkReporte = fkReporte,
                FkUsuario = fkUsuario
            };

            if (fkReporte <= 0)
            {
                throw new ArgumentException("El ID del reporte es requerido.");
            }

            if (fkUsuario <= 0)
            {
                throw new ArgumentException("El ID del usuario es requerido.");
            }

            await _dBcontext.ReporteUsuarios.AddAsync(reporteUsuario);
            await _dBcontext.SaveChangesAsync();

            return new ReporteUsuarioDto
            {
                IdReporteU = reporteUsuario.IdReporteU,
                FkReporte = reporteUsuario.FkReporte,
                FkUsuario = reporteUsuario.FkUsuario,
            
            };
        }

        public async Task<ReporteUsuarioDto> EditarReporteUsuario(int idReporteU, int fkReporte, int fkUsuario)
        {
            var reporteUsuario = await _dBcontext.ReporteUsuarios.FirstOrDefaultAsync(ru => ru.IdReporteU == idReporteU);

            if (reporteUsuario == null)
            {
                return null;
            }

            reporteUsuario.FkReporte = fkReporte;
            reporteUsuario.FkUsuario = fkUsuario;
            await _dBcontext.SaveChangesAsync();

            return new ReporteUsuarioDto
            {
                IdReporteU = reporteUsuario.IdReporteU,
                FkReporte = reporteUsuario.FkReporte,
                FkUsuario = reporteUsuario.FkUsuario,
            
            };
        }

        public async Task<bool> EliminarReporteUsuario(int idReporteU)
        {
            try
            {
                var reporteUsuario = await _dBcontext.ReporteUsuarios.FindAsync(idReporteU);
                if (reporteUsuario == null)
                {
                    return false;
                }
                _dBcontext.ReporteUsuarios.Remove(reporteUsuario);
                await _dBcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el reporte de usuario", ex);
            }
        }
    }
}
