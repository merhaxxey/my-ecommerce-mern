import SportsTennisOutlinedIcon from '@mui/icons-material/SportsTennisOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined';
import ToysOutlinedIcon from '@mui/icons-material/ToysOutlined';
import {GiPineapple, GiHeartNecklace} from 'react-icons/gi'
import {BsBagDash} from 'react-icons/bs'
import {IoBulbOutline} from 'react-icons/io5'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import RadioOutlinedIcon from '@mui/icons-material/RadioOutlined';
import IronOutlinedIcon from '@mui/icons-material/IronOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
export const categories = [
    {
        id: 1,
        name: "Health & Beauty",
        icon: <FavoriteBorderOutlinedIcon className="categoryIcon"/>,
        items: {
            "make up":[
                "Concealers & Color Correctors",
                "Foundation",
                "Powder",
                "Lip Gloss",
                "Lip Liner",
                "Lipstick",
                "Eyeliner & Kajal",
                "Eyeshadow",
                "Mascara"
            ],
            "hair care":[
                "Hair & Scalp Care",
                "Hair Accessories",
                "Hair Cutting Tools",
                "Shampoo & Conditioner",
                "Wigs & Accessories"
            ],
            "frangrance":[
                "Women's",
                "Men's"
            ],
            "personal care":[
                "Feminine Care",
                "Contraceptives & Lubricants",
                "Body"
            ]
        }
    },
    {
        id: 2,
        name: "Home & Office",
        icon: <HomeOutlinedIcon  className="categoryIcon"/>,
        items: {
            "home & kitchen":[
                "Bath",
                "Bedding",
                "Home Decor",
                "Home Furniture",
                "Vacuums & Floor Care",
                "Wall Art",
                "Cookware",
                "Bakeware",
                "Small Appliances",
                "Cutlery & Knife Accessories"
            ],
            "office products": [
                "Office & School Supplies",
                "Office Furniture & Lighting",
                "Packaging Materials"
            ],
            "home and office furniture":[
                "Air Conditioners",
                "Cookers",
                "Washers & Dryers",
                "Fans",
                "Freezers",
                "Refrigerators",
                "Dishwashers"
            ],
            "small appliances":[
                "Ironing & Laundry",
                "Kettles",
                "Mixing & Blending",
                "Microwave Ovens",
                "Vacuum Cleaners",
                "Kitchen Bundles"
            ]
        }
    },
    {
        id: 3,
        name: "Phones & Tablets",
        icon: <PhoneAndroidOutlinedIcon className="categoryIcon"/>,
        items: {
            "mobile phones":[
                "Smartphones",
                "Basic Phones",
                "Refurbished Phones"
            ],
            "mobile accessories":[
                "Accessory Kits",
                "Adapters",
                "Batteries",
                "Battery Chargers",
                "Bluetooth Headsets",
                "Cables",
                "Car Accessories",
                "Chargers",
                "Earphones & Headsets",
                "MicroSD Cards",
                "Screen Protectors",
                "Selfie Sticks & Tripods",
                "Smart Watches"
            ],
            "tablets":[
                "iPads",
                "Android Tablets",
                "Educational Tablets",
                "Tablet Accessories"
            ]
        }
    },
    {
        id: 4,
        name: "Computer and Office",
        icon: <LaptopOutlinedIcon className="categoryIcon"/>,
        items: {
            "computers":[
                "Desktops",
                "Laptops"
            ],
            "printers":[
                "Inkjet Printers",
                "Laser Printers",
                "Printer Ink & Toner"
            ],
            "data storage":[
                "External Hard Drives",
                "USB Flash Drives",
                "External Solid State"
            ],
            "computer accessories":[
                "Keyboards & Mice",
                "Uninterrupted Power Supply",
                "Memory Cards",
                "Batteries",
                "Scanners",
                "Video Projectors"
            ],  
            "anti virus software": [
                "Antivirus",
                "Internet Security"
            ]
        }
    },
    {
        id: 5,
        name: "Women's fashion",
        icon: <IronOutlinedIcon className="categoryIcon"/>,
        items: {
            "Swimwear":[
                "Bikini Sets",
                "Cover-Ups"
            ],
            "Dresses":[
                "Casual Dresses",
                "Party Dresses",
                "Evening Dresses"
            ],
            "Bottoms":[
                "Leggings",
                "Skirts",
                "Shorts",
                "Jeans",
                "Pants & Capris"
            ],
            "Weddings & Events":[
                "Wedding Dresses",
                "Prom Dresses",
                "Evening Dresses",
                "Africa Clothing",
                "Cosplay Costumes"
            ],
            "Women's Underwear":[
                "Pajama Sets",
                "Bras",
                "Panties",
                "Women's Socks",
                "Bra & Brief Sets",
                "Shapewear"
            ]
        }
    },
    {
        id: 6,
        name: "Men's Fashion",
        icon: <IronOutlinedIcon className="categoryIcon"/>,
        items: {
            "Shirts":[
                "Hoodies & Sweatshirts",
                "T-Shirts",
                "Shirts",
                "Polos",
                "Jackets",
                "Tuxedo Shirts"
            ],
            "Bottoms":[
                "Casual Pants",
                "Sweatpants",
                "Cargo Pants",
                "Jeans",
                "Harem Pants",
                "Shorts"
            ],
            "Outerwear & Jackets":[
                "Jackets",
                "Sweaters",
                "Casual Faux Leather",
                "Genuine Leather",
                "Parkas",
                "Down Jackets",
                "Suits & Blazer"
            ],
            "Accessories":[
                "Scarves",
                "Skullies & Beanies",
                "Prescription Glasses",
                "Gloves & Mittens",
                "Belts",
                "Bomber Hats",
                "Fedoras",
                "Berets",
                "Baseball Caps"
            ]
        }
        
    },
    {
        id: 7,
        name: "Electroics",
        icon: <RadioOutlinedIcon className="categoryIcon"/>,
        items: {
            "television and video":[
                "Televisions",
                "Smart TVs",
                "LED & LCD TVs",
                "QLED & OLED TVs",
                "DVD Players & Recorders",
            ],
            "Cameras":[
                "Digital Cameras",
                "Projectors",
                "Video Surveillance",
                "Camcorders"
            ],
            "Speakers":[
                "Home Theatre Systems",
                "Mobile     Speakers",
                "Sound Bars"
            ]
        }
    },
    {
        id: 8,
        name: "Bags & Shoes",
        icon: <BsBagDash className="categoryIcon"/>,
        items: {
            "Women's Luggage & Bags":[
                "Stylish Backpacks",
                "Totes",
                "Shoulder Bags",
                "Wallets",
                "Evening Bags",
                "Clutches",
            ],
            "Men's Luggage & Bags":[
                "Men's Backpacks",
                "Crossbody Bags",
                "Briefcases",
                "Luggage & Travel Bags",
                "Wallets"
            ],
            "Women's Shoes":[
                "Women's Sandals",
                "Flats",
                "High Heels",
                "Vulcanized Sneakers",
                "House Slippers",
                "Boots"
            ],
            "Men's Shoes":[
                "Casual Shoes",
                "Vulcanized Sneakers",
                "Men's Sandals",
                "Loafers",
                "Flip Flops",
                "Boots"
            ]
        }
    },
    {
        id: 9,
        name: "Toys , Kids & Babies",
        icon: <ToysOutlinedIcon className="categoryIcon"/>,
        items: {
            "Hot Categories":[
                "Dresses",
                "Clothing Sets",
                "Family Matching Outfits",
                "Hoodies & Sweatshirts",
                "Sleepwear & Robes",
                "Children's Shoes",
                "Baby Strollers"
            ],
            "For Girls":[
                "Dresses",
                "Tops & Tees",
                "Outerwear & Coats",
                "Sleepwear & Robes"
            ],
            "Remote Control":[
                "RC Helicopters",
                "RC Cars",
                "RC Quadcopter"
            ],
            "Baby(0-3years old)":[
                "Baby Rompers",
                "Baby Clothing Set",
                "Baby’s First Walkers",
                "Baby Accessories",
                "Feeding",
                "Bedding",
                "Baby Teething Items",
                "Baby & Toddler Toys"
            ],
            "Toys & Hobbies":[
                "Squeeze Toys",
                "Action & Toy Figures",
                "Dolls",
                "Stuffed & Plush Animals",
                "Diecasts & Toy Vehicles",
                "Game Collection Cards",
                "Stickers"
            ]
        }
    },
    {
        id: 10,
        name: "Outdoor Fun & Sports",
        icon: <SportsTennisOutlinedIcon  className="categoryIcon"/>,
        items: {
            "Swimming": [
                "Swimming",
                "One-Piece Suits",
                "Two-Piece Suits",
                "Cover-Ups",
                "Men's Swimwear",
                "Children's Swimwear",
            ],
            "Sneakers":[
                "Running Shoes",
                "Hiking Shoes",
                "Soccer Shoes",
                "Skateboarding Shoes",
                "Dance Shoes",
                "Basketball Shoes"
            ],
            "Sportswear":[
                "Jerseys",
                "Hiking Jackets",
                "Pants",
                "Shorts",
                "Sports Bags",
                "Sports Accessories"

            ],
            "Cycling":[
                "Bicycles",
                "Bicycle Frames",
                "Bicycle Lights",
                "Bicycle Helmets",
                "Cycling Jerseys",
                "Cycling Eyewear"
            ],
            "Fishing": [
                "Fishing Reels",
                "Fishing Lures",
                "Fishing Lines",
                "Fishing Rods",
                "Rod Combos",
                "Fishing Tackle Boxes"
            ],
            "Other Sports Equipment":[
                "Camping & Hiking",
                "Hunting",
                "Golf",
                "Fitness & Bodybuilding"
            ]
        }
    },
    {
        id: 11,
        name: "Supermarket",
        icon: <GiPineapple className="categoryIcon"/>,
        items: {
            "Food Cupboard":[
                "Grains & Rice",
                "Pasta",
                "Noodles",
                "Breakfast Foods",
                "Herbs, Spices & Seasoning",
                "Flours & Meals",
                "Malt Drinks",
                "Coffee",
                "Water",
                "Cooking Oil",
                "Juices",
                "Soft Drinks",
                "Canned & Packaged Foods",
                "Candy & Chocolate",
                "Syrups, Sugars & Sweetene"
            ],
            "household cleaning":[
                "Laundry",
                "Air Fresheners",
                "Toilet Paper & Wipes",
                "Bathroom Cleaners",
                "Dishwashing",
                "Disinfectant"
            ],
            "beer, wine and spirits":[
                "Beers",
                "Vodka",
                "Red Wine",
                "Champagne & Sparkling Wine",
                "White Wine",
                "Whiskey",
                "Liquors"
            ],
        }
    },
    {
        id: 12, 
        name: "Gaming",
        icon: <SportsEsportsOutlinedIcon className="categoryIcon"/>,
        items: {
            "Playstation":[
                "Playstation 4",
                "Playstation 3",
                "Playstation 2",
                "Playstation",
                "Playstation Vita"
            ],
            "Ninetendo":[
                "Nintendo 3DS",
                "Nintendo DS",
                "Nintendo Switch",
                "Nintendo Wii"
            ],
            "Top Games":[
                "FIFA '20",
                "PES '20",
                "PES '19",
                "PES 2017",
                "Call of Duty",
                "Uncharted",
                "Battlefield",
                "The Witcher 3",
                "Metal Gear Solid",
                "Fallout",
                "Madden NFL",
                "Far Cry",
                "Grand Theft Auto"
            ],
            "xbox":[
                "XBOX One",
                "XBOX 360",
                "XBOX"
            ]
        }
    },
    {
        id: 13,
        name: "Jewelry & Watches",
        icon: <GiHeartNecklace className="categoryIcon"/>,
        items: {
            "Fine Jewelry":[
                "925 Silver Jewelry",
                "Diamond Jewelry",
                "Pearl Jewelry",
                "Gemstones",
                "K-Gold Jewelry",
                "Fine Earrings",
                "Fine Jewelry Sets",
                "Men's Fine Jewelry"
            ],
            "Fashion Jewelry":[
                "Necklaces & Pendants",
                "Trendy Rings",
                "Trendy Earrings",
                "Bracelets & Bangles",
                "Men's Cuff Links",
                "Fashion Jewelry Sets",
                "Charms",
                "Body Jewelry"

            ],
            "Wedding & Engagement":[
                "Bridal Jewelry Sets",
                "Engagement Rings",
                "Wedding Hair Jewelry"
            ],
            "Women's Watches":[
                "Women's Bracelet Watches",
                "Elegant Watches",
                "Romantic Watches",
                "Sports Watches",
                "Innovative Watches"

            ],
            "Beads & DIY Jewelry":[
                "Beads",
                "Jewelry Findings & Components",
                "Jewelry Packaging & Displays"
            ]
        }
    },
    {
        id: 14,
        name: "Home Improvement & Tools",
        icon: <IoBulbOutline className="categoryIcon"/>,
        items: {
            "Tools":[
                "Measurement & Analysis Tools",
                "Hand Tools",
                "Power Tools",
                "Garden Tools",
                "Tool Sets"

            ],
            "Indoor Lighting":[
                "Ceiling Lights",
                "Pendant Lights",
                "Downlights",
                "Chandeliers",
                "Wall Lamps",
                "Night Lights"
            ],
            "LED Lighting":[
                "LED Strips",
                "LED Downlights",
                "LED Panel Lights",
                "LED Spotlights",
                "LED Bar Lights"
            ],
            "Outdoor Lighting":[
                "Flashlights",
                "Solar Lamps",
                "Floodlights",
                "String Lights",
                "Underwater Lights"
            ]
        }
    }
]
