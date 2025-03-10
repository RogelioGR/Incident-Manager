using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.CreateDto
{
    public class CreateUsuariosDto
    {
        public int IdUsuarios { get; set; }

        public string Nombre { get; set; } = null!;

        public string Apellidos { get; set; } = null!;

        public string? CorreoElectronico { get; set; }

        public string? CorreoPersonal { get; set; }

        public string Contraseña { get; set; } = null!;

        public int FkDepartamento { get; set; }

        public int FkRol { get; set; }

        public int NumEmpleado { get; set; }



    }
}
