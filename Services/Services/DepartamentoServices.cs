using Domain.Dto;
using Microsoft.EntityFrameworkCore;
using Services.Iservices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApiIncidentManager.Models;


namespace Services.Services
{
    public class DepartamentoServices : IDepartamentoServices
    {
        private readonly SistemaKempinskiContext _dBcontext;

        public DepartamentoServices(SistemaKempinskiContext sistemaKempinskiContext)
        {
            _dBcontext = sistemaKempinskiContext;
        }

        public async Task<IEnumerable<DepartamentoDto>> ObtenerRoles()
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
        public async Task<DepartamentoDto> CrearDepartamento(string NombreDepartamento, int Extension)
        {
            var depart = new Departamento
            {
                NombreDepartamentos = NombreDepartamento,
                Extension = Extension
            };

            if (string.IsNullOrWhiteSpace(NombreDepartamento))
            {
                throw new ArgumentException("El nombre del departamento es requerido.");
            }

            if (Extension <= 0)
            {
                throw new ArgumentException("La extensión debe ser un número.");
            }

            await _dBcontext.Departamentos.AddAsync(depart);
            await _dBcontext.SaveChangesAsync();

            return new DepartamentoDto
            {
                IdDepartamento = depart.IdDepartamento,
                NombreDepartamentos = depart.NombreDepartamentos,
                Extension = depart.Extension
           
            };
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
        public async Task<bool> EliminarDepartamento(int iddepartamento)
        {
            try
            {
                var depart = await _dBcontext.Departamentos.FindAsync(iddepartamento);
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
