using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Dto;
using Microsoft.EntityFrameworkCore;
using Services.Iservices;
using WebApiIncidentManager.Models;

namespace Services.Services
{
    public class RolesServices : IRolesServices
    {
        private readonly SistemaKempinskiContext _dBcontext;

        public RolesServices(SistemaKempinskiContext sistemaKempinskiContext)
        {
            _dBcontext = sistemaKempinskiContext;
        }

        /// Obtiene una lista de todos los roles.
        public async Task<IEnumerable<RolesDto>> ObtenerRoles()
        {
            return await _dBcontext.Roles
                .AsNoTracking()
                .Select(r => new RolesDto
                {
                    IdRol = r.IdRol,
                    NombreRol = r.NombreRol
                }).ToListAsync();
        }

        public async Task<RolesDto> ObtenerRolesPorId(int id)
        {
            var roles = await _dBcontext.Roles
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.IdRol == id);

            if (roles == null)
            {
                return null;
            }

            return new RolesDto
            {
                IdRol = roles.IdRol,
                NombreRol = roles.NombreRol,
            };
        }


        /// Crea un nuevo rol.
        public async Task<RolesDto> CrearRol(string nombreRol)
        {
            var rol = new Role 
            { 
                NombreRol = nombreRol 
            };

            if (string.IsNullOrWhiteSpace(nombreRol))
            {
                throw new ArgumentException("El nombre del rol es requerido");
            }
            else if (await _dBcontext.Roles.AnyAsync(r => r.NombreRol == nombreRol))
            {
                throw new RolExistenteException("El nombre del rol ya existe");
            }

            await _dBcontext.Roles.AddAsync(rol);
            await _dBcontext.SaveChangesAsync();

            return new RolesDto
            {
                IdRol = rol.IdRol,
                NombreRol = rol.NombreRol
            };
        }

        /// Edita un rol existente.
   
        public async Task<RolesDto> EditarRol(int idRol, string nombreRol)
        {
            var rol = await _dBcontext.Roles.FirstOrDefaultAsync(r => r.IdRol == idRol);
            if (rol == null)
            {
                return null; // Si el rol no existe, retornamos null
            }
            rol.NombreRol = nombreRol;
            await _dBcontext.SaveChangesAsync();
            return new RolesDto
            {
                IdRol = rol.IdRol,
                NombreRol = rol.NombreRol
            };
        }

        /// Elimina un rol existente.
        public async Task<bool> EliminarRol(int idRol)
        {
            try
            {
                var rol = await _dBcontext.Roles.FindAsync(idRol);

                if (rol == null)
                {
                    return false; // Si el rol no existe, retornamos false
                }
                _dBcontext.Roles.Remove(rol);
                await _dBcontext.SaveChangesAsync();

                return true; // Rol eliminado exitosamente
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el rol", ex);
            }
        }
    }

    public class RolExistenteException : Exception
    {
        public RolExistenteException(string message) : base(message) { }
    }
}