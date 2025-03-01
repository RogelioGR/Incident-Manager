using System;
using System.Collections.Generic;
using Services.Iservices;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApiIncidentManager.Models;
using Domain.Dto;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace Services.Services
{
    public class UsuarioServices : IUsuarioServices
    {
        private readonly SistemaKempinskiContext _dBcontext;
        private readonly PasswordHasher<Usuario> _passwordHasher;
        public UsuarioServices(SistemaKempinskiContext sistemaKempinskiContext)
        {
            _dBcontext = sistemaKempinskiContext;
            _passwordHasher = new PasswordHasher<Usuario>();


        }
        public async Task<UsuariosDto> ValidarUsuario(string correo, string contraseña)
        {
            // Verificamos si la correo ingresada 
            var usuario = await _dBcontext.Usuarios.SingleOrDefaultAsync(u => u.CorreoElectronico == correo);
            if (usuario == null)
            {
                return null;
            }
            // Verificamos si la contraseña ingresada 
            var resultado = _passwordHasher.VerifyHashedPassword(usuario, usuario.Contraseña, contraseña);
            if (resultado == PasswordVerificationResult.Failed)
            {
                return (null);

            }
            return new UsuariosDto
            {
                IdUsuarios = usuario.IdUsuarios,
                CorreoElectronico = usuario.CorreoElectronico,
                FkRol = usuario.FkRol
            };
        }
        public async Task<UsuariosDto> ObtenerUsuarioPorId(int idUsuario)
        {
            var usuario = await _dBcontext.Usuarios
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.IdUsuarios == idUsuario);

            if (usuario == null)
            {
                return null;
            }

            return new UsuariosDto
            {
                IdUsuarios = usuario.IdUsuarios,
                Nombre = usuario.Nombre,
                Apellidos = usuario.Apellidos,
                CorreoElectronico = usuario.CorreoElectronico,
                CorreoPersonal = usuario.CorreoPersonal,
                FkDepartamento = usuario.FkDepartamento,
                FkRol = usuario.FkRol
            };
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
                        Extension = u.FkDepartamentoNavigation.Extension 
                    } : null,
                    FkRolNavigation = u.FkRolNavigation != null ? new RolesDto
                    {
                        IdRol = u.FkRolNavigation.IdRol,
                        NombreRol = u.FkRolNavigation.NombreRol
                    } : null
                }).ToListAsync();
        }
        
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
            // Encriptar la contraseña 
            var passwordHasher = new PasswordHasher<Usuario>();
            usuario.Contraseña = passwordHasher.HashPassword(usuario, usuarioDto.Contraseña);

            // Agregar usuario al contexto y guardar cambios
            await _dBcontext.Usuarios.AddAsync(usuario);
            await _dBcontext.SaveChangesAsync();

            usuarioDto.IdUsuarios = usuario.IdUsuarios;
            return usuarioDto;
        }
        public async Task<UsuariosDto> EditarUsuario(int idUsuario, UsuariosDto usuarioDto)
        {
            var usuario = await _dBcontext.Usuarios.FirstOrDefaultAsync(u => u.IdUsuarios == idUsuario);
            if (usuario == null)
            {
                return null; 
            }
            // Actualizar los campos del usuario
            usuario.Nombre = usuarioDto.Nombre;
            usuario.Apellidos = usuarioDto.Apellidos;
            usuario.CorreoElectronico = usuarioDto.CorreoElectronico;
            usuario.CorreoPersonal = usuarioDto.CorreoPersonal;
            usuario.Contraseña = usuarioDto.Contraseña;
            usuario.FkDepartamento = usuarioDto.FkDepartamento;
            usuario.FkRol = usuarioDto.FkRol;

            // Verificar si la contraseña ha sido modificada
            if (!string.IsNullOrWhiteSpace(usuarioDto.Contraseña))
            {
                var passwordHasher = new PasswordHasher<Usuario>();
                usuario.Contraseña = passwordHasher.HashPassword(usuario, usuarioDto.Contraseña);
            }

            await _dBcontext.SaveChangesAsync();
            return usuarioDto;
        }
        public async Task<bool> EliminarUsuario(int idUsuario)
        {
            try
            {
                var usuario = await _dBcontext.Usuarios.FindAsync(idUsuario);

                if (usuario == null)
                {
                    return false; 
                }
                _dBcontext.Usuarios.Remove(usuario);
                await _dBcontext.SaveChangesAsync();

                return true; 
            }
            catch (Exception ex)
            {
                throw new Exception("Error al eliminar el usuario", ex);
            }
        }

        public async Task<IEnumerable<VistaUsuarioDto>> ObtenerVistaUsuarios()
        {
            return await _dBcontext.VistaUsuarios
                .AsNoTracking()
                .Select(u => new VistaUsuarioDto
                {
                    IdUsuario = u.ID_Usuarios,
                    Nombre = u.Nombre,
                    Apellidos = u.Apellidos,
                    CorreoElectronico = u.Correo_Electronico,
                    CorreoPersonal = u.Correo_Personal,
                    FkDepartamento = u.Departamento,
                    FkRol = u.Rol,
                }).ToListAsync();
        }
    }
}
