using Domain.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Iservices
{
    public interface IRolesServices
    {
        Task<IEnumerable<RolesDto>> ObtenerRoles();
        Task<RolesDto> CrearRol(string nombreRol);
        Task<RolesDto> EditarRol(int idRol, string nombreRol);
        Task<bool> EliminarRol(int idRol);
    }
}
