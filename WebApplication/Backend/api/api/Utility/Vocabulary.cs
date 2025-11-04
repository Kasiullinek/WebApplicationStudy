using api.Data;
using api.Models;

namespace api.Utility
{
    public static class Vocabulary
    {
        public static void InitializeSets(ApplicationDbContext context, string userId)
        {
            if (context.Sets.Any(v => v.UserId == userId))
            {
                return;
            }

            var sets = new List<SetModel>
            {
                new SetModel
                {
                    Title = "Animals",
                    UserId = userId,
                    CreatedAt = DateTime.UtcNow,
                    Rows = new List<RowModel>
                    {
                        new RowModel { Term = "Cat", Translation = "Kot" },
                        new RowModel { Term = "Dog", Translation = "Pies" },
                        new RowModel { Term = "Elephant", Translation = "Słoń" },
                        new RowModel { Term = "Bird", Translation = "Ptak" },
                        new RowModel { Term = "Mouse", Translation = "Mysz" },
                        new RowModel { Term = "Lion", Translation = "Lew" },
                        new RowModel { Term = "Tiger", Translation = "Tygrys" },
                        new RowModel { Term = "Shark", Translation = "Rekin" },
                        new RowModel { Term = "Jellyfish", Translation = "Meduza" },
                        new RowModel { Term = "Hamster", Translation = "Homik" }
                    }
                },
                new SetModel
                {
                    Title = "Emotions",
                    UserId = userId,
                    CreatedAt = DateTime.UtcNow,
                    Rows = new List<RowModel>
                    {
                        new RowModel { Term = "Happy", Translation = "Szczęśliwy" },
                        new RowModel { Term = "Sad", Translation = "Smutny" },
                        new RowModel { Term = "Angry", Translation = "Zły" },
                        new RowModel { Term = "Excited", Translation = "Podekscytowany" },
                        new RowModel { Term = "Tired", Translation = "Zmęczony" },
                        new RowModel { Term = "Surprised", Translation = "Zaskoczony" },
                        new RowModel { Term = "Scared", Translation = "Przestraszony" },
                        new RowModel { Term = "Confused", Translation = "Zmieszany" },
                        new RowModel { Term = "Bored", Translation = "Znudzony" },
                        new RowModel { Term = "Relaxed", Translation = "Zrelaksowany" }
                    }
                },
                new SetModel
                {
                    Title = "Home",
                    UserId = userId,
                    CreatedAt = DateTime.UtcNow,
                    Rows = new List<RowModel>
                    {
                        new RowModel { Term = "Chair", Translation = "Krzesło" },
                        new RowModel { Term = "Table", Translation = "Stół" },
                        new RowModel { Term = "Window", Translation = "Okno" },
                        new RowModel { Term = "Door", Translation = "Drzwi" },
                        new RowModel { Term = "Bed", Translation = "Łóżko" },
                        new RowModel { Term = "Cupboard", Translation = "Szafka" },
                        new RowModel { Term = "Lamp", Translation = "Lampa" },
                        new RowModel { Term = "Sofa", Translation = "Kanapa" },
                        new RowModel { Term = "Carpet", Translation = "Dywan" },
                        new RowModel { Term = "Shelf", Translation = "Półka" }
                    }
                },
                new SetModel
                {
                    Title = "Colors",
                    UserId = userId,
                    CreatedAt = DateTime.UtcNow,
                    Rows = new List<RowModel>
                    {
                        new RowModel { Term = "Red", Translation = "Czerwony" },
                        new RowModel { Term = "Blue", Translation = "Niebieski" },
                        new RowModel { Term = "Green", Translation = "Zielony" },
                        new RowModel { Term = "Yellow", Translation = "Żółty" },
                        new RowModel { Term = "Orange", Translation = "Pomarańczowy" },
                        new RowModel { Term = "Purple", Translation = "Fioletowy" },
                        new RowModel { Term = "Pink", Translation = "Różowy" },
                        new RowModel { Term = "Brown", Translation = "Brązowy" },
                        new RowModel { Term = "Black", Translation = "Czarny" },
                        new RowModel { Term = "White", Translation = "Biały" }
                    }
                },
                new SetModel
                {
                    Title = "Food",
                    UserId = userId,
                    CreatedAt = DateTime.UtcNow,
                    Rows = new List<RowModel>
                    {
                        new RowModel { Term = "Apple", Translation = "Jabłko" },
                        new RowModel { Term = "Bread", Translation = "Chleb" },
                        new RowModel { Term = "Cheese", Translation = "Ser" },
                        new RowModel { Term = "Milk", Translation = "Mleko" },
                        new RowModel { Term = "Egg", Translation = "Jajko" },
                        new RowModel { Term = "Fish", Translation = "Ryba" },
                        new RowModel { Term = "Chicken", Translation = "Kurczak" },
                        new RowModel { Term = "Rice", Translation = "Ryż" },
                        new RowModel { Term = "Potato", Translation = "Ziemniak" },
                        new RowModel { Term = "Carrot", Translation = "Marchewka" }
                    }
                }

            };
            context.Sets.AddRange(sets);
            context.SaveChanges();
        }
    }
}
