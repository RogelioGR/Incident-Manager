using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.CreateDto
{
    public class CreatePrioridadDto
    {
        [Required]
        public string NombrePrioridad { get; set; } = null!;


    }
}
