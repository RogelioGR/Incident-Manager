using Domain.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Iservices
{
    public interface IPrioridadServices
    {
        Task<IEnumerable<PrioridadDto>> ObtenerPrioridad();
        Task<PrioridadDto> ObtenerPrioridadPorId(int id);
        Task<PrioridadDto> CrearPrioridad(string nombrePrioridad);

        Task<PrioridadDto> Editarprioridad(int idprioridad, String nombreprioridad);

        Task<bool> EliminarPrioridad(int idprioridad);


    }
}
