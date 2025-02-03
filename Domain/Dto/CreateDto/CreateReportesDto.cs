using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.CreateDto
{
    public class CreateReportesDto
    {
        public int IdReporte { get; set; }

        public string Titulo { get; set; } = null!;

        public int? FkDestinatario { get; set; }

        public int FkPrioridad { get; set; }

        public string Descripcion { get; set; } = null!;

        public int FkEstado { get; set; }

        public DateTime? FechaCreada { get; set; }
    }
}
