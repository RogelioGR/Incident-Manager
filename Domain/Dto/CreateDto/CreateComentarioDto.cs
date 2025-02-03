using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Dto.CreateDto
{
    public class CreateComentarioDto
    {

        public int IdComentarios { get; set; }

        public string Comentario1 { get; set; } = null!;

        public int FkReporte { get; set; }
    }
}
