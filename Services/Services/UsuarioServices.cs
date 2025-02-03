using System;
using System.Collections.Generic;
using Services.Iservices;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApiIncidentManager.Models;
using Domain.Dto;
using Microsoft.EntityFrameworkCore;

namespace Services.Services
{
    public class UsuarioServices : IUsuarioServices
    {
        private readonly SistemaKempinskiContext _dBcontext;

        public UsuarioServices(SistemaKempinskiContext sistemaKempinskiContext)
        {
            _dBcontext = sistemaKempinskiContext;

        }
        public async Task<IEnumerable<UsuariosDto>> ObtenerUsuarios()
        {
            return await _dBcontext.Usuarios
                .Include(u => u.FkDepartamentoNavigation)
                .Include(u => u.FkRolNavigation)
                .AsNoTracking()
                .Select(u => new UsuariosDto
                {
                    IdUsuarios = u.IdUsuarios,
                    Nombre = u.Nombre,
                    Apellidos = u.Apellidos,
                    CorreoElectronico = u.CorreoElectronico,
                    CorreoPersonal = u.CorreoPersonal,
                    Contraseña = u.Contraseña,
                    FkDepartamento = u.FkDepartamento,
                    FkRol = u.FkRol,
                    FkDepartamentoNavigation = u.FkDepartamentoNavigation != null ? new DepartamentoDto
                    {
                        IdDepartamento = u.FkDepartamentoNavigation.IdDepartamento,
                        NombreDepartamentos = u.FkDepartamentoNavigation.NombreDepartamentos,
                        Extension = u.FkDepartamentoNavigation.Extension // Asegúrate de mapear este campo
                    } : null,
                    FkRolNavigation = u.FkRolNavigation != null ? new RolesDto
                    {
                        IdRol = u.FkRolNavigation.IdRol,
                        NombreRol = u.FkRolNavigation.NombreRol
                    } : null
                }).ToListAsync();
        }

        /// Crea un nuevo usuario.
        public async Task<UsuariosDto> CrearUsuario(UsuariosDto usuarioDto)
        {
            if (string.IsNullOrWhiteSpace(usuarioDto.Nombre) || string.IsNullOrWhiteSpace(usuarioDto.Apellidos) || string.IsNullOrWhiteSpace(usuarioDto.Contraseña))
            {
                throw new ArgumentException("Nombre, Apellidos y Contraseña son requeridos");
            }

            if (await _dBcontext.Usuarios.AnyAsync(u => u.CorreoElectronico == usuarioDto.CorreoElectronico))
            {
                throw new Exception("El correo electrónico ya está registrado");
            }

            var usuario = new Usuario
            {
                Nombre = usuarioDto.Nombre,
                Apellidos = usuarioDto.Apellidos,
                CorreoElectronico = usuarioDto.CorreoElectronico,
                CorreoPersonal = usuarioDto.CorreoPersonal,
                Contraseña = usuarioDto.Contraseña,
                FkDepartamento = usuarioDto.FkDepartamento,
                FkRol = usuarioDto.FkRol
            };

            await _dBcontext.Usuarios.AddAsync(usuario);
            await _dBcontext.SaveChangesAsync();

            usuarioDto.IdUsuarios = usuario.IdUsuarios;
            return usuarioDto;
        }

        /// Edita un usuario existente.
        public async Task<UsuariosDto> EditarUsuario(int idUsuario, UsuariosDto usuarioDto)
        {
            var usuario = await _dBcontext.Usuarios.FirstOrDefaultAsync(u => u.IdUsuarios == idUsuario);
            if (usuario == null)
            {
                return null; // Si el usuario no existe, retornamos null
            }

            usuario.Nombre = usuarioDto.Nombre;
            usuario.Apellidos = usuarioDto.Apellidos;
            usuario.CorreoElectronico = usuarioDto.CorreoElectronico;
            usuario.CorreoPersonal = usuarioDto.CorreoPersonal;
            usuario.Contraseña = usuarioDto.Contraseña;
            usuario.FkDepartamento = usuarioDto.FkDepartamento;
            usuario.FkRol = usuarioDto.FkRol;

            await _dBcontext.SaveChangesAsync();

            return usuarioDto;
        }

        /// Elimina un usuario existente.
        public async Task<bool> EliminarUsuario(int idUsuario)
        {
            try
            {
                var usuario = await _dBcontext.Usuarios.FindAsync(idUsuario);

                if (usuario == null)
                {
                    return false; // Si el usuario no existe, retornamos false
                }

                _dBcontext.Usuarios.Remove(usuario);
                await _dBcontext.SaveChangesAsync();

                return true; // Usuario eliminado exitosamente
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el usuario", ex);
            }
        }

    }
}
