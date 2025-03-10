using System;
using System.Collections.Generic;

namespace Repository.ModelsDb;

public partial class VistaReporte
{
    public int IdReporte { get; set; }

    public string Titulo { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public string? Destinatario { get; set; }

    public string? Estado { get; set; }

    public string? Prioridad { get; set; }

    public DateTime? FechaCreada { get; set; }
}
