// 1. تعريف شكل المنتج (Interface) المطور
export interface Product {
  id: number;
  name: { en: string; ar: string }; // كائن يحتوي على اللغتين
  category: 'bar' | 'mold';
  image3dbasic: string; // الصورة الرئيسية (التي تظهر في الكاريدج أو المتجر)
  image3d1: string;
  image3d2: string;
  
  gallery: string[]; // مصفوفة لصور المعرض (img1, img2, etc.)
  price: number;
  sell?: number;
 
 ProductDetails: { en: string; ar: string };
  ProductCare?: { en: string; ar: string };
  flavors: { en: string; ar: string }[];
}

// 2. مصفوفة المنتجات
export const products: Product[] = [
  {
    id: 1,
    name: {
    en: "Caramel Popcorn Crunch Bar (Approx. weight: 180g)",
    ar: "لوح كراميل بوب كورن المقرمش (الوزن التقريبي: 180 جرام)"
  },
    category: "bar",
    image3dbasic: "/images/products/dark-gold-bar.jpg",
    image3d1: "/prodect/Caramel-Popcorn-Crunch-Bar-image3d1.png",
    image3d2: "/prodect/Caramel-Popcorn-Crunch-Bar-image3d2.png",
    gallery: [
      "/images/products/bar-detail-1.jpg",
      "/images/products/bar-detail-2.jpg",
      "/images/products/bar-packaging.jpg"
    ],
    price: 500,
    sell: 450,
    
   ProductDetails: {
    en: "Caramel-coated popcorn folded into smooth Belgian chocolate for the perfect sweet crunch. Light, crispy popcorn meets rich chocolate in a bar that’s playful, balanced, and seriously addictive.",
    ar: "حبات الفشار المغطاة بالكراميل والمغموسة في الشوكولاتة البلجيكية الناعمة للقرمشة المثالية. فشار خفيف ومقرمش يلتقي بالشوكولاتة الغنية في لوح يجمع بين المرح والتوازن، ويسبب إدماناً حقيقياً من أول قطمة."
  },
 ProductCare: {
    en: "Fresh fillings deserve a little care. Keep your chocolates in the fridge for up to 1 week, or in the freezer for up to 1 month to enjoy them at their best.",
    ar: "الحشوات الطازجة تستحق القليل من العناية. احفظ الشوكولاتة في الثلاجة لمدة تصل إلى أسبوع، أو في المجمد (الفريزر) لمدة تصل إلى شهر للاستمتاع بها في أفضل حالاتها."
  },
flavors: [
    { en: "Dark Chocolate", ar: "شوكولاتة داكنة" },
    { en: "Milk Chocolate", ar: "شوكولاتة بالحليب" }
  ]
  },


  {
    id: 2,
    name: {
    en: "Cheesecake Bar (Approx. weight: 180g)",
    ar: "لوح التشيز كيك (الوزن التقريبي: 180 جرام)"
  },
    category: "mold",
    image3dbasic: "/images/products/dark-gold-bar.jpg",
    image3d1: "/prodect/cheesecake-bar-image3d1.png",
    image3d2: "/prodect/cheesecake-bar-image3d2.png",
    gallery: [
      "/images/products/mold-angle-1.jpg",
      "/images/products/mold-inside.jpg"
    ],
    price: 450,
   
    ProductDetails: {
    en: "A creamy cheesecake layer with blueberry notes, wrapped in smooth Belgian chocolate. Rich yet balanced, with a gentle tang that cuts through the sweetness for a refined dessert experience.",
    ar: "طبقة كريمة التشيز كيك الغنية مع نكهات التوت الأزرق، مغلفة بالشوكولاتة البلجيكية الناعمة. تجربة غنية ومتوازنة مع حموضة خفيفة تكسر حدة السكر لتقدم لك تحلية راقية."
  },
  ProductCare: {
    en: "Fresh fillings deserve a little care. Keep your chocolates in the fridge for up to 1 week, or in the freezer for up to 1 month to enjoy them at their best.",
    ar: "الحشوات الطازجة تستحق القليل من العناية. احفظ الشوكولاتة في الثلاجة لمدة تصل إلى أسبوع، أو في المجمد لمدة تصل إلى شهر للاستمتاع بها في أفضل حالاتها."
  },
      flavors: [
    { en: "Dark Chocolate", ar: "شوكولاتة داكنة" },
    { en: "Milk Chocolate", ar: "شوكولاتة بالحليب" }
  ] // متوفر نوع واحد فقط لهذا المنتج
  },
   {
    id: 3,
   name: {
    en: "Cinnabon Bar (Approx. weight: 180g)",
    ar: "لوح السينابون (الوزن التقريبي: 180 جرام)"
  },
    category: "mold",
    image3dbasic: "/images/products/dark-gold-bar.jpg",
    image3d1: "/prodect/cinnabon-bar-image3d1.png",
    image3d2: "/prodect/cinnabon-bar-image3d2.png",
    gallery: [
      "/images/products/mold-angle-1.jpg",
      "/images/products/mold-inside.jpg"
    ],
    price: 550,
 ProductDetails: {
    en: "A dessert bar made for true cinnamon lovers. Freshly baked cinnamon rolls, folded into our smooth cinnamon ganache and wrapped in rich Belgian chocolate. Inside, you’ll find real cinnamon roll pieces soft, warm-spiced, and layered with that signature swirl flavor. For the best experience, warm in the microwave for 10–20 seconds.",
    ar: "لوح حلوى صُنع خصيصاً لعشاق القرفة الحقيقيين. لفائف القرفة الطازجة الممزوجة بجاناش القرفة الناعم والمغلفة بالشوكولاتة البلجيكية الفاخرة. ستجد بالداخل قطعاً حقيقية من لفائف القرفة الدافئة والمتبلة بطبقات من نكهة السينابون المميزة. لأفضل تجربة، ضعها في الميكروويف لمدة 10-20 ثانية."
  },
  ProductCare: {
    en: "Fresh fillings deserve a little care. Keep your chocolates in the fridge for up to 1 week, or in the freezer for up to 1 month to enjoy them at their best.",
    ar: "الحشوات الطازجة تستحق القليل من العناية. احفظ الشوكولاتة في الثلاجة لمدة تصل إلى أسبوع، أو في المجمد لمدة تصل إلى شهر للاستمتاع بها في أفضل حالاتها."
  },
   flavors: [
    { en: "Dark Chocolate", ar: "شوكولاتة داكنة" },
    { en: "Milk Chocolate", ar: "شوكولاتة بالحليب" }
  ]// متوفر نوع واحد فقط لهذا المنتج
  },
    {
    id: 4,
    name: {
    en: "Ferrero Fudge Cake Bar (Approx. Weight: 180g)",
    ar: "لوح كيك فدج الفيريرو (الوزن التقريبي: 180 جرام)"
  },
    category: "mold",
    image3dbasic: "/images/products/dark-gold-bar.jpg",
    image3d1: "/prodect/ferrero-fudge-cake-bar-image3d1.png",
    image3d2: "/prodect/ferrero-fudge-cake-bar-image3d2.png",
    gallery: [
      "/images/products/mold-angle-1.jpg",
      "/images/products/mold-inside.jpg"
    ],
    price: 450,
 ProductDetails: {
    en: "Rich fudgy cake layered with Ferrero spread and roasted hazelnuts. Enjoy it chilled… or warm it for 10–20 seconds for a molten center.",
    ar: "كيك فدج غني بطبقات من كريمة الفيريرو والبندق المحمص. استمتع بها مبردة.. أو قم بتسخينها لمدة 10-20 ثانية للحصول على قلب ذائب ومغري."
  },
  ProductCare: {
    en: "Fresh fillings deserve a little care. Keep your chocolates in the fridge for up to 1 week, or in the freezer for up to 1 month to enjoy them at their best.",
    ar: "الحشوات الطازجة تستحق القليل من العناية. احفظ الشوكولاتة في الثلاجة لمدة تصل إلى أسبوع، أو في المجمد لمدة تصل إلى شهر للاستمتاع بها في أفضل حالاتها."
  },
        flavors: [
    { en: "Dark Chocolate", ar: "شوكولاتة داكنة" },
    { en: "Milk Chocolate", ar: "شوكولاتة بالحليب" }
  ] // متوفر نوع واحد فقط لهذا المنتج
  },

    {
    id: 5,
    name: {
    en: "Honeycomb Crunch Bar (Approx. Weight: 150g)",
    ar: "لوح هاني كومب المقرمش (الوزن التقريبي: 150 جرام)"
  },
    category: "bar",
    image3dbasic: "/images/products/dark-gold-bar.jpg",
    image3d1: "/prodect/Honeycomb-Crunch-Bar-image3d1.png",
    image3d2: "/prodect/Honeycomb-Crunch-Bar-image3d2.png",
    gallery: [
      "/images/products/mold-angle-1.jpg",
      "/images/products/mold-inside.jpg"
    ],
    price: 500,
    sell: 450,

  ProductDetails: {
    en: "Golden, extra-crispy honeycomb chunks coated in smooth Belgian chocolate. This bar is all about the crunch—light, airy honeycomb that shatters with every bite, balanced by a thin layer of rich chocolate.",
    ar: "قطع من عسل الهاني كومب الذهبية فائقة القرمشة مغطاة بالشوكولاتة البلجيكية الناعمة. هذا اللوح مخصص لعشاق القرمشة؛ هاني كومب خفيف وهش يتكسر مع كل قطمة، يتوازن مع طبقة رقيقة من الشوكولاتة الغنية."
  },
  ProductCare: {
    en: "Fresh fillings deserve a little care. Keep your chocolates in the fridge for up to 1 week, or in the freezer for up to 1 month to enjoy them at their best.",
    ar: "الحشوات الطازجة تستحق القليل من العناية. احفظ الشوكولاتة في الثلاجة لمدة تصل إلى أسبوع، أو في المجمد لمدة تصل إلى شهر للاستمتاع بها في أفضل حالاتها."
  },
       flavors: [
    { en: "Dark Chocolate", ar: "شوكولاتة داكنة" },
    { en: "Milk Chocolate", ar: "شوكولاتة بالحليب" }
  ]// متوفر نوع واحد فقط لهذا المنتج
  },
     {
    id: 6,
    name: {
    en: "Kunafa Pistachio (Dubai Chocolate) (Approx. weight: 180g)",
    ar: "كنافة بالفستق - شوكولاتة دبي (الوزن التقريبي: 180 جرام)"
  },
    category: "mold",
    image3dbasic: "/images/products/dark-gold-bar.jpg",
    image3d1: "/prodect/Kunafa-pistachio-Dubai-chocolate-image3d1.png",
    image3d2: "/prodect/Kunafa-pistachio-Dubai-chocolate-image3d2.png",
    gallery: [
      "/images/products/mold-angle-1.jpg",
      "/images/products/mold-inside.jpg"
    ],
    price: 500,
    sell: 450,

 ProductDetails: {
    en: "The classic kunafa, upgraded. Made with our premium pistachio spread for a truly rich, authentic taste.",
    ar: "الكنافة الكلاسيكية في ثوبها الجديد. مُحضرة بكريمة الفستق الفاخرة الخاصة بنا لتقديم مذاق غني وأصلي لا يُنسى."
  },
  ProductCare: {
    en: "Fresh fillings deserve a little care. Keep your chocolates in the fridge for up to 1 month.",
    ar: "الحشوات الطازجة تستحق القليل من العناية. احفظ الشوكولاتة في الثلاجة لمدة تصل إلى شهر كامل."
  },
      flavors: [
    { en: "Dark Chocolate", ar: "شوكولاتة داكنة" },
    { en: "Milk Chocolate", ar: "شوكولاتة بالحليب" }
  ] // متوفر نوع واحد فقط لهذا المنتج
  },
   {
    id: 7,
    name: {
    en: "Marshmallow Biscuit Bar – S’mores Style (Approx. weight: 180g)",
    ar: "لوح مارشميلو بالبسكويت – بنمط السيمورز (الوزن التقريبي: 180 جرام)"
  },
    category: "bar",
    image3dbasic: "/images/products/dark-gold-bar.jpg",
    image3d1: "/prodect/Marshmallow-Biscuit-Bar-image3d1.png",
    image3d2: "/prodect/Marshmallow-Biscuit-Bar-image3d2.png",
    gallery: [
      "/images/products/mold-angle-1.jpg",
      "/images/products/mold-inside.jpg"
    ],
    price: 500,
    sell: 450,

   ProductDetails: {
    en: "Crispy salted biscuit layers, soft marshmallow, and smooth Belgian chocolate—inspired by the classic s’mores dessert. Enjoy it chilled for a firmer bite… or warm it for 10–20 seconds to watch the marshmallow melt into a full dessert experience.",
    ar: "طبقات من البسكويت المملح المقرمش، المارشميلو الهش، والشوكولاتة البلجيكية الناعمة؛ مستوحى من حلى 'السيمورز' الكلاسيكي. استمتع به مبرداً لقوام متماسك.. أو قم بتدفئته لمدة 10-20 ثانية لتشاهد ذوبان المارشميلو الذي ينقلك لتجربة تحلية متكاملة."
  },
  ProductCare: {
    en: "Fresh fillings deserve a little care. Keep your chocolates in the fridge for up to 1 week, or in the freezer for up to 1 month to enjoy them at their best.",
    ar: "الحشوات الطازجة تستحق القليل من العناية. احفظ الشوكولاتة في الثلاجة لمدة تصل إلى أسبوع، أو في المجمد (الفريزر) لمدة تصل إلى شهر للاستمتاع بها في أفضل حالاتها."
  },
        flavors: [
    { en: "Dark Chocolate", ar: "شوكولاتة داكنة" },
    { en: "Milk Chocolate", ar: "شوكولاتة بالحليب" }
  ]// متوفر نوع واحد فقط لهذا المنتج
  },
     {
    id: 8,
  name: {
    en: "Peanut Butter Cookies Bar (Approx. weight: 180g)",
    ar: "لوح بسكويت زبدة الفول السوداني (الوزن التقريبي: 180 جرام)"
  },
    category: "bar",
    image3dbasic: "/images/products/dark-gold-bar.jpg",
    image3d1: "/prodect/peanut-butter-cookies-bar-image3d1.png",
    image3d2: "/prodect/peanut-butter-cookies-bar-image3d2.png",
    gallery: [
      "/images/products/mold-angle-1.jpg",
      "/images/products/mold-inside.jpg"
    ],
    price: 500,
    sell: 450,

   ProductDetails: {
    en: "Homemade crispy cookies layered with our freshly made peanut butter ganache and roasted peanut chunks, all wrapped in smooth Belgian chocolate.",
    ar: "طبقات من البسكويت المقرمش المحضر منزلياً مع جاناش زبدة الفول السوداني الطازج وقطع السوداني المحمص، مغلفة بالكامل بالشوكولاتة البلجيكية الناعمة."
  },
  ProductCare: {
    en: "Fresh fillings deserve a little care. Keep your chocolates in the fridge for up to 1 week, or in the freezer for up to 1 month to enjoy them at their best.",
    ar: "الحشوات الطازجة تستحق القليل من العناية. احفظ الشوكولاتة في الثلاجة لمدة تصل إلى أسبوع، أو في المجمد (الفريزر) لمدة تصل إلى شهر للاستمتاع بها في أفضل حالاتها."
  },
        flavors: [
    { en: "Dark Chocolate", ar: "شوكولاتة داكنة" },
    { en: "Milk Chocolate", ar: "شوكولاتة بالحليب" }
  ]
  },
       {
    id: 9,
    name: {
    en: "Pistachio & Vanilla Cake Bar",
    ar: "لوح كيك الفستق والفانيليا"
  },
    category: "bar",
    image3dbasic: "/images/products/dark-gold-bar.jpg",
    image3d1: "/prodect/Pistachio&vanilla-cake-bar-image3d1.png",
    image3d2: "/prodect/Pistachio&vanilla-cake-bar-image3d2.png",
    gallery: [
      "/images/products/mold-angle-1.jpg",
      "/images/products/mold-inside.jpg"
    ],
    price: 500,
  

   ProductDetails: {
    en: "Soft vanilla cake layered with smooth pistachio cream, wrapped in rich Belgian chocolate.",
    ar: "كيك فانيليا هش بطبقات من كريمة الفستق الناعمة، مغلف بالشوكولاتة البلجيكية الغنية."
  },
  ProductCare: {
    en: "Fresh fillings deserve a little care. Keep your chocolates in the fridge for up to 1 week, or in the freezer for up to 1 month to enjoy them at their best.",
    ar: "الحشوات الطازجة تستحق القليل من العناية. احفظ الشوكولاتة في الثلاجة لمدة تصل إلى أسبوع، أو في المجمد (الفريزر) لمدة تصل إلى شهر للاستمتاع بها في أفضل حالاتها."
  },
      flavors: [
    { en: "Dark Chocolate", ar: "شوكولاتة داكنة" },
    { en: "Milk Chocolate", ar: "شوكولاتة بالحليب" }
  ]
  },
         {
    id: 10,
  name: {
    en: "Real Donut Chocolate Bar (Approx. weight: 180g)",
    ar: "لوح شوكولاتة الدونات الحقيقية (الوزن التقريبي: 180 جرام)"
  },
    category: "bar",
    image3dbasic: "/images/products/dark-gold-bar.jpg",
    image3d1: "/prodect/Real-Donut-Chocolate-Bar-image3d1.png",
    image3d2: "/prodect/Real-Donut-Chocolate-Bar-image3d2.png",
    gallery: [
      "/images/prodect/mold-angle-1.jpg",
      "/images/products/mold-inside.jpg"
    ],
    price: 500,
  

   ProductDetails: {
    en: "Freshly made donuts, folded into a smooth chocolate ganache and wrapped in rich Belgian chocolate. Inside, you’ll find real donut pieces—soft, tender, and perfectly balanced with creamy chocolate. A playful dessert bar, made entirely in-house.",
    ar: "قطع دونات طازجة ممزوجة بجاناش الشوكولاتة الناعم ومغلفة بالشوكولاتة البلجيكية الغنية. ستجد بالداخل قطع دونات حقيقية؛ قوام طري يذوب في الفم بتوازن مثالي مع الشوكولاتة الكريمية. لوح حلوى ممتع، محضر بالكامل يدوياً في معاملنا."
  },
  ProductCare: {
    en: "Fresh fillings deserve a little care. Keep your chocolates in the fridge for up to 1 week, or in the freezer for up to 1 month to enjoy them at their best.",
    ar: "الحشوات الطازجة تستحق القليل من العناية. احفظ الشوكولاتة في الثلاجة لمدة تصل إلى أسبوع، أو في المجمد (الفريزر) لمدة تصل إلى شهر للاستمتاع بها في أفضل حالاتها."
  },
       flavors: [
    { en: "Dark Chocolate", ar: "شوكولاتة داكنة" },
    { en: "Milk Chocolate", ar: "شوكولاتة بالحليب" }
  ]
  },
          {
    id: 11,
    name: {
    en: "Salted Caramel Dark Chocolate Bar (Approx. weight: 180g)",
    ar: "لوح الشوكولاتة الداكنة بالكراميل المملح (الوزن التقريبي: 180 جرام)"
  },
    category: "bar",
    image3dbasic: "/images/products/dark-gold-bar.jpg",
    image3d1: "/prodect/Salted-caramel-Dark-chocolate-bar-image3d1.png",
    image3d2: "/prodect/Salted-caramel-Dark-chocolate-bar-image3d2.png",
    gallery: [
      "/images/products/mold-angle-1.jpg",
      "/images/products/mold-inside.jpg"
    ],
    price: 500,
   sell: 350,

   
ProductDetails: {
    en: "Rich dark Belgian chocolate layered with smooth salted caramel for a perfectly balanced sweet and bitter finish.",
    ar: "شوكولاتة بلجيكية داكنة غنية بطبقات من الكراميل المملح الناعم، لتمنحك توازناً مثالياً بين حلاوة الكراميل ومرارة الشوكولاتة في كل قطمة."
  },

   
       flavors: [
    { en: "Dark Chocolate", ar: "شوكولاتة داكنة" },
    { en: "Milk Chocolate", ar: "شوكولاتة بالحليب" }
  ]
  },
            {
    id: 12,
    name: {
    en: "Salted Caramel Pretzel Bar (Approx. weight: 180g)",
    ar: "لوح الكراميل المملح بالبريتزل (الوزن التقريبي: 180 جرام)"
  },
    category: "bar",
    image3dbasic: "/images/products/dark-gold-bar.jpg",
    image3d1: "/prodect/Salted-caramel-pretzel-bar-image3d1.png",
    image3d2: "/prodect/Salted-caramel-pretzel-bar-image3d2.png",
    gallery: [
      "/images/products/mold-angle-1.jpg",
      "/images/products/mold-inside.jpg"
    ],
    price: 450,
 

  ProductDetails: {
    en: "Crispy cornflakes and salted pretzel pieces folded into smooth salted caramel, all wrapped in rich Belgian chocolate. A bold balance of sweet and salty, with layers of crunch in every bite.",
    ar: "رقائق الذرة المقرمشة وقطع البريتزل المملحة الممزوجة بالكراميل المملح الناعم، مغلفة بالكامل بالشوكولاتة البلجيكية الغنية. توازن جريء بين الحلاوة والملوحة، مع طبقات من القرمشة في كل قطمة."
  },

   
       flavors: [
    { en: "Dark Chocolate", ar: "شوكولاتة داكنة" },
    { en: "Milk Chocolate", ar: "شوكولاتة بالحليب" }
  ]
  },
   {
    id: 13,
  name: {
    en: "Shay Belaban & Biscuits (Approx. weight: 180g)",
    ar: "لوح شاي باللبن والبسكويت (الوزن التقريبي: 180 جرام)"
  },
    category: "mold",
    image3dbasic: "/images/products/dark-gold-bar.jpg",
    image3d1: "/prodect/Shay-belaban&biscuits-image3d1.png",
    image3d2: "/prodect/Shay-belaban&biscuits-image3d2.png",
    gallery: [
      "/images/products/mold-angle-1.jpg",
      "/images/products/mold-inside.jpg"
    ],
    price: 450,
 

 ProductDetails: {
    en: "Inspired by the classic cup of milk tea and biscuits. Smooth tea-infused ganache layered with crunchy biscuit pieces, wrapped in rich Belgian chocolate.",
    ar: "مستوحى من كوب الشاي باللبن والبسكويت الكلاسيكي. جاناش ناعم غني بنكهة الشاي مع طبقات من قطع البسكويت المقرمشة، مغلف بالشوكولاتة البلجيكية الفاخرة."
  },
  ProductCare: {
    en: "Fresh fillings deserve a little care. Keep your chocolates in the fridge for up to 1 week, or in the freezer for up to 1 month to enjoy them at their best.",
    ar: "الحشوات الطازجة تستحق القليل من العناية. احفظ الشوكولاتة في الثلاجة لمدة تصل إلى أسبوع، أو في المجمد (الفريزر) لمدة تصل إلى شهر للاستمتاع بها في أفضل حالاتها."
  },
   
    flavors: [
    { en: "Dark Chocolate", ar: "شوكولاتة داكنة" },
    { en: "Milk Chocolate", ar: "شوكولاتة بالحليب" }
  ]
  },
    {
    id: 14,
   name: {
    en: "Strawberry Marshmallow Cake (Approx. weight: 180g)",
    ar: "لوح كيك المارشميلو بالفراولة (الوزن التقريبي: 180 جرام)"
  },
    category: "mold",
    image3dbasic: "/images/products/dark-gold-bar.jpg",
    image3d1: "/prodect/Strawberry-marshmallow-cake-image3d1.png",
    image3d2: "/prodect/Strawberry-marshmallow-cake-image3d2.png",
    gallery: [
      "/images/prodect/mold-angle-1.jpg",
      "/images/prodect/mold-inside.jpg"
    ],
    price: 480,
    sell: 420,
 

   ProductDetails: {
    en: "Soft vanilla cake layered with fluffy marshmallow and strawberry notes, all wrapped in smooth Belgian chocolate. Light, creamy, and gently sweet—a softer take on dessert bars.",
    ar: "كيك فانيليا هش بطبقات من المارشميلو الخفيف ونكهات الفراولة، مغلف بالكامل بالشوكولاتة البلجيكية الناعمة. تجربة خفيفة، كريمية، وذات حلاوة هادئة؛ لتقديم مفهوم أكثر رقة لألواح الحلويات."
  },
 
   
      flavors: [
    { en: "Dark Chocolate", ar: "شوكولاتة داكنة" },
    { en: "Milk Chocolate", ar: "شوكولاتة بالحليب" }
  ]
  },
      {
    id: 15,
    name: {
    en: "Tiramisu Bar (Approx. weight: 180g)",
    ar: "لوح التيراميسو (الوزن التقريبي: 180 جرام)"
  },
    category: "bar",
    image3dbasic: "/images/products/dark-gold-bar.jpg",
    image3d1: "/prodect/Tiramisu-bar-image3d1.png",
    image3d2: "/prodect/Tiramisu-bar-image3d2.png",
    gallery: [
      "/images/products/mold-angle-1.jpg",
      "/images/products/mold-inside.jpg"
    ],
    price: 500,
    sell: 450,
 

   
ProductDetails: {
    en: "A smooth coffee-infused cream layered with soft cake notes, wrapped in rich Belgian chocolate. Inspired by the classic Italian dessert, this bar balances gentle bitterness with creamy sweetness for a refined finish.",
    ar: "كريمة ناعمة غنية بنكهة القهوة مع طبقات من الكيك الهش، مغلفة بالشوكولاتة البلجيكية الفاخرة. مستوحى من الحلوى الإيطالية الكلاسيكية، يجمع هذا اللوح بين مرارة القهوة اللطيفة وحلاوة الكريمة لتجربة تحلية راقية."
  },
  ProductCare: {
    en: "Fresh fillings deserve a little care. Keep your chocolates in the fridge for up to 1 week, or in the freezer for up to 1 month to enjoy them at their best.",
    ar: "الحشوات الطازجة تستحق القليل من العناية. احفظ الشوكولاتة في الثلاجة لمدة تصل إلى أسبوع، أو في المجمد (الفريزر) لمدة تصل إلى شهر للاستمتاع بها في أفضل حالاتها."
  },  
       flavors: [
    { en: "Dark Chocolate", ar: "شوكولاتة داكنة" },
    { en: "Milk Chocolate", ar: "شوكولاتة بالحليب" }
  ]
  },
];