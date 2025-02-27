using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Dto;
using Microsoft.EntityFrameworkCore;
using Services.Iservices;
using WebApiIncidentManager.Models;


namespace Services.Services
{
    public class PrioridadServices : IPrioridadServices
    {
        private readonly SistemaKempinskiContext _dBcontext;
        public PrioridadServices(SistemaKempinskiContext sistemaKempinskiContext)
        {
            _dBcontext = sistemaKempinskiContext;
        }
        public async Task<IEnumerable<PrioridadDto>> ObtenerPrioridad()
        {
            return await _dBcontext.Prioridads
                .AsNoTracking()
                .Select(p => new PrioridadDto
                {
                    IdPrioridad = p.IdPrioridad,
                    NombrePrioridad = p.NombrePrioridad
              
                }).ToListAsync();
        }

        public async Task<PrioridadDto> ObtenerPrioridadPorId(int id)
        {
            var prioridad = await _dBcontext.Prioridads
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.IdPrioridad == id);

            if (prioridad == null)
            {
                return null;
            }

            return new PrioridadDto
            {
                IdPrioridad = prioridad.IdPrioridad,
                NombrePrioridad = prioridad.NombrePrioridad
            };
        }


        public async Task<PrioridadDto> CrearPrioridad(string nombrePrioridad)
        {
            var prio = new Prioridad
            {
                NombrePrioridad = nombrePrioridad,
            };

            if (string.IsNullOrWhiteSpace(nombrePrioridad))
            {
                throw new ArgumentException("El nombre es requerido.");
            }
            await _dBcontext.Prioridads.AddAsync(prio);
            await _dBcontext.SaveChangesAsync();

            return new PrioridadDto
            {
                IdPrioridad = prio.IdPrioridad,
                NombrePrioridad = prio.NombrePrioridad,
            };
        }
        public async Task<PrioridadDto> Editarprioridad(int idprioridad, String nombreprioridad)
        {
            var pridad = await _dBcontext.Prioridads.FirstOrDefaultAsync(prid => prid.IdPrioridad == idprioridad);

            if (pridad == null)
            {
                return null;
            }
            pridad.IdPrioridad = idprioridad;
            pridad.NombrePrioridad = nombreprioridad;
            await _dBcontext.SaveChangesAsync();

            return new PrioridadDto
            {
                IdPrioridad = pridad.IdPrioridad,
                NombrePrioridad = pridad.NombrePrioridad
            };

        }
        public async Task<bool> EliminarPrioridad(int idprioridad)
        {
            try
            {
                var prid = await _dBcontext.Prioridads.FindAsync(idprioridad);
                if (prid == null)
                {
                    return false;
                }
                _dBcontext.Prioridads.Remove(prid);
                await _dBcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar", ex);
            }

        }

    }
}
