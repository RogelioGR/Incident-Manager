using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class RolesDto
    {
        [Key]
        [Required]
        public int IdRol { get; set; }

        public string NombreRol { get; set; } = null!;

    }

}
