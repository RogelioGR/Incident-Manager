using System;
using System.Collections.Generic;

namespace Repository.ModelsDb;

public partial class VistaReporteCompleto
{
    public int IdReporte { get; set; }

    public string Titulo { get; set; } = null!;

    public string UsuarioCreador { get; set; } = null!;

    public string EstadoReporte { get; set; } = null!;

    public string PrioridadReporte { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public DateTime? FechaCreada { get; set; }

    public int? IdComentario { get; set; }

    public string TipoDeReporte { get; set; }
}
