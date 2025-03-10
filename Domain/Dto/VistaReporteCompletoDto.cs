using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class VistaReporteCompletoDto
    {
        public int ID_Reporte { get; set; }
        public string? Titulo { get; set; }
        public string? UsuarioCreador { get; set; }
        public string? EstadoReporte { get; set; }
        public string? PrioridadReporte { get; set; }
        public string? Descripcion { get; set; }
        public DateTime? Fecha_Creada { get; set; }
        public int? IdComentario { get; set; }
        public string TipoDeReporte { get; set; }

    }
}
