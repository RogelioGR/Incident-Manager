using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Models
{
    public class VistaUsuario
    {
        public int ID_Usuarios { get; set; }
        public string? Nombre { get; set; }
        public string? Apellidos { get; set; }
        public string? Correo_Electronico { get; set; }
        public string? Correo_Personal { get; set; }
        public string? Departamento { get; set; }
        public string? Rol { get; set; }
    }

}
