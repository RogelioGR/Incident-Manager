using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class ReporteUsuarioDto
    {
        public int IdReporteU { get; set; }

        public int? FkReporte { get; set; }

        public int? FkUsuario { get; set; }
        public ReportesDto FkReporteNavigation { get; set; } 
        public UsuariosDto FkUsuarioNavigation { get; set; }

    }
}
