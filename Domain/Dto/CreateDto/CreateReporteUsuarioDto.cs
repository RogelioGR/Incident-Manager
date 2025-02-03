using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.CreateDto
{
    public class CreateReporteUsuarioDto
    {
        public int IdReporteU { get; set; }

        public int FkReporte { get; set; }

        public int FkUsuario { get; set; }

    }
}
