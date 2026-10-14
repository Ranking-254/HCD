// prisma/seed.ts
import {
  PrismaClient,
  VehicleCondition,
  Transmission,
  FuelType,
  Drivetrain,
  VehicleStatus,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning previous vehicle records...");
  await prisma.vehicleImage.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.vehicle.deleteMany();

  console.log("Seeding authentic inventory...");

  const vehicles = [
    {
      slug: "2021-toyota-land-cruiser-prado-tx-l",
      stockNumber: "HCD-1001",
      vin: "GDJ150-0084921",
      make: "Toyota",
      model: "Land Cruiser Prado",
      year: 2021,
      trim: "TX-L Package",
      bodyStyle: "SUV",
      condition: VehicleCondition.FOREIGN_USED,
      transmission: Transmission.AUTOMATIC,
      fuelType: FuelType.DIESEL,
      drivetrain: Drivetrain.FOUR_WD,
      engineSizeCc: 2800,
      mileageKm: 34200,
      priceKes: 7850000,
      previousPriceKes: 8100000,
      exteriorColor: "Pearl White",
      interiorColor: "Beige Leather",
      features: [
        "7 Seater Leather",
        "Sunroof",
        "Modellista Bodykit",
        "Lane Keep Assist",
        "Radar Cruise Control",
        "360 Degree Camera",
        "Coolbox",
      ],
      description:
        "Direct import from Japan. Auction grade 4.5/B. Pristine condition with complete Japanese export inspection certificate.",
      status: VehicleStatus.AVAILABLE,
      featured: true,
      images: [
        {
          publicId: "seed/prado_1",
          url: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80",
          order: 0,
          isCover: true,
        },
        {
          publicId: "seed/prado_2",
          url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
          order: 1,
          isCover: false,
        },
      ],
    },
    {
      slug: "2020-mercedes-benz-c200-amg-line",
      stockNumber: "HCD-1002",
      vin: "WDD2050772R194821",
      make: "Mercedes-Benz",
      model: "C-Class",
      year: 2020,
      trim: "C200 AMG Line",
      bodyStyle: "Sedan",
      condition: VehicleCondition.FOREIGN_USED,
      transmission: Transmission.AUTOMATIC,
      fuelType: FuelType.PETROL,
      drivetrain: Drivetrain.RWD,
      engineSizeCc: 1500,
      mileageKm: 42100,
      priceKes: 4650000,
      previousPriceKes: null,
      exteriorColor: "Obsidian Black",
      interiorColor: "Black Artico Leather",
      features: [
        "AMG Styling Package",
        "Digital Cockpit",
        "Ambient Lighting 64 Colors",
        "Apple CarPlay",
        "Parktronic Active Assist",
        "LED High Performance Lights",
      ],
      description:
        "UK import with verified digital service history. Flawless bodywork and pristine interior condition.",
      status: VehicleStatus.AVAILABLE,
      featured: true,
      images: [
        {
          publicId: "seed/c200_1",
          url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
          order: 0,
          isCover: true,
        },
      ],
    },
    {
      slug: "2019-subaru-forester-2-0i-eyesight",
      stockNumber: "HCD-1003",
      vin: "SK9-049811",
      make: "Subaru",
      model: "Forester",
      year: 2019,
      trim: "2.0i-L EyeSight",
      bodyStyle: "SUV",
      condition: VehicleCondition.FOREIGN_USED,
      transmission: Transmission.CVT,
      fuelType: FuelType.PETROL,
      drivetrain: Drivetrain.AWD,
      engineSizeCc: 2000,
      mileageKm: 56300,
      priceKes: 3350000,
      previousPriceKes: 3450000,
      exteriorColor: "Crystal Black Silica",
      interiorColor: "Dark Grey Cloth",
      features: [
        "EyeSight Ver 3",
        "X-Mode Dual Mode",
        "Heated Seats",
        "Reverse Camera",
        "Alloy Wheels",
        "Keyless Go",
      ],
      description:
        "Direct Japanese import. Clean unit with symmetrical all-wheel drive, ideal for Kenyan long-distance road trips.",
      status: VehicleStatus.AVAILABLE,
      featured: false,
      images: [
        {
          publicId: "seed/forester_1",
          url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
          order: 0,
          isCover: true,
        },
      ],
    },
    {
      slug: "2020-mazda-cx-5-xd-proactive",
      stockNumber: "HCD-1004",
      vin: "KF2P-302198",
      make: "Mazda",
      model: "CX-5",
      year: 2020,
      trim: "XD Proactive Package",
      bodyStyle: "SUV",
      condition: VehicleCondition.FOREIGN_USED,
      transmission: Transmission.AUTOMATIC,
      fuelType: FuelType.DIESEL,
      drivetrain: Drivetrain.FOUR_WD,
      engineSizeCc: 2200,
      mileageKm: 39500,
      priceKes: 3600000,
      previousPriceKes: null,
      exteriorColor: "Soul Red Crystal",
      interiorColor: "Black Leather",
      features: [
        "Bose Premium Sound",
        "Heads-Up Display (HUD)",
        "Adaptive LED Headlights",
        "Blind Spot Monitoring",
        "Power Tailgate",
      ],
      description:
        "Auction Grade 4.5. SkyActiv-D twin-turbo diesel offering both power and fuel efficiency. Ready for registration.",
      status: VehicleStatus.AVAILABLE,
      featured: true,
      images: [
        {
          publicId: "seed/cx5_1",
          url: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
          order: 0,
          isCover: true,
        },
      ],
    },
  ];

  for (const item of vehicles) {
    const { images, ...vehicleData } = item;
    await prisma.vehicle.create({
      data: {
        ...vehicleData,
        images: {
          create: images,
        },
      },
    });
  }

  console.log("Seeding finished successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
