using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;
using Repository.Models;

namespace WebApiIncidentManager.Models;

public partial class SistemaKempinskiContext : DbContext
{
    public SistemaKempinskiContext()
    {
    }
    public SistemaKempinskiContext(DbContextOptions<SistemaKempinskiContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Comentario> Comentarios { get; set; }

    public virtual DbSet<Departamento> Departamentos { get; set; }

    public virtual DbSet<EstadosReporte> EstadosReportes { get; set; }

    public virtual DbSet<Prioridad> Prioridads { get; set; }

    public virtual DbSet<Reporte> Reportes { get; set; }

    public virtual DbSet<ReporteUsuario> ReporteUsuarios { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    // Importacion de las view MySQL
    public virtual DbSet<VistaUsuario> VistaUsuarios { get; set; }
    public virtual DbSet<VistaReporteCompleto> VistaReporteCompletos{ get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Comentario>(entity =>
        {
            entity.HasKey(e => e.IdComentarios).HasName("PRIMARY");

            entity.HasIndex(e => e.FkReporte, "Fk_Reporte");

            entity.Property(e => e.IdComentarios).HasColumnName("ID_Comentarios");
            entity.Property(e => e.Comentario1)
                .HasMaxLength(255)
                .HasColumnName("Comentario");
            entity.Property(e => e.FkReporte).HasColumnName("Fk_Reporte");

            entity.HasOne(d => d.FkReporteNavigation).WithMany(p => p.Comentarios)
                .HasForeignKey(d => d.FkReporte)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Comentarios_ibfk_1");
        });

        modelBuilder.Entity<Departamento>(entity =>
        {
            entity.HasKey(e => e.IdDepartamento).HasName("PRIMARY");

            entity.Property(e => e.IdDepartamento).HasColumnName("ID_Departamento");
            entity.Property(e => e.NombreDepartamentos)
                .HasMaxLength(255)
                .HasColumnName("Nombre_Departamentos");
        });

        modelBuilder.Entity<EstadosReporte>(entity =>
        {
            entity.HasKey(e => e.IdEstado).HasName("PRIMARY");

            entity.ToTable("Estados_reportes");

            entity.Property(e => e.IdEstado).HasColumnName("ID_Estado");
            entity.Property(e => e.NombreEstado)
                .HasMaxLength(255)
                .HasColumnName("Nombre_Estado");
        });

        modelBuilder.Entity<Prioridad>(entity =>
        {
            entity.HasKey(e => e.IdPrioridad).HasName("PRIMARY");

            entity.ToTable("Prioridad");

            entity.Property(e => e.IdPrioridad).HasColumnName("ID_Prioridad");
            entity.Property(e => e.NombrePrioridad)
                .HasMaxLength(255)
                .HasColumnName("Nombre_Prioridad");
        });

        modelBuilder.Entity<Reporte>(entity =>
        {
            entity.HasKey(e => e.IdReporte).HasName("PRIMARY");

            entity.HasIndex(e => e.FkPrioridad, "Fk_Prioridad");

            entity.HasIndex(e => e.FkDestinatario, "Fk_destinatario");

            entity.HasIndex(e => e.FkEstado, "Fk_estado");

            entity.Property(e => e.IdReporte).HasColumnName("ID_Reporte");
            entity.Property(e => e.Descripcion).HasColumnType("text");
            entity.Property(e => e.FechaCreada)
                .HasColumnType("timestamp")
                .HasColumnName("Fecha_Creada");
            entity.Property(e => e.FkDestinatario).HasColumnName("Fk_destinatario");
            entity.Property(e => e.FkEstado).HasColumnName("Fk_estado");
            entity.Property(e => e.FkPrioridad).HasColumnName("Fk_Prioridad");
            entity.Property(e => e.Titulo).HasMaxLength(255);

            entity.HasOne(d => d.FkDestinatarioNavigation).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.FkDestinatario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Reportes_ibfk_1");

            entity.HasOne(d => d.FkEstadoNavigation).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.FkEstado)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Reportes_ibfk_3");

            entity.HasOne(d => d.FkPrioridadNavigation).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.FkPrioridad)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Reportes_ibfk_2");
        });

        modelBuilder.Entity<ReporteUsuario>(entity =>
        {
            entity.HasKey(e => e.IdReporteU).HasName("PRIMARY");

            entity.ToTable("ReporteUsuario");

            entity.HasIndex(e => e.FkUsuario, "fk_Usuario");

            entity.HasIndex(e => e.FkReporte, "fk_reporte");

            entity.Property(e => e.IdReporteU).HasColumnName("id_ReporteU");
            entity.Property(e => e.FkReporte).HasColumnName("fk_reporte");
            entity.Property(e => e.FkUsuario).HasColumnName("fk_Usuario");

            entity.HasOne(d => d.FkReporteNavigation).WithMany(p => p.ReporteUsuarios)
                .HasForeignKey(d => d.FkReporte)
                .HasConstraintName("ReporteUsuario_ibfk_1");

            entity.HasOne(d => d.FkUsuarioNavigation).WithMany(p => p.ReporteUsuarios)
                .HasForeignKey(d => d.FkUsuario)
                .HasConstraintName("ReporteUsuario_ibfk_2");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.IdRol).HasName("PRIMARY");

            entity.Property(e => e.IdRol).HasColumnName("ID_Rol");
            entity.Property(e => e.NombreRol)
                .HasMaxLength(255)
                .HasColumnName("Nombre_Rol");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuarios).HasName("PRIMARY");

            entity.HasIndex(e => e.FkDepartamento, "Fk_Departamento");

            entity.HasIndex(e => e.FkRol, "Fk_Rol");

            entity.Property(e => e.IdUsuarios).HasColumnName("ID_Usuarios");
            entity.Property(e => e.Apellidos).HasMaxLength(255);
            entity.Property(e => e.Contraseña).HasMaxLength(255);
            entity.Property(e => e.CorreoElectronico)
                .HasMaxLength(255)
                .HasColumnName("Correo_Electronico");
            entity.Property(e => e.CorreoPersonal)
                .HasMaxLength(255)
                .HasColumnName("Correo_Personal");
            entity.Property(e => e.FkDepartamento).HasColumnName("Fk_Departamento");
            entity.Property(e => e.FkRol).HasColumnName("Fk_Rol");
            entity.Property(e => e.Nombre).HasMaxLength(255);

            entity.HasOne(d => d.FkDepartamentoNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.FkDepartamento)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Usuarios_ibfk_1");

            entity.HasOne(d => d.FkRolNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.FkRol)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Usuarios_ibfk_2");
        });
        modelBuilder.Entity<VistaUsuario>(entity =>
        {
            entity.HasKey(e => e.ID_Usuarios);
            entity.ToView("Vista_Usuarios"); 
        });
        modelBuilder.Entity<VistaReporteCompleto>(entity =>
        {
            entity.HasKey(e => e.ID_Reporte);
            entity.ToView("VistaReporteCompleto");
        });


        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
