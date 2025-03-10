using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class VistaUsuarioDto
    {
        public int IdUsuario { get; set; }
        public string? Nombre { get; set; }
        public string? Apellidos { get; set; }
        public string? CorreoElectronico { get; set; }
        public string? CorreoPersonal { get; set; }
        public string? FkDepartamento { get; set; }
        public string? FkRol { get; set; }
        public int Num_Empleado { get; set; }
    }

}
