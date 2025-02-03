using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.CreateDto
{
    public class CreateEstadoReporteDto
    {
        [Required]
        public string NombreEstado { get; set; } = null!;

    }
}
