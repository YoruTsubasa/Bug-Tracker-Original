namespace Bug_Tracker.Models;

public class SuperHero
{
    public int ID { get; set; }
    public string Name { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Place { get; set; }

    public SuperHero()
    {
        ID = 1;
        Name = "C#";
        FirstName = "Backend";
        LastName = "Name";
        Place = "Controller";
    }
}