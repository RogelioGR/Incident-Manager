using System;
using System.Collections.Generic;

namespace WebApiIncidentManager.Models;

public partial class Departamento
{
    public int IdDepartamento { get; set; }

    public string NombreDepartamentos { get; set; } = null!;

    public int Extension { get; set; }

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
