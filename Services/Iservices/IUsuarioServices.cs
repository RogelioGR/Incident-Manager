using Domain.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Iservices
{
    public interface IUsuarioServices
    {
        Task<IEnumerable<UsuariosDto>> ObtenerUsuarios();
        Task<UsuariosDto> CrearUsuario(UsuariosDto usuarioDto);
        Task<UsuariosDto> EditarUsuario(int idUsuario, UsuariosDto usuarioDto);
        Task<bool> EliminarUsuario(int idUsuario);
    }
}
