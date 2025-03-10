using System;
using System.Collections.Generic;

namespace Repository.ModelsDb;

public partial class EstadosReporte
{
    public int IdEstado { get; set; }

    public string NombreEstado { get; set; } = null!;

    public virtual ICollection<Reporte> Reportes { get; set; } = new List<Reporte>();
}
