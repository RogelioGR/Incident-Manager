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
    public class DepartamentoServices : IDepartamentoServices
    {
        private readonly SistemaKempinskiContext _dBcontext;

        public DepartamentoServices(SistemaKempinskiContext sistemaKempinskiContext)
        {
            _dBcontext = sistemaKempinskiContext;
        }

        public async Task<IEnumerable<DepartamentoDto>> ObtenerDepartamento()
        {
            return await _dBcontext.Departamentos
                .AsNoTracking()
                .Select(d => new DepartamentoDto
                {
                    IdDepartamento = d.IdDepartamento,
                    NombreDepartamentos = d.NombreDepartamentos,
                    Extension = d.Extension
                }).ToListAsync();
        }

        public async Task<DepartamentoDto> ObtenerDepartamentoPorId(int id)
        {
            var departamento = await _dBcontext.Departamentos
                .AsNoTracking()
                .FirstOrDefaultAsync(d => d.IdDepartamento == id);

            if (departamento == null)
            {
                return null;
            }

            return new DepartamentoDto
            {
                IdDepartamento = departamento.IdDepartamento,
                NombreDepartamentos = departamento.NombreDepartamentos,
                Extension = departamento.Extension
            };
        }

        public async Task<DepartamentoDto> CrearDepartamento(DepartamentoDto departamentoDto)
        {

            if (string.IsNullOrWhiteSpace(departamentoDto.NombreDepartamentos))
            {
                throw new ArgumentException("el nombre son reuqueridos.");
            }


            var depart = new Departamento
            {
                NombreDepartamentos = departamentoDto.NombreDepartamentos,
                Extension = departamentoDto.Extension
            };

            await _dBcontext.Departamentos.AddAsync(depart);
            await _dBcontext.SaveChangesAsync();

            return departamentoDto;
            
        }

        public async Task<DepartamentoDto> EditarDepartamento(int iddepartamento, string nombreDepartamento, int extension)
        {
            var depart = await _dBcontext.Departamentos.FirstOrDefaultAsync(d => d.IdDepartamento == iddepartamento);

            if (depart == null)
            {
                return null;
            }
            depart.NombreDepartamentos = nombreDepartamento;
            depart.Extension = extension;
            await _dBcontext.SaveChangesAsync();

            return new DepartamentoDto
            {
                IdDepartamento = depart.IdDepartamento,
                NombreDepartamentos = depart.NombreDepartamentos,
                Extension = depart.Extension
            };
        }

        // Funcion para eliminar el departamento
        public async Task<bool> EliminarDepartamento(int idepartamento)
        {
            try
            {
                var depart = await _dBcontext.Departamentos.FindAsync(idepartamento);
                    if (depart == null)
                {
                    return false;
                }
                _dBcontext.Departamentos.Remove(depart);
                await _dBcontext.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el departamento", ex);
            }
        }
    }
}
