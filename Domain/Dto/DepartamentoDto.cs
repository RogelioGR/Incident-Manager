using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class DepartamentoDto
    {
        [Key]
        [Required]
        public int IdDepartamento { get; set; }

        public string NombreDepartamentos { get; set; } = null!;

        public int Extension { get; set; }
    }
}
