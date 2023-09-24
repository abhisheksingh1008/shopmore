const products = [
  {
    name: "iQOO 7 5G (Storm Black, 8GB RAM, 128GB Storage)",
    imageData: {
      image_url: "https://m.media-amazon.com/images/I/51OvvRTnJTS._SX679_.jpg",
      public_id: "",
    },
    description:
      "Qualcomm Snapdragon 870 5G Mobile Platform, 48MP OIS Main camera with Sony IMX598 sensor 66W FlashCharge with 4400mAh Battery",
    brand: "IQOO",
    category: "Electronics",
    price: 29999,
    countInStock: 50,
    rating: 3.5,
    numReviews: 0,
    discount: 0,
  },
  {
    name: "2021 Apple MacBook Pro (16-inch)",
    imageData: {
      image_url: "https://m.media-amazon.com/images/I/61aUBxqc5PL._SX679_.jpg",
      public_id: "",
    },
    description:
      "Apple M1 Pro or M1 Max chip for a massive leap in CPU, GPU and machine learning performance Up to 10-core CPU delivers up to 2x faster performance to fly through pro workflows quicker than ever",
    brand: "Apple",
    category: "Electronics",
    price: 274999,
    countInStock: 50,
    rating: 4.9,
    numReviews: 0,
  },
  {
    name: "Sony Playstation 4 Pro White Version",
    imageData: {
      image_url:
        "https://i.gadgets360cdn.com/large/sony_ps4_pro_white_1499761620952.jpg",
      public_id: "",
    },
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    brand: "Sony",
    category: "Electronics",
    price: 42000,
    countInStock: 179,
    rating: 5,
    numReviews: 12,
  },
  {
    name: "New Apple AirPods Max - Space Grey",
    imageData: {
      image_url: "https://m.media-amazon.com/images/I/81S533RgkwL._SX679_.jpg",
      public_id: "",
    },
    description:
      "Active Noise Cancellation blocks outside noise, so you can immerse yourself in music, Computational audio combines custom acoustic design with the Apple H1 chip and software for breakthrough listening experiences",
    brand: "Apple",
    category: "Electronics",
    price: 28000,
    countInStock: 9,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "iPhone 11 Pro 256GB Memory",
    imageData: {
      image_url: "https://www.hilaptop.com/userdata/public/gfx/5037.jpg",
      public_id: "",
    },
    description:
      "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Apple",
    category: "Electronics",
    price: 42599,
    countInStock: 9,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: "OnePlus Nord 2 5G (Blue Haze, 8GB RAM, 128GB Storage)",
    image: "https://m.media-amazon.com/images/I/61TnX0PmqES._SX679_.jpg",
    imageData: {
      image_url: "https://m.media-amazon.com/images/I/61TnX0PmqES._SX679_.jpg",
      public_id: "",
    },
    description:
      "Camera: Sony IMX 766 50MP+8MP+2MP,MediaTek Dimensity 1200-AI - The octa-core ,OxygenOS 11.3 operating system based on Android 11,Battery: Dual Cell 4500mAH lithium-ion battery",
    brand: "OnePlus",
    category: "Electronics",
    price: 27999,
    countInStock: 50,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Apple AirPods Pro",
    imageData: {
      image_url: "https://m.media-amazon.com/images/I/71bhWgQK-cL._SX679_.jpg",
      public_id: "",
    },
    description:
      "Active noise cancellation for immersive sound,The wireless charging case delivers more than 24 hours of battery life ",
    brand: "Apple",
    category: "Electronics",
    price: 24999,
    countInStock: 40,
    rating: 0,
    numReviews: 0,
    discount: 3,
  },
  {
    name: "Airpods Wireless Bluetooth Headphones",
    imageData: {
      image_url:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361",
      public_id: "",
    },
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "Electronics",
    price: 22499,
    countInStock: 190,
    rating: 0,
    numReviews: 0,
  },

  {
    name: "iQOO Z3 5G (Ace Black, 8GB RAM, 256GB Storage)",
    imageData: {
      image_url: "https://m.media-amazon.com/images/I/61uIgwiP90S._SY741_.jpg",
      public_id: "",
    },
    description:
      "Qualcomm Snapdragon 768G 5G processor, 7nm chip and octa-core processor.120Hz Refresh Rate | 180Hz Touch Sampling Rate Five-layer liquid cooling system can reduce the core temperature by 10 degrees",
    brand: "IQOO",
    category: "Electronics",
    price: 21500,
    countInStock: 155,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage)",
    imageData: {
      image_url: "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY741_.jpg",
      public_id: "",
    },
    description:
      "5G Ready powered by Qualcomm Snapdragon 865 Octa-Core processor, 4500 mAh battery (Non -removable) with Super Fast Charging,Triple Rear Camera Setup - 12megapixels (Dual Pixel) OIS F1.8 Wide Rear Camera + 8megapixels OIS Tele Camera + 12megapixels Ultra Wide",
    brand: "Samsung",
    category: "Electronics",
    price: 38779,
    countInStock: 252,
    rating: 0,
    numReviews: 0,
    discount: 5,
  },
  {
    name: "Mi 10i 5G (Midnight Black, 6GB RAM, 128GB Storage)",
    imageData: {
      image_url: "https://m.media-amazon.com/images/I/71+KJpeI2rL._SY741_.jpg",
      public_id: "",
    },
    description:
      "Camera: 108 MP Quad Rear camera with Ultra-wide and Macro mode, Processor: Octa-core Snapdragon 750G with 8nm process and support for next generation 5G Network",
    brand: "Xiaomi",
    category: "Electronics",
    price: 34999,
    countInStock: 250,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Sony RX100 III",
    imageData: {
      image_url: "https://m.media-amazon.com/images/I/71lRWSHdDRL._SX679_.jpg",
      public_id: "",
    },
    description:
      "20.1 MP (effective) 1.0-type Exmor R CMOS sensor BIONZ X engine for superb detail and noise reduction ZEISS Vario-Sonnar T* 24-70 mm lens with F1.8-2.8 aperture",
    brand: "Sony",
    category: "Electronics",
    price: 62000,
    countInStock: 42,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Cannon EOS 80D DSLR Camera",
    imageData: {
      image_url:
        "https://detec.in/cdn/shop/products/WhatsAppImage2022-03-25at13.23.59_1024x1024.jpg?v=1648195030",
      public_id: "",
    },
    description:
      "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
    brand: "Cannon",
    category: "Electronics",
    price: 79990,
    countInStock: 58,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Nikon D850 45.7MP Digital SLR Camera",
    imageData: {
      image_url: "https://m.media-amazon.com/images/I/81WtQ64-SOL._SX450_.jpg",
      public_id: "",
    },
    description:
      "D850 with the AF-S NIKKOR 24-120MM F/4G ED VR(64GB SD included) Comes with battery, charger and manual",
    brand: "Nikon",
    category: "Electronics",
    price: 122990,
    countInStock: 98,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Apple iPhone 13 (256GB) - Midnight",
    imageData: {
      image_url: "https://m.media-amazon.com/images/I/61VuVU94RnL._SX679_.jpg",
      public_id: "",
    },
    description:
      "15 cm (6.1-inch) Super Retina XDR display Cinematic mode adds shallow depth of field and shifts focus automatically in your videos",
    brand: "Apple",
    category: "Electronics",
    price: 62000,
    countInStock: 39,
    rating: 0,
    numReviews: 0,
  },

  {
    name: "DELL XPS 9370 13.3-inch FHD Laptop",
    imageData: {
      image_url: "https://m.media-amazon.com/images/I/61gG61YpwoL._SX679_.jpg",
      public_id: "",
    },
    description:
      "GHz Intel Core i5 - 8250 U processor, 8GB DDR3 RAM, 256 GB SSDGB hard drive,13.3-inch screen, Intel UHD Graphics 0GB Graphics",
    brand: "Dell",
    category: "Electronics",
    price: 134990,
    countInStock: 60,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Sony WHCH700N: Wireless Bluetooth Headphones",
    image: "https://m.media-amazon.com/images/I/81Qc+mOChwL._SX466_.jpg",
    imageData: {
      image_url: "https://m.media-amazon.com/images/I/81Qc+mOChwL._SX466_.jpg",
      public_id: "",
    },
    description:
      "Wireless Noise Cancelling Headphones lets you listen without distractions , Premium and elegant design headphones In-built Mic for hands-free calling, Google Assistant compatible with Voice Assistant feature",
    brand: "Sony",
    category: "Electronics",
    price: 2300,
    countInStock: 50,
    rating: 0,
    numReviews: 0,
  },

  {
    name: "Logitech G-Series Gaming Mouse",
    imageData: {
      image_url:
        "https://www.primeabgb.com/wp-content/uploads/2020/07/Logitech-G502-LIGHTSPEED-Wireless-Gaming-Mouse.jpg",
      public_id: "",
    },
    description:
      "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
    brand: "Logitech",
    category: "Electronics",
    price: 749,
    countInStock: 289,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Amazon Echo Dot 3rd Generation",
    imageData: {
      image_url: "https://m.media-amazon.com/images/I/61EXU8BuGZL._SX522_.jpg",
      public_id: "",
    },
    description:
      "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
    brand: "Amazon",
    category: "Electronics",
    price: 2899,
    countInStock: 90,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Atomic Habbits",
    imageData: {
      image_url:
        "https://m.media-amazon.com/images/I/51B7kuFwQFL._SX329_BO1,204,203,200_.jpg",
      public_id: "",
    },
    description:
      "Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones (Hardcover) by James Clear",
    brand: "James Clear",
    category: "Books",
    price: 598,
    countInStock: 428,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Power",
    imageData: {
      image_url:
        "https://m.media-amazon.com/images/I/41KY-NORo9L._SX355_BO1,204,203,200_.jpg",
      public_id: "",
    },
    description: "The 48 Laws of Power by Robert Greene",
    brand: "Robert Greene",
    category: "Books",
    price: 399,
    countInStock: 290,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Rich Dad Poor Dad",
    imageData: {
      image_url:
        "https://m.media-amazon.com/images/I/51Hfv2MfNGL._SX331_BO1,204,203,200_.jpg",
      public_id: "",
    },
    description:
      "Rich Dad Poor Dad: What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not! by Robert T. Kiyosaki",
    brand: "Robert T. Kiyosaki",
    category: "Books",
    price: 379,
    countInStock: 860,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "How to Catch a Unicorn",
    imageData: {
      image_url:
        "https://m.media-amazon.com/images/I/51Fi7Xu6ENL._SY498_BO1,204,203,200_.jpg",
      public_id: "",
    },
    description:
      "How to Catch a Unicorn Hardcover - Picture Book by Adam Wallace",
    brand: "Robert Greene",
    category: "Books",
    price: 199,
    countInStock: 180,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "The Alchemist",
    imageData: {
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa8fK2XPR2ahpu1PZOLzTK4It1_VvoSwVuTvk1jc34dw58IOaX",
      public_id: "",
    },
    description:
      "The Alchemist by Paulo Coelho follows a young Andalusian shepherd in his journey to the pyramids of Egypt, after having a recurring dream of finding a treasure there.",
    brand: "Paulo Coelho",
    category: "Books",
    price: 349,
    countInStock: 608,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "ANRABESS Women's Two Piece Outfits Sweater Sets Knit Pullover Tops and High Waisted Pants Tracksuit Lounge Sets",
    imageData: {
      image_url:
        "https://m.media-amazon.com/images/I/61txXqoc67L._AC_UY741_.jpg",
      public_id: "",
    },
    description:
      "100% Cotton, imported, pull on closur, machine wash, perfect fit.",
    brand: "ANRABESS",
    category: "Fashion",
    price: 349,
    countInStock: 90,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Relaxed Fit Oxford shirt",
    imageData: {
      image_url:
        "https://lp2.hm.com/hmgoepprod?set=source[/5f/54/5f54695f2d7d76e190c8d139b4a708ae80681543.jpg],origin[dam],category[men_shirts_longsleeved],type[DESCRIPTIVESTILLLIFE],res[z],hmver[2]&call=url[file:/product/main]",
      public_id: "",
    },
    description:
      "100% Cotton, imported, pull on closur, machine wash, perfect fit.",
    brand: "H&M",
    category: "Fashion",
    price: 1299,
    countInStock: 120,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Relaxed Fit Patterned resort shirt",
    imageData: {
      image_url:
        "https://lp2.hm.com/hmgoepprod?set=source[/f1/22/f12277ca9dea7a546e497733a5c1551026f7133a.jpg],origin[dam],category[men_shirts_shortsleeved],type[DESCRIPTIVESTILLLIFE],res[z],hmver[2]&call=url[file:/product/main]",
      public_id: "",
    },
    description:
      "100% Cotton, imported, pull on closur, machine wash, perfect fit.",
    brand: "H&M",
    category: "Fashion",
    price: 1349,
    countInStock: 120,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Regular Fit Short-sleeved shirt",
    imageData: {
      image_url:
        "https://lp2.hm.com/hmgoepprod?set=source[/75/78/757800bcd2b506210f17519ba328a04b699abd28.jpg],origin[dam],category[men_shirts_casual],type[DESCRIPTIVESTILLLIFE],res[z],hmver[2]&call=url[file:/product/main]",
      public_id: "",
    },
    description:
      "100% Cotton, imported, pull on closur, machine wash, perfect fit.",
    brand: "H&M",
    category: "Fashion",
    price: 1499,
    countInStock: 210,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Regular Fit Poplin shirt",
    imageData: {
      image_url:
        "https://lp2.hm.com/hmgoepprod?set=source[/d8/6b/d86bba5bac7cde73f5f432d145a8f194dce43482.jpg],origin[dam],category[men_shirts_longsleeved],type[DESCRIPTIVESTILLLIFE],res[z],hmver[2]&call=url[file:/product/main]",
      public_id: "",
    },
    description:
      "100% Cotton, imported, pull on closur, machine wash, perfect fit.",
    brand: "H&M",
    category: "Fashion",
    price: 1999,
    countInStock: 310,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Regular Fit Linen-blend tailored shorts",
    imageData: {
      image_url:
        "https://lp2.hm.com/hmgoepprod?set=source[/e1/f1/e1f1b2c2f85e863664b590fab48b88ec259b523b.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[z],hmver[2]&call=url[file:/product/main]",
      public_id: "",
    },
    description:
      "100% Cotton, imported, pull on closur, machine wash, perfect fit.",
    brand: "H&M",
    category: "Fashion",
    price: 2299,
    countInStock: 230,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Essentials No 16: THE CHINO SHORTS",
    imageData: {
      image_url:
        "https://lp2.hm.com/hmgoepprod?set=source[/c3/09/c30900ea550ffccf2214c0e3ae2411576a9a6ae6.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[z],hmver[2]&call=url[file:/product/main]",
      public_id: "",
    },
    description:
      "100% Cotton, imported, pull on closur, machine wash, perfect fit.",
    brand: "H&M",
    category: "Fashion",
    price: 2099,
    countInStock: 320,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Cashmere jumper",
    imageData: {
      image_url:
        "https://lp2.hm.com/hmgoepprod?set=source[/79/85/7985806fff59c825c7975c4be9084f31959a0366.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[z],hmver[2]&call=url[file:/product/main]",
      public_id: "",
    },
    description:
      "100% Cotton, imported, pull on closur, machine wash, perfect fit.",
    brand: "H&M",
    category: "Fashion",
    price: 5999,
    countInStock: 130,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Cropped rugby shirt for Women",
    imageData: {
      image_url:
        "https://lp2.hm.com/hmgoepprod?set=source[/20/20/202065cbbe1af01289c43ec3c5d216c05574e005.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[z],hmver[2]&call=url[file:/product/main]",
      public_id: "",
    },
    description:
      "100% Cotton, imported, pull on closur, machine wash, perfect fit.",
    brand: "H&M",
    category: "Fashion",
    price: 519,
    countInStock: 430,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Skinny Regular Jeans for Women",
    imageData: {
      image_url:
        "https://lp2.hm.com/hmgoepprod?set=source[/8a/f5/8af50cc497166fe4583cd3443e69c8119788b4db.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[z],hmver[2]&call=url[file:/product/main]",
      public_id: "",
    },
    description:
      "100% Cotton, imported, pull on closur, machine wash, perfect fit.",
    brand: "H&M",
    category: "Fashion",
    price: 999,
    countInStock: 890,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Cropped vest top",
    imageData: {
      image_url:
        "https://lp2.hm.com/hmgoepprod?set=source[/3c/b1/3cb1ad618274f4523ad67d7e6d005c1bf957fc9e.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[z],hmver[2]&call=url[file:/product/main]",
      public_id: "",
    },
    description:
      "100% Cotton, imported, pull on closur, machine wash, perfect fit.",
    brand: "H&M",
    category: "Fashion",
    price: 749,
    countInStock: 870,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Puff-sleeved textured jersey dress",
    imageData: {
      image_url:
        "https://lp2.hm.com/hmgoepprod?set=source[/a2/e3/a2e335b006d3a7f04421afa7107c7e571d63a603.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[z],hmver[2]&call=url[file:/product/main]",
      public_id: "",
    },
    description:
      "100% Cotton, imported, pull on closur, machine wash, perfect fit.",
    brand: "H&M",
    category: "Fashion",
    price: 899,
    countInStock: 160,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "FLOWING SATIN SHIRT",
    imageData: {
      image_url:
        "https://static.zara.net/photos///2023/V/0/1/p/2197/226/044/2/w/293/2197226044_6_1_1.jpg?ts=1680612091708",
      public_id: "",
    },
    description:
      "100% Cotton, imported, pull on closur, machine wash, perfect fit.",
    brand: "ZARA",
    category: "Fashion",
    price: 2249,
    countInStock: 160,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "CHAIN PRINT SHIRT",
    imageData: {
      image_url:
        "https://static.zara.net/photos///2023/V/0/1/p/2887/129/403/2/w/750/2887129403_6_1_1.jpg?ts=1676620665970",
      public_id: "",
    },
    description:
      "Shirt with a V-neckline and long sleeves. Wrap fastening at the front with a knot.",
    brand: "ZARA",
    category: "Fashion",
    price: 1790,
    countInStock: 135,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "GEOMETRIC PRINT SHIRT",
    imageData: {
      image_url:
        "https://static.zara.net/photos///2023/V/0/2/p/4558/200/400/2/w/293/4558200400_6_1_1.jpg?ts=1683713045100",
      public_id: "",
    },
    description:
      "Relaxed fit collared shirt in satiny fabric. Short sleeves. Split hem. Button-up front.",
    brand: "ZARA",
    category: "Fashion",
    price: 1990,
    countInStock: 140,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "LG GL-X257AMCX Hi-Tech Instaview Door-In-Door Refrigerator",
    imageData: {
      image_url:
        "https://res.cloudinary.com/dgzzowgpf/image/upload/v1688971355/MERN%20ECOMMERCE%20APP/Product%20Images/LG_hi-tech_refrigerator_yup4ep.jpg",
      public_id: "",
    },
    description:
      "Knock Twice, See Inside, 635 Ltr InstaView Door-in-Door, Side-by-Side Refrigerator with Smart Inverter Compressor, DoorCooling+, Matte Black Finish.",
    brand: "LG",
    category: "Appliances",
    price: 174999,
    countInStock: 28,
    rating: 0,
    numReviews: 0,
    discount: 8,
  },
  {
    name: "GODREJ GME 728 CIP3 RM- Black MICROWAVE OVEN",
    imageData: {
      image_url:
        "https://res.cloudinary.com/dgzzowgpf/image/upload/v1688971355/MERN%20ECOMMERCE%20APP/Product%20Images/godrej_microwave_sq3zv3.jpg",
      public_id: "",
    },
    description:
      "Godrej advance Microwave Oven to run on smart Inverter technology, this Godrej Eon Invertech Microwave Oven delivers 15% faster cooking while also saving energy by up to 11%. Capacity: 15L, Color: Balck, Weight: 15.03kg< Dimensions: 310x510x465.",
    brand: "Godrej",
    category: "Appliances",
    price: 26490,
    countInStock: 28,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Voltas 183V Vectra Pride Air Conditoner",
    imageData: {
      image_url:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/air-conditioner-new/r/p/k/-original-imagkqs8xkt8hhfw.jpeg?q=70",
      public_id: "",
    },
    description:
      "Voltas 1.5 Ton 3 Star Split Inverter AC - White (Copper Condenser). Auto Restart, no need to manually reset the settings post power-cut.",
    brand: "Voltas",
    category: "Appliances",
    price: 32490,
    countInStock: 58,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "LG Semi Auomatic Washing Machine",
    imageData: {
      image_url:
        "https://www.lg.com/in/images/washing-machines/md07579950/gallery/P105ASRAZ-Washing-Machines-Front-View-D-1.jpg",
      public_id: "",
    },
    description:
      "LG 10.5 kg Semi Automatic Top Load Washing Machine Maroon, White (P105ASRAZ). Key features: Roller Jet Pulsator, Wind Jet Dry, Rat Away Technology, 5 Star Rating, Powerful Washing, Smart Filter.",
    brand: "LG",
    category: "Appliances",
    price: 19800,
    countInStock: 28,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "GODREJ RT EONVIBE 366B HCIT ST RH REFRIGERATOR",
    imageData: {
      image_url:
        "https://res.cloudinary.com/dgzzowgpf/image/upload/v1688971355/MERN%20ECOMMERCE%20APP/Product%20Images/Godrej_nomal_refrigerator_irw4eb.jpg",
      public_id: "",
    },
    description:
      "With its Fridge Freezer Convert Technology, this Godrej Eon Vibe Convertible allows you to use your refrigerator in four different ways. Capacity: 330L, Energy(start) Rating: 2, Type: Frost Refrigerator, Weight: 65.5kg, Color: Steel rush.",
    brand: "Godrej",
    category: "Appliances",
    price: 49999,
    countInStock: 28,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "GODREJ RS EONVELVET 579 RFD PL ST REFRIGERATOR",
    imageData: {
      image_url:
        "https://res.cloudinary.com/dgzzowgpf/image/upload/v1688971355/MERN%20ECOMMERCE%20APP/Product%20Images/godrej_double_door_refrigerator_mczgki.jpg",
      public_id: "",
    },
    description:
      "With it's Multi Air Flow Technology, the advanced Godrej Eon Velvet maintains a constant temperature throughout, keeping food fresh for longer. Capactiy: 564L, Weight: 94kg, Color: Platinum steel, Dimensions: 1.78 m x 91.0 cm x 64.3 cm.",
    brand: "Godrej",
    category: "Appliances",
    price: 89990,
    countInStock: 28,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Safari Travel Suitcase",
    imageData: {
      image_url:
        "https://m.media-amazon.com/images/I/514xUT1xYVL._AC._SR360,460.jpg",
      public_id: "",
    },
    description:
      "Safari Pentagon 55 Cms Small Cabin Polypropylene Hard Sided 4 Wheels 360 Degree Wheeling System Luggage, Cyan Blue.",
    brand: "Safari",
    category: "Travel",
    price: 1999,
    countInStock: 28,
    rating: 0,
    numReviews: 0,
  },
  {
    name: 'F GEAR Panelled 17" Laptop Backpack',
    imageData: {
      image_url:
        "https://assets.ajio.com/medias/sys_master/root/h82/h97/12732354723870/-473Wx593H-460327897-khaki-OUTFIT.jpg",
      public_id: "",
    },
    description:
      "Height: 22.44 inches (57 cm), Bottom width: 11.41 inches (29 cm), Wash: Wipe with clean, Material: Polyester-dry cloth, Outer zip pocket, Adjustable shoulder straps, Upto 17 inch Laptop, 1-year warranty against manufacturing defects, One main zip compartment.",
    brand: "F-Gear",
    category: "Travel",
    price: 1479,
    countInStock: 28,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "Puma RS-X Efekt Track Meet Unisex Sneakers",
    imageData: {
      image_url:
        "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1350,h_1350/global/390933/01/sv01/fnd/IND/fmt/png/RS-X-Efekt-Track-Meet-Unisex-Sneakers",
      public_id: "",
    },
    description:
      "PUMA's RS series revives the 1980s high-quality cushioning with RS (Running System) foam, an improved EVA compound offering superior rebound and enhanced stability.",
    brand: "Puma",
    category: "Sneakers",
    price: 5999,
    countInStock: 398,
    rating: 0,
    numReviews: 0,
  },
  {
    name: "JORDAN 4 RETRO SE CRAFT PHOTON DUST",
    imageData: {
      image_url:
        "https://crepdogcrew.com/cdn/shop/products/AirJordan4SECraftPhotonDust_1000x.jpg?v=1676107562",
      public_id: "",
    },
    description:
      "The Jordan 4 Retro SE Craft Photon Dust is a new shoe with Photon Treatment. Photon has already been released in Nike's Dunk, Air Max 90 and Air Force One models. For this pair, Jordan Brand modified the Air Jordan 4s' mesh cage, replacing it with soft, cracked leather cage wings.",
    brand: "Nike",
    category: "Sneakers",
    price: 20000,
    countInStock: 428,
    rating: 0,
    numReviews: 0,
    discount: 2,
  },
  {
    name: "BMW M Motorsport Neo Cat Mid Unisex Sneakers",
    imageData: {
      image_url:
        "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1350,h_1350/global/307249/02/sv01/fnd/IND/fmt/png/BMW-M-Motorsport-Neo-Cat-Mid-Unisex-Sneakers",
      public_id: "",
    },
    description:
      "Since 1972, BMW M Motorsport has created outstanding automobiles with deafening engines, squealing tires, and lightening speeds, and these Neo Cat motorsport shoes showcase just that, thanks to their boot-like silhouette and BMW M Motorsport colours and emblems.",
    brand: "Puma",
    category: "Sneakers",
    price: 6699,
    countInStock: 468,
    rating: 0,
    numReviews: 0,
  },
];

export default products;
