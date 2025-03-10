using System;
using System.Collections.Generic;

namespace Repository.ModelsDb;

public partial class Comentario
{
    public int IdComentarios { get; set; }

    public string Comentario1 { get; set; } = null!;

    public int FkReporte { get; set; }

    public virtual Reporte FkReporteNavigation { get; set; } = null!;
}
