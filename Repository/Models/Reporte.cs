using System;
using System.Collections.Generic;

namespace WebApiIncidentManager.Models;

public partial class Reporte
{
    public int IdReporte { get; set; }

    public string Titulo { get; set; } = null!;

    public int? FkDestinatario { get; set; }

    public int FkPrioridad { get; set; }

    public string Descripcion { get; set; } = null!;

    public int FkEstado { get; set; }

    public DateTime? FechaCreada { get; set; }

    public virtual ICollection<Comentario> Comentarios { get; set; } = new List<Comentario>();

    public virtual Usuario FkDestinatarioNavigation { get; set; } = null!;

    public virtual EstadosReporte FkEstadoNavigation { get; set; } = null!;

    public virtual Prioridad FkPrioridadNavigation { get; set; } = null!;

    public virtual ICollection<ReporteUsuario> ReporteUsuarios { get; set; } = new List<ReporteUsuario>();
}
