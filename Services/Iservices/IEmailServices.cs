using Domain.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Services.Iservices
{
    public interface IEmailServices
    {
        Task SendEmail(EmailDto request);
        Task<ReportesDto> CrearReporteConUsuario(ReportesDto reporteDto, ClaimsPrincipal user, IEmailServices _emailService);
    }
}
