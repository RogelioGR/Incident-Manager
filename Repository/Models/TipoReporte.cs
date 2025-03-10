using System;
using System.Collections.Generic;

namespace Repository.ModelsDb;

public partial class TipoReporte
{
    public int IdTipo { get; set; }

    public string NombreTipo { get; set; } = null!;

    public virtual ICollection<Reporte> Reportes { get; set; } = new List<Reporte>();
}
