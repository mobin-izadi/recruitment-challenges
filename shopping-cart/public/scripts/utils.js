//Check if the user is logged in and redirect them.
const logged = (address) => {
    let isLogin = localStorage.getItem('isLogin') || 'false'
    if (isLogin === 'true') {
        window.location.href = address
    }
}
// Get all users information from local storage.
const getAllUsers = () => {
    let users = JSON.parse(localStorage.getItem('users')) || []
    return users
}
// all user name users
const allUserName = () => {
    let users = getAllUsers()
    let usernames = users.map(user => user.userName)
    return usernames

}
// all email users
const allEmail = () => {
    let users = getAllUsers()
    let userEmails = users.map(user => user.userEmail)
    return userEmails

}
// all products
const products = [
    { id: 1, category: "لپ‌تاپ", title: "لپ‌تاپ برنامه‌نویسی Dell XPS 15", shortDescription: "لپ‌تاپ قدرتمند برای توسعه‌دهندگان با صفحه‌نمایش 4K و پردازنده Core i7", image: "images/products/1.jpg", stock: 12, price: 89_000_000, rating: 4.8 },
    { id: 2, category: "لپ‌تاپ", title: "لپ‌تاپ MacBook Pro 16 2023", shortDescription: "مناسب برنامه‌نویسی، طراحی و ادیت ویدیو با تراشه M2 Pro", image: "images/products/1.jpg", stock: 8, price: 115_000_000, rating: 4.9 },
    { id: 3, category: "لپ‌تاپ", title: "لپ‌تاپ ASUS ROG Zephyrus G14", shortDescription: "قدرت پردازشی بالا برای توسعه‌دهندگان و گیمرها", image: "images/products/1.jpg", stock: 15, price: 72_000_000, rating: 4.7 },
    { id: 4, category: "کیبورد", title: "کیبورد مکانیکال RGB مدل Hacker Pro", shortDescription: "کلیدهای مکانیکال با نورپردازی RGB و تاخیر صفر", image: "images/products/2.jpg", stock: 20, price: 4_200_000, rating: 4.6 },
    { id: 5, category: "کیبورد", title: "کیبورد ارگونومیک Microsoft Sculpt", shortDescription: "طراحی ارگونومیک برای کدنویسی طولانی مدت", image: "images/products/2.jpg", stock: 10, price: 5_800_000, rating: 4.5 },
    { id: 6, category: "ماوس", title: "ماوس بی‌سیم Logitech MX Master 3S", shortDescription: "ماوس حرفه‌ای برای توسعه‌دهندگان و طراحان", image: "images/products/3.jpg", stock: 25, price: 3_600_000, rating: 4.9 },
    { id: 7, category: "ماوس", title: "ماوس گیمینگ Razer DeathAdder V3", shortDescription: "حسگر دقیق و پاسخ‌دهی فوق سریع", image: "images/products/3.jpg", stock: 18, price: 2_900_000, rating: 4.7 },
    { id: 8, category: "مانیتور", title: "مانیتور 27 اینچ 4K LG UltraFine", shortDescription: "رزولوشن بالا و کیفیت رنگ فوق‌العاده", image: "images/products/4.jpg", stock: 9, price: 17_500_000, rating: 4.8 },
    { id: 9, category: "مانیتور", title: "مانیتور گیمینگ 32 اینچ سامسونگ Odyssey G7", shortDescription: "پنل QLED با نرخ تازه‌سازی 240Hz", image: "images/products/4.jpg", stock: 7, price: 21_000_000, rating: 4.9 },
    { id: 10, category: "کتاب", title: "کتاب Clean Code", shortDescription: "راهنمای نوشتن کد تمیز و قابل نگهداری", image: "images/products/5.jpg", stock: 30, price: 850_000, rating: 4.9 },
    { id: 11, category: "کتاب", title: "کتاب You Don’t Know JS", shortDescription: "یادگیری عمیق جاوااسکریپت برای برنامه‌نویسان حرفه‌ای", image: "images/products/5.jpg", stock: 28, price: 650_000, rating: 4.8 },
    { id: 12, category: "کتاب", title: "کتاب The Pragmatic Programmer", shortDescription: "اصول و الگوهای حرفه‌ای برنامه‌نویسی", image: "images/products/5.jpg", stock: 22, price: 720_000, rating: 4.8 },
    { id: 13, category: "هدست", title: "هدست گیمینگ HyperX Cloud II", shortDescription: "صدای استریو با کیفیت و میکروفون نویز کنسلینگ", image: "images/products/6.jpg", stock: 14, price: 4_500_000, rating: 4.7 },
    { id: 14, category: "هدست", title: "هدست بی‌سیم Sony WH-1000XM5", shortDescription: "کیفیت صدای بی‌نظیر و حذف نویز پیشرفته", image: "images/products/6.jpg", stock: 11, price: 13_800_000, rating: 4.9 },
    { id: 15, category: "حافظه ذخیره‌سازی", title: "هارد SSD سامسونگ 1 ترابایت 980 PRO", shortDescription: "سرعت انتقال بسیار بالا برای توسعه‌دهندگان", image: "images/products/7.jpg", stock: 16, price: 5_200_000, rating: 4.9 },
    { id: 16, category: "حافظه ذخیره‌سازی", title: "هارد اکسترنال 2 ترابایت WD My Passport", shortDescription: "قابل حمل و مقاوم در برابر ضربه", image: "images/products/7.jpg", stock: 19, price: 3_400_000, rating: 4.6 },
    { id: 17, category: "قطعات سخت‌افزاری", title: "پردازنده Intel Core i9-13900K", shortDescription: "قدرت پردازشی بی‌نظیر برای کارهای سنگین", image: "images/products/8.jpg", stock: 13, price: 25_000_000, rating: 4.9 },
    { id: 18, category: "قطعات سخت‌افزاری", title: "کارت گرافیک NVIDIA RTX 4090", shortDescription: "پرفورمنس خارق‌العاده برای هوش مصنوعی و گیمینگ", image: "images/products/8.jpg", stock: 5, price: 98_000_000, rating: 5 },
    { id: 19, category: "قطعات سخت‌افزاری", title: "مادربرد ASUS ROG Strix Z790-E", shortDescription: "پشتیبانی از آخرین نسل پردازنده‌های اینتل", image: "images/products/8.jpg", stock: 9, price: 15_500_000, rating: 4.8 },
    { id: 20, category: "گجت", title: "میکروفون USB Blue Yeti", shortDescription: "صدای شفاف برای استریم و ضبط پادکست", image: "images/products/9.jpg", stock: 17, price: 6_200_000, rating: 4.7 },
    { id: 21, category: "گجت", title: "دوربین وب Logitech Brio 4K", shortDescription: "کیفیت تصویر فوق‌العاده برای تماس‌های ویدیویی", image: "images/products/9.jpg", stock: 15, price: 7_500_000, rating: 4.8 },
    { id: 22, category: "لپ‌تاپ", title: "لپ‌تاپ HP Spectre x360", shortDescription: "طراحی 2 در 1 با نمایشگر لمسی و پردازنده نسل 12", image: "images/products/1.jpg", stock: 10, price: 63_000_000, rating: 4.7 },
    { id: 23, category: "لپ‌تاپ", title: "لپ‌تاپ Lenovo ThinkPad X1 Carbon", shortDescription: "سبک، مقاوم و عالی برای برنامه‌نویسی", image: "images/products/1.jpg", stock: 12, price: 78_000_000, rating: 4.8 },
    { id: 24, category: "کیبورد", title: "کیبورد مکانیکال Logitech G Pro X", shortDescription: "کلیدهای قابل تعویض با نورپردازی RGB", image: "images/products/2.jpg", stock: 14, price: 5_000_000, rating: 4.7 },
    { id: 25, category: "کیبورد", title: "کیبورد بی‌سیم Apple Magic Keyboard", shortDescription: "طراحی مینیمال و عملکرد بی‌صدا", image: "images/products/2.jpg", stock: 20, price: 6_300_000, rating: 4.8 },
    { id: 26, category: "ماوس", title: "ماوس گیمینگ Logitech G502 Hero", shortDescription: "حسگر دقیق و قابل برنامه‌ریزی", image: "images/products/3.jpg", stock: 22, price: 2_700_000, rating: 4.7 },
    { id: 27, category: "ماوس", title: "ماوس بی‌سیم Apple Magic Mouse 2", shortDescription: "طراحی مینیمال و کاربری آسان", image: "images/products/3.jpg", stock: 18, price: 4_200_000, rating: 4.6 },
    { id: 28, category: "مانیتور", title: "مانیتور 27 اینچ Dell UltraSharp U2723QE", shortDescription: "رزولوشن 4K و رنگ‌بندی دقیق برای توسعه‌دهندگان", image: "images/products/4.jpg", stock: 10, price: 16_800_000, rating: 4.8 },
    { id: 29, category: "مانیتور", title: "مانیتور 24 اینچ ASUS ProArt PA24AC", shortDescription: "مناسب طراحی گرافیک و کدنویسی", image: "images/products/4.jpg", stock: 8, price: 12_500_000, rating: 4.7 },
    { id: 30, category: "کتاب", title: "کتاب JavaScript: The Good Parts", shortDescription: "مرجع کوچک و کاربردی جاوااسکریپت", image: "images/products/5.jpg", stock: 25, price: 700_000, rating: 4.8 },
    { id: 31, category: "کتاب", title: "کتاب Introduction to Algorithms", shortDescription: "مرجع الگوریتم‌ها برای دانشجویان و برنامه‌نویسان", image: "images/products/5.jpg", stock: 20, price: 1_100_000, rating: 4.9 },
    { id: 32, category: "هدست", title: "هدست Corsair HS70 Pro", shortDescription: "صدای فراگیر و راحت برای استفاده طولانی مدت", image: "images/products/6.jpg", stock: 15, price: 3_900_000, rating: 4.6 },
    { id: 33, category: "هدست", title: "هدست Razer BlackShark V2", shortDescription: "میکروفون حرفه‌ای و صدای شفاف", image: "images/products/6.jpg", stock: 13, price: 4_800_000, rating: 4.7 },
    { id: 34, category: "حافظه ذخیره‌سازی", title: "هارد SSD WD Black SN850 1TB", shortDescription: "سرعت خواندن و نوشتن بالا برای توسعه و بازی", image: "images/products/7.jpg", stock: 12, price: 4_900_000, rating: 4.8 },
    { id: 35, category: "حافظه ذخیره‌سازی", title: "هارد اکسترنال Seagate Expansion 4TB", shortDescription: "حافظه بزرگ برای بکاپ و فایل‌های سنگین", image: "images/products/7.jpg", stock: 20, price: 5_200_000, rating: 4.6 },
    { id: 36, category: "قطعات سخت‌افزاری", title: "رم Corsair Vengeance 32GB DDR5", shortDescription: "سرعت بالا و عملکرد پایدار برای برنامه‌نویسی و گیمینگ", image: "images/products/8.jpg", stock: 14, price: 7_500_000, rating: 4.9 },
    { id: 37, category: "قطعات سخت‌افزاری", title: "کارت گرافیک AMD Radeon RX 7900 XTX", shortDescription: "عملکرد بالا برای گیمینگ و توسعه AI", image: "images/products/8.jpg", stock: 6, price: 75_000_000, rating: 4.8 },
    { id: 38, category: "قطعات سخت‌افزاری", title: "مادربرد MSI MPG Z790 Carbon", shortDescription: "پشتیبانی از پردازنده‌های نسل جدید و حافظه DDR5", image: "images/products/8.jpg", stock: 9, price: 14_500_000, rating: 4.7 },
    { id: 39, category: "گجت", title: "وب‌کم Logitech C920 HD", shortDescription: "کیفیت تصویر عالی برای تماس‌های ویدیویی و استریم", image: "images/products/9.jpg", stock: 15, price: 3_800_000, rating: 4.7 },
    { id: 40, category: "گجت", title: "استند خنک‌کننده لپ‌تاپ DeepCool", shortDescription: "جلوگیری از داغ شدن لپ‌تاپ در استفاده طولانی", image: "images/products/9.jpg", stock: 18, price: 1_900_000, rating: 4.6 },
    { id: 41, category: "لپ‌تاپ", title: "لپ‌تاپ Acer Predator Helios 300", shortDescription: "قدرت بالا برای توسعه و گیمینگ با کارت گرافیک RTX", image: "images/products/1.jpg", stock: 10, price: 95_000_000, rating: 4.8 },
    { id: 42, category: "لپ‌تاپ", title: "لپ‌تاپ Razer Blade 14", shortDescription: "سبک و قدرتمند، مناسب توسعه و بازی", image: "images/products/1.jpg", stock: 8, price: 98_000_000, rating: 4.9 },
    { id: 43, category: "کیبورد", title: "کیبورد مکانیکال SteelSeries Apex 7", shortDescription: "کلیدهای مقاوم و نورپردازی قابل شخصی‌سازی", image: "images/products/2.jpg", stock: 12, price: 5_500_000, rating: 4.7 },
    { id: 44, category: "کیبورد", title: "کیبورد Logitech K780", shortDescription: "قابل اتصال به چند دستگاه و عملکرد بی‌صدا", image: "images/products/2.jpg", stock: 15, price: 3_800_000, rating: 4.6 },
    { id: 45, category: "ماوس", title: "ماوس بی‌سیم Logitech M720 Triathlon", shortDescription: "کنترل چند دستگاه با یک ماوس", image: "images/products/3.jpg", stock: 20, price: 2_500_000, rating: 4.7 },
    { id: 46, category: "ماوس", title: "ماوس گیمینگ Corsair Dark Core RGB", shortDescription: "ماوس با حساسیت بالا و نورپردازی RGB", image: "images/products/3.jpg", stock: 14, price: 3_400_000, rating: 4.8 },
    { id: 47, category: "مانیتور", title: "مانیتور 34 اینچ خمیده LG UltraWide", shortDescription: "ایده‌آل برای چند وظیفه‌ای و کدنویسی", image: "images/products/4.jpg", stock: 6, price: 22_000_000, rating: 4.9 },
    { id: 48, category: "مانیتور", title: "مانیتور 27 اینچ BenQ PD2700U", shortDescription: "رزولوشن 4K و رنگ دقیق برای توسعه و طراحی", image: "images/products/4.jpg", stock: 10, price: 15_000_000, rating: 4.8 },
    { id: 49, category: "کتاب", title: "کتاب Eloquent JavaScript", shortDescription: "یادگیری عمیق و تمرینی جاوااسکریپت", image: "images/products/5.jpg", stock: 18, price: 780_000, rating: 4.8 },
    { id: 50, category: "کتاب", title: "کتاب Python Crash Course", shortDescription: "شروع سریع و کاربردی برنامه‌نویسی با پایتون", image: "images/products/5.jpg", stock: 20, price: 820_000, rating: 4.9 }
];


// remove loading
const removeLoadgin = () => {
    const loadingIcon = document.querySelector('#loading')
    const blurEffect = document.querySelector('.blur-effect')
    loadingIcon.classList.add('hidden')
    blurEffect.classList.add('hidden')
}
// Check if the user is online or not.
const isLoginUser = () => {
    let isLogin = localStorage.getItem('isLogin') || 'false'
    isLogin = isLogin == 'true' ? true : false;
    return isLogin
}
// Give user information
const getUserInfo = () => {
    let user = JSON.parse(localStorage.getItem('user')) || {}
    return user
}

const getAllCategory = () => {
    let unfilteredCategories = products.map(product => product.category)
    let categories = [...new Set(unfilteredCategories)]

    return categories
}

export { logged, getAllUsers, allUserName, allEmail, removeLoadgin, isLoginUser, getUserInfo, getAllCategory, products }