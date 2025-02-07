using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto
{
    public class UsuarioLoginDto
    {
        [Required]
        [EmailAddress]
        public string Correo { get; set; } = string.Empty; 

       //[MinLength(6)]
        public string Contraseña { get; set; } = string.Empty; 

    }
}
