using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Models
{
    public class VistaReporteCompleto
    {
        public int ID_Reporte { get; set; }
        public string? Titulo { get; set; }
        public string? UsuarioCreador { get; set; }
        public string? EstadoReporte { get; set; }
        public string? PrioridadReporte { get; set; }
        public string? Descripcion { get; set; }
        public DateTime? Fecha_Creada { get; set; }
        public int? ID_Comentario { get; set; }


    }
}
