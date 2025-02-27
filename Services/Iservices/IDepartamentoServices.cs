using Domain.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Iservices
{
    public interface IDepartamentoServices
    {
        Task<IEnumerable<DepartamentoDto>> ObtenerDepartamento();
        Task<DepartamentoDto> ObtenerDepartamentoPorId(int id);
        Task<DepartamentoDto> CrearDepartamento(string NombreDepartamento, int Extension);
        Task<DepartamentoDto> EditarDepartamento(int iddepartamento, string nombreDepartamento, int extension);
        Task<bool> EliminarDepartamento(int iddepartamento);
    }
}
