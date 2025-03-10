using System;
using System.Collections.Generic;

namespace Repository.ModelsDb;

public partial class Usuario
{
    public int IdUsuarios { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellidos { get; set; } = null!;

    public string CorreoElectronico { get; set; } = null!;

    public string? CorreoPersonal { get; set; }

    public string Contraseña { get; set; } = null!;

    public int FkDepartamento { get; set; }

    public int FkRol { get; set; }

    public int NumEmpleado { get; set; }

    public virtual Departamento FkDepartamentoNavigation { get; set; } = null!;

    public virtual Role FkRolNavigation { get; set; } = null!;

    public virtual ICollection<ReporteUsuario> ReporteUsuarios { get; set; } = new List<ReporteUsuario>();

    public virtual ICollection<Reporte> Reportes { get; set; } = new List<Reporte>();
}
