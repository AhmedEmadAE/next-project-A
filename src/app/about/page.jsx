'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function MedicalFormulations() {
    // متغيرات التطبيق
    const [cartItems, setCartItems] = useState({});
    const [orderedProducts, setOrderedProducts] = useState({});
    const [currentCategory, setCurrentCategory] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [showCart, setShowCart] = useState(false);
    const [productQuantities, setProductQuantities] = useState({});

    const recipesData = {
        'hair-care': {
            title: 'تركيبات طبية للعناية بالشعر',
            formulations: [
                {
                    id: 'hair-1',
                    name: 'لوشن تقوية الشعر',
                    price: '150 ج.م',
                    description: 'تركيبة طبية فعالة لتقليل تساقط الشعر وتعزيز نموه من خلال تحفيز الدورة الدموية في فروة الرأس.',
                    ingredients: ['كافيين 3%', 'بانتينول 5%', 'مستخلص إكليل الجبل', 'نياسيناميد'],
                    usage: 'يُطبق على فروة الرأس يومياً مع تدليك خفيف لمدة دقيقتين. يُفضل استخدامه مساءً.'
                },
                {
                    id: 'hair-2',
                    name: 'شامبو مرطب للشعر الجاف',
                    price: '120 ج.م',
                    description: 'شامبو طبي غني بالزيوت الطبيعية لترطيب الشعر الجاف وإعادة الحيوية واللمعان للشعر التالف.',
                    ingredients: ['زيت الأرغان', 'فيتامين E', 'بروتينات الحرير', 'حمض الهيالورونيك'],
                    usage: 'يُستخدم مرتين في الأسبوع. يُترك على الشعر لمدة 3 دقائق قبل الشطف.'
                },
                {
                    id: 'hair-3',
                    name: 'بلسم الشعر المقوي',
                    price: '130 ج.م',
                    description: 'بلسم طبي يقوي بصيلات الشعر ويمنحه مظهرًا صحيًا ولامعًا مع حماية من التقصف.',
                    ingredients: ['زيت جوز الهند', 'بروتين القمح', 'زبدة الشيا', 'كيراتين'],
                    usage: 'يُترك على الشعر بعد الشامبو لمدة 5 دقائق ثم يُشطف جيداً بالماء الفاتر.'
                },
                {
                    id: 'hair-4',
                    name: 'سيروم حماية الشعر من الحرارة',
                    price: '180 ج.م',
                    description: 'سيروم وقائي طبي يحمي الشعر من التلف الناتج عن أدوات التصفيف الحرارية حتى 230 درجة مئوية.',
                    ingredients: ['زيت اللوز الحلو', 'ثنائي ميثيكون', 'فيتامين B5', 'خلاصة القمح'],
                    usage: 'يُوضع على الشعر الرطب أو الجاف قبل استخدام أدوات التصفيف الحرارية.'
                },
                {
                    id: 'hair-5',
                    name: 'قناع التغذية العميقة',
                    price: '200 ج.م',
                    description: 'قناع علاجي يُعيد الحيوية للشعر التالف والجاف جدًا مع تغذية عميقة للبصيلات.',
                    ingredients: ['أفوكادو', 'عسل النحل', 'زيت الزيتون البكر', 'بروتينات الصويا'],
                    usage: 'يُستخدم مرة واحدة أسبوعيًا لمدة 30 دقيقة مع تغطية الشعر بمنشفة دافئة.'
                },
                {
                    id: 'hair-6',
                    name: 'منشط فروة الرأس',
                    price: '160 ج.م',
                    description: 'منشط طبي يحفز الدورة الدموية في فروة الرأس ويمنع القشرة مع تنظيم إفراز الدهون.',
                    ingredients: ['زيت شجرة الشاي', 'مستخلص النعناع', 'الزنك بيريثيون', 'حمض الساليسيليك'],
                    usage: 'يُرش على فروة الرأس 3 مرات أسبوعياً ويُدلك بلطف لمدة دقيقتين.'
                },
                {
                    id: 'hair-7',
                    name: 'زيت نمو الشعر',
                    price: '170 ج.م',
                    description: 'زيت طبيعي معزز لنمو الشعر بتركيبة من الزيوت الفعالة لتغذية البصيلات وتكثيف الشعر.',
                    ingredients: ['زيت الخروع', 'زيت الجوجوبا', 'زيت اللافندر', 'زيت إكليل الجبل'],
                    usage: 'يُدلك على فروة الرأس 3 مرات أسبوعياً ويُترك طوال الليل.'
                },
                {
                    id: 'hair-8',
                    name: 'رغوة تنظيف فروة الرأس',
                    price: '140 ج.م',
                    description: 'رغوة طبية لتنظيف عميق لفروة الرأس وإزالة الزيوت الزائدة دون تجفيف الشعر.',
                    ingredients: ['حمض الساليسيليك 1%', 'خلاصة النعناع', 'ألانتوين', 'بيكربونات الصوديوم'],
                    usage: 'يُستخدم مرة أسبوعياً مع تدليك فروة الرأس لمدة دقيقتين ثم يشطف جيداً.'
                },
                {
                    id: 'hair-9',
                    name: 'بخاخ حماية من أشعة الشمس',
                    price: '190 ج.م',
                    description: 'بخاخ وقائي للشعر من أضرار أشعة الشمس والأكسدة مع حماية من الجفاف والتلف.',
                    ingredients: ['مستخلص الألوة فيرا', 'بروتين القمح', 'فيتامين E', 'مركبات UV الفعالة'],
                    usage: 'يُرش على الشعر قبل الخروج في الشمس مباشرة ويُعاد كل 4 ساعات.'
                }
            ]
        },
        'dental-care': {
            title: 'تركيبات طبية للعناية بالأسنان',
            formulations: [
                {
                    id: 'dental-1',
                    name: 'غسول فم مطهر',
                    price: '90 ج.م',
                    description: 'غسول فم طبي قوي يقضي على 99% من البكتيريا المسببة لرائحة الفم الكريهة ويحمي من التهاب اللثة.',
                    ingredients: ['كلورهيكسيدين 0.12%', 'فلورايد الصوديوم', 'زيوت عطرية طبيعية', 'زيت القرنفل'],
                    usage: 'يُستخدم 10 مل مرتين يومياً بعد تنظيف الأسنان بالفرشاة لمدة 30 ثانية.'
                },
                {
                    id: 'dental-2',
                    name: 'معجون أسنان مبيض',
                    price: '110 ج.م',
                    description: 'معجون أسنان طبي يساعد على إزالة البقع السطحية واستعادة البياض الطبيعي للأسنان.',
                    ingredients: ['بيروكسيد الكارباميد 5%', 'هيدروكسياباتيت', 'إنزيمات التبييض', 'صودا الخبز'],
                    usage: 'يُستخدم مرة واحدة يومياً بدلاً من المعجون العادي لمدة 4 أسابيع.'
                },
                {
                    id: 'dental-3',
                    name: 'جيل معالجة حساسية الأسنان',
                    price: '140 ج.م',
                    description: 'جيل طبي متخصص يقلل من حساسية الأسنان تجاه المأكولات والمشروبات الباردة والساخنة.',
                    ingredients: ['نترات البوتاسيوم 5%', 'فلورايد الصوديوم', 'أرغينين', 'ثاني أكسيد السيليكون'],
                    usage: 'يُطبق مباشرة على الأسنان الحساسة بقطنة نظيفة مرتين يومياً.'
                },
                {
                    id: 'dental-4',
                    name: 'معجون أسنان للأطفال',
                    price: '80 ج.م',
                    description: 'معجون أسنان طبي آمن للأطفال بنكهة الفواكه لحماية الأسنان اللبنية من التسوس.',
                    ingredients: ['فلورايد 500ppm', 'زيليتول', 'نكهة الفراولة الطبيعية', 'كالسيوم'],
                    usage: 'يُستخدم بحجم حبة الأرز مرتين يومياً تحت إشراف الوالدين.'
                },
                {
                    id: 'dental-5',
                    name: 'محلول للقرح الفموية',
                    price: '95 ج.م',
                    description: 'محلول طبي يُسرّع من التئام القرح الفموية ويخفف الألم بشكل فوري.',
                    ingredients: ['حمض الهيالورونيك', 'مستخلص البابونج', 'ليدوكائين 2%', 'ألجينات الصوديوم'],
                    usage: 'يُطبق على القرحة بقطنة نظيفة 3-4 مرات يومياً بعد الوجبات.'
                },
                {
                    id: 'dental-6',
                    name: 'غسول فم طبيعي',
                    price: '100 ج.م',
                    description: 'غسول فم طبي خالٍ من الكحول يعتمد على مكونات طبيعية لرعاية يومية للفم.',
                    ingredients: ['مستخلص النعناع', 'زيت شجرة الشاي', 'صمغ المرة', 'عسل مانوكا'],
                    usage: 'يُستخدم صباحًا ومساءً لمدة 30 ثانية بعد تفريش الأسنان.'
                },
                {
                    id: 'dental-7',
                    name: 'مسكن ألم الأسنان الفوري',
                    price: '85 ج.م',
                    description: 'جل مسكن سريع المفعول لألم الأسنان واللثة مع تأثير مضاد للالتهاب.',
                    ingredients: ['بنزوكائين 20%', 'مستخلص القرنفل', 'ألانتوين', 'زيت النعناع'],
                    usage: 'يُطبق على المنطقة المؤلمة بكمية صغيرة عند الحاجة.'
                },
                {
                    id: 'dental-8',
                    name: 'معجون أسنان للثة الحساسة',
                    price: '115 ج.م',
                    description: 'معجون أسنان طبي مخصص للعناية باللثة الحساسة والمتورمة مع حماية من النزيف.',
                    ingredients: ['بيكربونات الصوديوم', 'ألانتوين', 'فلوريد القصدير', 'مستخلص البابونج'],
                    usage: 'يُستخدم مرتين يومياً مع تدليك اللثة بلطف بواسطة فرشاة ناعمة.'
                },
                {
                    id: 'dental-9',
                    name: 'غسول تبييض الأسنان المنزلي',
                    price: '125 ج.م',
                    description: 'غسول تبييض طبي للاستخدام المنزلي يعمل على إزالة البقع العميقة بأمان.',
                    ingredients: ['بيروكسيد الهيدروجين 3%', 'جليسرين', 'نترات البوتاسيوم', 'زيت الليمون'],
                    usage: 'يُستخدم مرة يومياً لمدة 1 دقيقة لمدة أسبوعين فقط.'
                }
            ]
        },
        'skin-care': {
            title: 'تركيبات طبية للعناية بالبشرة',
            formulations: [
                {
                    id: 'skin-1',
                    name: 'كريم تجديد البشرة الليلي',
                    price: '220 ج.م',
                    description: 'كريم ليلي طبي يعمل على تحفيز إنتاج الكولاجين وتقليل التجاعيد الدقيقة أثناء النوم.',
                    ingredients: ['ريتينول 0.3%', 'حمض الهيالورونيك', 'فيتامين C', 'نياسيناميد'],
                    usage: 'يُطبق على بشرة نظيفة قبل النوم. يُستخدم 3 مرات أسبوعياً في البداية.'
                },
                {
                    id: 'skin-2',
                    name: 'سيروم فيتامين C',
                    price: '250 ج.م',
                    description: 'سيروم طبي قوي مضاد للأكسدة يمنح البشرة إشراقة ويحميها من التلف البيئي.',
                    ingredients: ['فيتامين C 20%', 'حمض الفيروليك', 'فيتامين E', 'حمض الهيالورونيك'],
                    usage: 'يُطبق 3-4 قطرات صباحاً قبل المرطب مع وضع واقي شمس بعده.'
                },
                {
                    id: 'skin-3',
                    name: 'كريم مرطب عميق',
                    price: '180 ج.م',
                    description: 'كريم طبي مرطب للبشرة الجافة جدًا والمتشققة بفضل تركيبته الغنية بالدهون.',
                    ingredients: ['زبدة الشيا', 'سيراميد 3%', 'فيتامين B3', 'أحماض أوميجا 6'],
                    usage: 'يُستخدم يومياً على الجسم والوجه بعد الاستحمام بينما البشرة رطبة.'
                },
                {
                    id: 'skin-4',
                    name: 'واقي شمس واسع الطيف',
                    price: '160 ج.م',
                    description: 'واقي شمس طبي يوفر حماية قصوى من أشعة UVA و UVB مع مقاومة للماء.',
                    ingredients: ['أوكسيد الزنك', 'ثاني أكسيد التيتانيوم', 'مضادات أكسدة', 'هيالورونات الصوديوم'],
                    usage: 'يُطبق قبل التعرض للشمس بـ 20 دقيقة وبكمية كافية (ملعقة صغيرة للوجه).'
                },
                {
                    id: 'skin-5',
                    name: 'مقشر لطيف للبشرة الحساسة',
                    price: '140 ج.م',
                    description: 'مقشر طبي لطيف يُزيل الخلايا الميتة بلطف دون تهييج البشرة الحساسة.',
                    ingredients: ['حمض اللاكتيك 5%', 'مستخلص الشوفان', 'ألانتوين', 'بانثينول'],
                    usage: 'يُستخدم مرة واحدة أسبوعياً على بشرة نظيفة مع تجنب منطقة حول العين.'
                },
                {
                    id: 'skin-6',
                    name: 'جل معالجة حب الشباب',
                    price: '130 ج.م',
                    description: 'جل طبي يُقلل من ظهور حب الشباب وينظف المسام بعمق وينظم إفراز الدهون.',
                    ingredients: ['حمض الساليسيليك 2%', 'زيت شجرة الشاي', 'نياسيناميد 4%', 'خلاصة عرق السوس'],
                    usage: 'يُطبق على الحبوب مباشرة مساءً بعد التنظيف. يُستخدم يومياً.'
                },
                {
                    id: 'skin-7',
                    name: 'مصل النضارة الفوري',
                    price: '270 ج.م',
                    description: 'مصل طبي يعطي إشراقة فورية للبشرة مع ترطيب عميق وتوحيد لون البشرة.',
                    ingredients: ['نياسيناميد 10%', 'حمض الهيالورونيك', 'عرق السوس', 'فيتامين E'],
                    usage: 'يُطبق صباحاً ومساءً بعد التنظيف وقبل المرطب.'
                },
                {
                    id: 'skin-8',
                    name: 'كريم العيون المضاد للتجاعيد',
                    price: '230 ج.م',
                    description: 'كريم عيون طبي يقلل من الهالات السوداء والتجاعيد الدقيقة حول العين.',
                    ingredients: ['كافيين 5%', 'ببتيدات', 'حمض الهيالورونيك', 'فيتامين K'],
                    usage: 'يُطبق بلطف حول العين صباحاً ومساءً باستخدام البنصر.'
                },
                {
                    id: 'skin-9',
                    name: 'قناع طين تنقية المسام',
                    price: '150 ج.م',
                    description: 'قناع طبي من الطين الطبيعي لامتصاص الزيوت الزائدة وتنقية المسام بعمق.',
                    ingredients: ['طين الغاسول', 'فحم نشط', 'زيت النعناع', 'حمض الجليكوليك'],
                    usage: 'يُستخدم مرة أسبوعياً لمدة 10 دقائق ثم يشطف بالماء الفاتر.'
                }
            ]
        }
    };

    // تهيئة كميات المنتجات عند تغيير الفئة
    useEffect(() => {
        if (currentCategory && recipesData[currentCategory]) {
            const initialQuantities = {};
            recipesData[currentCategory].formulations.forEach(product => {
                initialQuantities[product.id] = 1;
            });
            setProductQuantities(initialQuantities);
        }
    }, [currentCategory]);

    // تحديث عداد السلة
    const updateCart = () => {
        const totalItems = Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);
        return totalItems;
    };

    // تحديث كمية منتج معين
    const updateQuantity = (productId, change) => {
        setProductQuantities(prev => ({
            ...prev,
            [productId]: Math.max(1, Math.min(10, (prev[productId] || 1) + change))
        }));
    };

    // عرض رسالة التأكيد
    const handleShowConfirmation = (productName, productId) => {
        const quantity = productQuantities[productId] || 1;
        const newCartItems = { ...cartItems };

        if (!newCartItems[productId]) {
            newCartItems[productId] = {
                name: productName,
                quantity: quantity,
                price: getProductPrice(productId)
            };
        } else {
            newCartItems[productId].quantity += quantity;
        }

        setCartItems(newCartItems);
        setOrderedProducts({ ...orderedProducts, [productId]: true });

        setConfirmationMessage(`تم طلب ${quantity} من "${productName}" بنجاح! سيتم توصيلها إليك خلال 2-3 أيام عمل.`);
        setShowConfirmation(true);

        setTimeout(() => {
            setShowConfirmation(false);
        }, 5000);
    };

    // الحصول على سعر المنتج
    const getProductPrice = (productId) => {
        for (const category in recipesData) {
            const product = recipesData[category].formulations.find(p => p.id === productId);
            if (product) {
                return parseInt(product.price.split(' ')[0]);
            }
        }
        return 0;
    };

    // إلغاء الطلب
    const handleCancelOrder = (productId) => {
        const newCartItems = { ...cartItems };
        const newOrderedProducts = { ...orderedProducts };

        delete newCartItems[productId];
        delete newOrderedProducts[productId];

        setCartItems(newCartItems);
        setOrderedProducts(newOrderedProducts);
    };

    // عرض الفئة المحددة
    const handleShowCategory = (categoryId) => {
        setCurrentCategory(categoryId);
    };

    // تحديث عرض السلة
    const renderCartItems = () => {
        if (Object.keys(cartItems).length === 0) {
            return <p style={{ textAlign: 'center', color: '#6c757d' }}>سلة التسوق فارغة</p>;
        }

        let total = 0;
        return (
            <>
                {Object.entries(cartItems).map(([id, item]) => {
                    const itemTotal = item.quantity * item.price;
                    total += itemTotal;

                    return (
                        <div key={id} className={styles.cartItem}>
                            <div className={styles.cartItemInfo}>
                                <div className={styles.cartItemName}>{item.name}</div>
                                <div className={styles.cartItemPrice}>{item.price} ج.م</div>
                            </div>
                            <div className={styles.cartItemQuantity}>
                                <span>{item.quantity}</span>
                            </div>
                            <div className={styles.cartItemTotal}>{itemTotal} ج.م</div>
                        </div>
                    );
                })}
                <div className={styles.cartTotal}>
                    الإجمالي: {total} ج.م
                </div>
            </>
        );
    };

    return (
        <div dir="rtl" className={styles.container}>
            {/* سلة التسوق */}
            <div className={styles.cartIcon} onClick={() => setShowCart(true)}>
                🛒
                <span className={styles.cartCount}>{updateCart()}</span>
            </div>

            <div className={styles.container}>
                <header className={styles.pageHeader}>
                    <h1>التركيبات الطبية</h1>
                    <p>اكتشف تركيبات الصيدلية المصممة خصيصًا لتلبية احتياجاتك الطبية والجمالية</p>

                    {/* أزرار الفئات */}
                    <div className={styles.categoriesContainer}>
                        <div className={styles.categoriesSidebar}>
                            <button
                                onClick={() => handleShowCategory('hair-care')}
                                className={`${styles.categoryBtn} ${currentCategory === 'hair-care' ? styles.active : ''}`}
                            >
                                تركيبات الشعر
                            </button>
                            <button
                                onClick={() => handleShowCategory('dental-care')}
                                className={`${styles.categoryBtn} ${currentCategory === 'dental-care' ? styles.active : ''}`}
                            >
                                تركيبات الأسنان
                            </button>
                            <button
                                onClick={() => handleShowCategory('skin-care')}
                                className={`${styles.categoryBtn} ${currentCategory === 'skin-care' ? styles.active : ''}`}
                            >
                                تركيبات البشرة
                            </button>
                        </div>
                    </div>
                </header>

                {/* منطقة عرض المحتوى */}
                <main className={styles.productsArea} id="content-area">
                    {!currentCategory ? (
                        <>
                            <h2>أهلاً بك في قسم التركيبات!</h2>
                            <p className={styles.placeholder}>اختر فئة من القائمة لعرض التركيبات المتاحة</p>
                        </>
                    ) : (
                        <>
                            <h2>{recipesData[currentCategory]?.title}</h2>
                            <div className={styles.productsGrid}>
                                {recipesData[currentCategory]?.formulations.map(formulation => {
                                    const isOrdered = orderedProducts[formulation.id];
                                    const quantity = productQuantities[formulation.id] || 1;

                                    return (
                                        <div key={formulation.id} className={`${styles.productCard} ${isOrdered ? styles.ordered : ''}`}>
                                            {isOrdered && <span className={styles.orderedBadge}>تم الطلب</span>}
                                            <h3>{formulation.name}</h3>
                                            <div className={styles.productPrice}>{formulation.price}</div>
                                            <p className={styles.description}>{formulation.description}</p>

                                            <div className={styles.ingredientsSection}>
                                                <h4>المكونات الرئيسية</h4>
                                                <ul className={styles.ingredientsList}>
                                                    {formulation.ingredients.map((ing, index) => (
                                                        <li key={index}>{ing}</li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className={styles.usageSection}>
                                                <h4>طريقة الاستخدام</h4>
                                                <p className={styles.usageText}>{formulation.usage}</p>
                                            </div>

                                            <div className={styles.productActions}>
                                                {!isOrdered ? (
                                                    <>
                                                        <div className={styles.quantityControls}>
                                                            <button
                                                                className={styles.quantityBtn}
                                                                onClick={() => updateQuantity(formulation.id, -1)}
                                                            >
                                                                -
                                                            </button>
                                                            <input
                                                                type="number"
                                                                className={styles.quantityInput}
                                                                value={quantity}
                                                                min="1"
                                                                max="10"
                                                                onChange={(e) => {
                                                                    const newValue = Math.max(1, Math.min(10, parseInt(e.target.value) || 1));
                                                                    setProductQuantities(prev => ({
                                                                        ...prev,
                                                                        [formulation.id]: newValue
                                                                    }));
                                                                }}
                                                            />
                                                            <button
                                                                className={styles.quantityBtn}
                                                                onClick={() => updateQuantity(formulation.id, 1)}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <button
                                                            className={styles.buyBtn}
                                                            onClick={() => handleShowConfirmation(formulation.name, formulation.id)}
                                                        >
                                                            شراء التركيبة
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        className={styles.cancelBtn}
                                                        onClick={() => handleCancelOrder(formulation.id)}
                                                    >
                                                        إلغاء الطلب
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </main>
            </div>



        </div>
    );
}