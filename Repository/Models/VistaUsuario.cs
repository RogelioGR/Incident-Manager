using System;
using System.Collections.Generic;

namespace Repository.ModelsDb;

public partial class VistaUsuario
{
    public int IdUsuarios { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public string CorreoElectronico { get; set; } = null!;

    public string? CorreoPersonal { get; set; }

    public string? Departamento { get; set; }

    public string? Rol { get; set; }
}
