using System;
using System.Collections.Generic;

namespace Repository.ModelsDb;

public partial class Prioridad
{
    public int IdPrioridad { get; set; }

    public string NombrePrioridad { get; set; } = null!;

    public virtual ICollection<Reporte> Reportes { get; set; } = new List<Reporte>();
}
