import { PrismaClient, ProductCategory, ProductRating } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.warn("Seeding...")

  const count = await prisma.product.count();

  if (count > 0) {
    console.warn("Products already seeded")
    return;
  }

  await prisma.product.createMany({
    data: [
      {
        name: "MacBook Pro M2",
        description: "Latest Apple laptop with M2 chip",
        price: 1299.99,
        category: ProductCategory.TECNOLOGY,
        rating: ProductRating.FIVE,
        sales: 100,
      },
      {
        name: "Nike Air Max",
        description: "Premium running shoes",
        price: 129.99,
        category: ProductCategory.SPORTS,
        rating: ProductRating.FOUR,
        sales: 85,
      },
      {
        name: "Smart TV 65\"",
        description: "4K OLED Smart TV",
        price: 899.99,
        category: ProductCategory.TECNOLOGY,
        rating: ProductRating.FIVE,
        sales: 120,
      },
      {
        name: "Leather Jacket",
        description: "Classic black leather jacket",
        price: 199.99,
        category: ProductCategory.CLOTHES,
        rating: ProductRating.FOUR,
        sales: 75,
      },
      {
        name: "Organic Pasta",
        description: "Premium Italian pasta",
        price: 5.99,
        category: ProductCategory.FOOD,
        rating: ProductRating.THREE,
        sales: 250,
      },
      {
        name: "Smart Thermostat",
        description: "WiFi-enabled home thermostat",
        price: 149.99,
        category: ProductCategory.HOUSE,
        rating: ProductRating.FOUR,
        sales: 60,
      },
      {
        name: "Tesla Model 3",
        description: "Electric sedan",
        price: 39999.99,
        category: ProductCategory.CARS,
        rating: ProductRating.FIVE,
        sales: 30,
      },
      {
        name: "Basketball",
        description: "Professional indoor/outdoor basketball",
        price: 29.99,
        category: ProductCategory.SPORTS,
        rating: ProductRating.FOUR,
        sales: 90,
      },
      {
        name: "Designer T-Shirt",
        description: "Limited edition graphic tee",
        price: 49.99,
        category: ProductCategory.CLOTHES,
        rating: ProductRating.THREE,
        sales: 55,
      },
      {
        name: "Artisanal Coffee",
        description: "Single-origin coffee beans",
        price: 15.99,
        category: ProductCategory.FOOD,
        rating: ProductRating.FIVE,
        sales: 200,
      },
      {
        name: "Robot Vacuum",
        description: "Smart home cleaning robot",
        price: 299.99,
        category: ProductCategory.HOUSE,
        rating: ProductRating.FOUR,
        sales: 95,
      },
      {
        name: "Porsche 911",
        description: "Sports car with premium features",
        price: 89999.99,
        category: ProductCategory.CARS,
        rating: ProductRating.FIVE,
        sales: 10,
      },
      {
        name: "Gaming Console",
        description: "Next-gen gaming system",
        price: 499.99,
        category: ProductCategory.TECNOLOGY,
        rating: ProductRating.FOUR,
        sales: 130,
      },
      {
        name: "Yoga Mat",
        description: "Premium exercise mat",
        price: 39.99,
        category: ProductCategory.SPORTS,
        rating: ProductRating.FOUR,
        sales: 70,
      },
      {
        name: "Winter Coat",
        description: "Waterproof winter jacket",
        price: 159.99,
        category: ProductCategory.CLOTHES,
        rating: ProductRating.FOUR,
        sales: 80,
      },
      {
        name: "Gourmet Chocolate",
        description: "Luxury chocolate selection",
        price: 24.99,
        category: ProductCategory.FOOD,
        rating: ProductRating.FIVE,
        sales: 150,
      },
      {
        name: "Smart Lock",
        description: "WiFi-enabled door lock",
        price: 199.99,
        category: ProductCategory.HOUSE,
        rating: ProductRating.FOUR,
        sales: 65,
      },
      {
        name: "BMW X5",
        description: "Luxury SUV",
        price: 59999.99,
        category: ProductCategory.CARS,
        rating: ProductRating.FOUR,
        sales: 25,
      },
      {
        name: "Wireless Earbuds",
        description: "Premium wireless audio",
        price: 199.99,
        category: ProductCategory.TECNOLOGY,
        rating: ProductRating.FIVE,
        sales: 140,
      },
      {
        name: "Smart Blender",
        description: "Digital touchscreen blender",
        price: 149.99,
        category: ProductCategory.HOUSE,
        rating: ProductRating.THREE,
        sales: 50,
      },
    ]
  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeding completed successfully.")
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })