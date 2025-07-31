using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API;

public class Expence
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Description { get; set; }

    [Range(0.01, double.MaxValue)]
    public decimal Amount { get; set; }

    [Required]
    [Column(TypeName = "date")]
    public DateOnly Date { get; set; }

    public string Category { get; set; } = "Geen categorie";

    public Expence() { }

    public Expence(string description, decimal amount, DateOnly date, string category = "Geen categorie")
    {
        if (string.IsNullOrWhiteSpace(description))
            throw new ArgumentException("Beschrijving mag niet leeg zijn.", nameof(description));

        if (amount <= 0)
            throw new ArgumentOutOfRangeException(nameof(amount), "Bedrag moet groter zijn dan 0.");

        if (date == default)
            throw new ArgumentException("Datum moet ingevuld worden.", nameof(date));

        Id = Guid.NewGuid();
        Description = description;
        Amount = amount;
        Date = date;
        Category = category;
    }
}