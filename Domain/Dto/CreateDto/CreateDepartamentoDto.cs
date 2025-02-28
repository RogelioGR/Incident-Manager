using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.CreateDto
{
    public class CreateDepartamentoDto
    {
        public int IdDepartamento { get; set; }
        public string NombreDepartamento { get; set; }
        public int Extension { get; set; }
    }
}
