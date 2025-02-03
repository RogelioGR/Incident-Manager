using System;
using System.Collections.Generic;

namespace WebApiIncidentManager.Models;

public partial class ReporteUsuario
{
    public int IdReporteU { get; set; }

    public int? FkReporte { get; set; }

    public int? FkUsuario { get; set; }

    public virtual Reporte? FkReporteNavigation { get; set; }

    public virtual Usuario? FkUsuarioNavigation { get; set; }
}
