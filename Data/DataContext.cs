using Bug_Tracker.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Bug_Tracker.Data;

public class DataContext : DbContext
{
    public DbSet<SuperHero> SuperHeroes => Set<SuperHero>();
    public DbSet<User> Users => Set<User>();
    public DbSet<ProjectDbEntity> Projects => Set<ProjectDbEntity>();
    public DbSet<TicketDbEntity> Tickets => Set<TicketDbEntity>();
    public DbSet<CommentDbEntity> Comments => Set<CommentDbEntity>();
    
    public DataContext()
    {
        
    }

    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
        
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TicketDbEntity>()
            .HasOne(t=> t.Submitter)
            .WithMany(u => u.SubmitterTickets)
            .HasForeignKey(f=> f.SubmitterID)
            .OnDelete(DeleteBehavior.NoAction);
        
        modelBuilder.Entity<TicketDbEntity>()
            .HasOne(t=> t.AssignedDeveloper)
            .WithMany(u => u.DeveloperTickets)
            .HasForeignKey(f=> f.AssignedDeveloperID)
            .OnDelete(DeleteBehavior.NoAction);
        
        modelBuilder.Entity<TicketDbEntity>()
            .HasOne(t=> t.Project)
            .WithMany(p => p.Tickets)
            .HasForeignKey(t=> t.ProjectDbEntityID)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProjectDbEntity>()
            .Property(p => p.Guid)
            .HasDefaultValueSql("NEWID()");
        
        modelBuilder.Entity<TicketDbEntity>()
            .Property(p => p.Guid)
            .HasDefaultValueSql("NEWID()");
        
        modelBuilder.Entity<CommentDbEntity>()
            .Property(p => p.Guid)
            .HasDefaultValueSql("NEWID()");
    }
}