/**
 * بيانات التطبيق — التصنيفات، التسابيح، والألحان
 * Central data module for Eifnoti 99.
 */

export interface HymnSection {
  id: string
  title: string
  subtitle: string
  totalPieces: number
}

export interface Category {
  id: string
  title: string
  subtitle: string
  icon: string // key into the icon map used by screens
  color?: string
  sections: HymnSection[]
}

export const categories: Category[] = [
  {
    id: 'annual',
    title: 'التسبحة السنوية',
    subtitle: 'ترانيم وصلوات السنة',
    icon: 'book',
    sections: [
      { id: 'tasbeha-avram', title: 'تسبحة إبراهيم', subtitle: 'القطعة الأولى', totalPieces: 12 },
      { id: 'minkhali-efot', title: 'من نخالي إيفوت', subtitle: 'القطعة الثانية', totalPieces: 10 },
      { id: 'tenou-shoone', title: 'تينو شوني', subtitle: 'القطعة الثالثة', totalPieces: 8 },
      { id: 'epouro-gente', title: 'إيبورو جينتي', subtitle: 'القطعة الرابعة', totalPieces: 9 },
      { id: 'aris-tekin', title: 'أريس تي كينيسيا', subtitle: 'القطعة الخامسة', totalPieces: 7 },
      { id: 'teproun-ik', title: 'تبصون ناي إف أجيوس', subtitle: 'القطعة السادسة', totalPieces: 11 },
    ],
  },
  {
    id: 'kiahk',
    title: 'التسبحة الكيهكية',
    subtitle: 'صلوات وطقوس الكيهك',
    icon: 'dome',
    sections: [
      { id: 'keahk-1', title: 'قوباط الأول — سهرة الأحد', subtitle: 'المزمور ١٣٦', totalPieces: 12 },
      { id: 'keahk-2', title: 'القربان والقداس', subtitle: 'لحن بولس', totalPieces: 8 },
      { id: 'keahk-3', title: 'ثيؤطوكية السبت', subtitle: 'القطعة الأولى', totalPieces: 9 },
      { id: 'keahk-4', title: 'كانون العذراء', subtitle: 'أشور يا مريم', totalPieces: 10 },
      { id: 'keahk-5', title: 'تسبحة الملائكة', subtitle: 'القطعة الثانية', totalPieces: 12 },
      { id: 'keahk-6', title: 'ختام الكيهك', subtitle: 'لحن القيامة', totalPieces: 6 },
    ],
  },
  {
    id: 'feasts',
    title: 'تسبحة الأعياد',
    subtitle: 'ترانيم وألحان الأعياد',
    icon: 'star',
    sections: [
      { id: 'feast-nativity', title: 'عيد الميلاد', subtitle: 'الشجرة والتسابيح', totalPieces: 12 },
      { id: 'feast-theophany', title: 'عيد الغطاس', subtitle: 'ألحان الظهور الإلهي', totalPieces: 9 },
      { id: 'feast-palm', title: 'أحد الشعانين', subtitle: 'هوشعنا لابن داود', totalPieces: 8 },
      { id: 'feast-resurrection', title: 'عيد القيامة', subtitle: 'قام من الموت', totalPieces: 12 },
      { id: 'feast-ascension', title: 'عيد الصعود', subtitle: 'صعد إلى السماء', totalPieces: 7 },
      { id: 'feast-pentecost', title: 'عيد العنصرة', subtitle: 'حل الروح القدس', totalPieces: 8 },
    ],
  },
  {
    id: 'fasting',
    title: 'تسبحة الأصوام',
    subtitle: 'صلوات وألحان الصوم',
    icon: 'cross',
    sections: [
      { id: 'fast-lent', title: 'الصوم الكبير', subtitle: 'الاعتماد والصلوات', totalPieces: 12 },
      { id: 'fast-advent', title: 'صوم الميلاد', subtitle: 'كيهك الصغير', totalPieces: 9 },
      { id: 'fast-apostles', title: 'صوم الرسل', subtitle: 'ألحان الرسل', totalPieces: 8 },
      { id: 'fast-virgin', title: 'صوم العذراء', subtitle: 'مسرى العذراء', totalPieces: 10 },
      { id: 'fast-nineveh', title: 'صوم نينوى', subtitle: 'تسبحة الثلاثة فتية', totalPieces: 7 },
    ],
  },
  {
    id: 'psalmodia',
    title: 'الإبصلمودية',
    subtitle: 'تسبحة الإبصلمودية',
    icon: 'psalmodia',
    sections: [
      { id: 'ps-1', title: 'الإبصلمودية اليومية', subtitle: 'باكر وعشية ونص الليل', totalPieces: 12 },
      { id: 'ps-2', title: 'مزامير الأبصلمو', subtitle: 'المزمر ٥٠', totalPieces: 9 },
      { id: 'ps-3', title: 'الثيؤطوكية', subtitle: 'نوتافيروس', totalPieces: 8 },
      { id: 'ps-4', title: 'القصيص والقطع', subtitle: 'الأواشي', totalPieces: 10 },
      { id: 'ps-5', title: 'ذكصولوجيات', subtitle: 'ذكصولوجية البختوم', totalPieces: 7 },
    ],
  },
  {
    id: 'hymns',
    title: 'الألحان',
    subtitle: 'ألحان قبطية متنوعة',
    icon: 'music',
    sections: [
      { id: 'mel-senani', title: 'سناني إفرام', subtitle: 'لحن فيروتى', totalPieces: 8 },
      { id: 'mel-agios', title: 'آجيوس (الثلاث قدوس)', subtitle: 'لحن القداسة', totalPieces: 6 },
      { id: 'mel-tenou', title: 'تينو أوؤست', subtitle: 'لحن الاتكال', totalPieces: 9 },
      { id: 'mel-orin', title: 'أورين سبنج', subtitle: 'لحن القيامة', totalPieces: 7 },
      { id: 'mel-risen', title: 'ريسين إيف غولغوثا', subtitle: 'لحن الصليب', totalPieces: 5 },
      { id: 'mel-pax', title: 'إف إيريني', subtitle: 'لحن السلام', totalPieces: 6 },
    ],
  },
]

export const categoryTitles: Record<string, string> = Object.fromEntries(
  categories.map((c) => [c.id, c.title]),
)

/* ------------------------------------------------------------------ */
/* Hymn text pages                                                     */
/* ------------------------------------------------------------------ */

export type LangKey = 'arabic' | 'coptic' | 'melody'

export interface PageSet {
  arabic: string[][]
  coptic: string[][]
  melody: string[][]
}

const maryArabic = [
  [
    'يا مريم',
    'يا ستّ الآبكار',
    'قد نلت تعظيم',
    'من نور الأنوار',
    'وهبت تعظيم',
    'من عنده قد صار',
    'وحملت الخالق',
    'من ذا لا يختار',
  ],
  [
    'يا بنت الملك',
    'مليئة الجمال',
    'نعمة الرب على شفتيك',
    'لذلك باركك الله',
    'إلى الأبد',
    'اسمعي يا ابنة',
    'وانظري وأميلي أذنك',
    'وانسي شعبك وبيت أبيك',
  ],
  [
    'افرحي يا ممتلئة نعمة',
    'الرب معكِ',
    'مباركة أنتِ في النساء',
    'يا عروس المسيح غير المدوسة',
    'حبل بلا زرع',
    'ولادة بلا ألم',
    'سبحي للثالوث القدوس',
    'إلى الأبد آمين',
  ],
  [
    'عليكِ يُمجد المسيح',
    'يا أم النور الحقيقي',
    'شفيعتك عند ابنكِ',
    'لخلاص نفوسنا',
    'أنتِ الكرسي المبارك',
    'الحامل ملك الملوك',
    'طوبي لأشهر حبلٍ',
    'وطوبي للثمرة التي ولدتْكِ',
  ],
  [
    'هللويا هللويا',
    'هللويا للملكة',
    'واقفة عن يمين الملك',
    'بثيابٍ مكللة ذهباً',
    'اسمعِي وابصري',
    'وميلى أذنكِ بالسرور',
    'الملكُ هوَ ابنكِ',
    'فسبحيهِ إلى الأبد',
  ],
  [
    'أيُّها الشعب كلُّه',
    'هيَّئوا للعذراء هيكلاً',
    'بالذهب والمر والبخور',
    'والطيوب الطيبة الرائحة',
    'وقدموا لها التسبيح',
    'والترانيم الروحية',
    'لأنها ولدت لنا الفادي',
    'يسوع المسيح ربنا',
  ],
  [
    'في الجليل الناصرة',
    'كانت العذراء وحدها',
    'فدخل عليها جبرائيل',
    'يقول السلام لكِ',
    'لا تخافي يا مريم',
    'لقد نلتِ حظوةً',
    'تحبلين وتلدين ابناً',
    'وتسمينه يسوع',
  ],
  [
    'كيف لي هذا',
    'وأنا لا أعرف رجلاً',
    'الروح القدس يحل بكِ',
    'وقوة العلي تظللك',
    'فذلك القدوس المولود',
    'منكِ يُدعى ابن الله',
    'هوذا أنا أمة الرب',
    'ليكن لي كقولك',
  ],
  [
    'تباركتِ يا مريم',
    'فوق بنات الأرض',
    'حملتِ النار في جسدك',
    'ولم تحترق ثيابك',
    'مثل العليقة التي رآها',
    'موسى النبي الطاهر',
    'تشتعل ولا تحترق',
    'رمزاً لتجسدك المقدس',
  ],
  [
    'تعالي انظري يا بنت صهيون',
    'فوق بني إسرائيل',
    'لأنها أخرجت ملكاً',
    'يجلس على كرسي داود',
    'مملكة لا نهاية لها',
    'وسلطان سرمدي',
    'فسبحوه يا ملائكة الله',
    'كلهم تسجدون له',
  ],
  [
    'يا فرح الملائكة',
    'يا تاج الشهداء',
    'يا شفاعة المؤمنين',
    'يا رجاء الراقدين',
    'احضرِي معنا الآن',
    'في كل زمان ومكان',
    'واسندي ضعف طبيعتنا',
    'وابسطِي يدكِ إلينا',
  ],
  [
    'أختم التسبحة',
    'بمجد الثالوث القدوس',
    'الآب والابن والروح',
    'إله واحد في الذات',
    'نسجد له ونمجده',
    'إلى الأبد آمين',
    'فليكن اسم الرب',
    'مباركاً من الآن وإلى الأبد',
  ],
]

const maryCoptic = [
  ['ⲁⲓ ⲙⲛ ⲗⲓ', 'ⲧⲁⲓ ⲥϩⲉⲣⲓ ⲛ̀ⲛⲓⲡⲁⲣⲑⲉⲛⲟⲥ', 'ⲉⲙϣⲁⲓ ⲉⲣⲟⲓ', 'ⲛⲁⲓ ⲛ̀ⲛ'],
  ['ⲝⲉ ⲉⲫⲉϫⲧ ⲙⲙⲟⲓ', 'ⲛ̀ⲧⲉ ⲛⲓⲁⲅⲓⲟⲥ', 'ⲛⲉⲙ Ⲡϭⲟⲓⲥ'],
  ['ⲙⲁⲣⲓⲁⲙ', 'ⲑⲉⲟⲧⲟⲕⲟⲥ', 'ⲁⲙⲏⲛ'],
  ['ⲁϥⲧⲱⲟⲩ ⲛ̀ⲣⲉⲙⲛ̀ⲭⲏⲙⲓ', 'ⲛⲁⲓ ⲛ̀ⲣⲁⲡ', 'ⲫⲁⲓⲱⲧⲙ ⲛ̀ⲟⲩⲱⲉⲓⲃ'],
  ['ⲛⲁⲓ ⲛ̀ⲟⲩⲱⲉⲓⲃ', 'ⲛⲉⲙ ⲛⲓⲁⲅⲓⲟⲥ', 'ⲁⲙⲏⲛ'],
  ['ⲁⲓⲉⲗⲟⲩⲱⲛ', 'ⲉⲩⲱⲅⲓⲁ ⲛ̀ⲧⲁ', 'ⲉⲙ̀ⲡⲓⲣⲏϯ'],
  ['ⲡⲁⲭⲟⲙ ⲛⲉⲙ ⲡⲓⲣⲏϯ', 'ⲛⲁⲓ ⲛ̀ⲟⲩⲱⲉⲓⲃ', 'ⲁⲙⲏⲛ'],
  ['ⲙⲁⲣⲓⲁⲙ', 'ⲛⲁⲓ ⲛ̀ⲣⲁⲡ', 'ⲉⲩⲱⲅⲓⲁ'],
  ['ⲁⲛⲟⲕ ⲡⲓⲣⲏϯ', 'ⲛ̀ⲧⲉ ⲛⲓⲁⲅⲓⲟⲥ', 'ⲛⲉⲙ Ⲡϭⲟⲓⲥ'],
  ['ⲁⲓ ϣⲗⲏⲗ', 'ⲛ̀ⲧⲉ Ⲡⲓⲭⲣⲓⲥⲧⲟⲥ', 'ⲁⲙⲏⲛ'],
  ['ⲛⲁⲓ ⲛ̀ⲟⲩⲱⲉⲓⲃ', 'ⲛⲉⲙ ⲛⲓⲁⲅⲓⲟⲥ', 'ⲛⲁⲓ ⲛ̀ⲣⲁⲡ'],
  ['ⲁⲙⲏⲛ', 'ⲁⲙⲏⲛ', 'ⲁⲗⲗⲏⲗⲟⲩⲓⲁ'],
]

const maryMelody = [
  ['ⲁⲓ ⲙⲛ ⲗⲓ ♪', 'ⲧⲁⲓ ⲥϩⲉⲣⲓ ♫', 'ⲉⲙϣⲁⲓ ⲉⲣⲟⲓ ♪', 'ⲛⲁⲓ ⲛ̀ⲛ ♫'],
  ['♪ ⲝⲉ ⲉⲫⲉϫⲧ ⲙⲙⲟⲓ', '♫ ⲛ̀ⲧⲉ ⲛⲓⲁⲅⲓⲟⲥ', '♪ ⲛⲉⲙ Ⲡϭⲟⲓⲥ ♫'],
  ['♪ ⲁⲓ ⲙⲛ ⲗⲓ ♫', '♪ ⲙⲁⲣⲓⲁⲙ ♫', '♪ ⲁⲙⲏⲛ ♫'],
]

export const hymnPages: PageSet = {
  arabic: maryArabic,
  coptic: maryCoptic,
  melody: maryMelody,
}

export function getHymnLines(lang: LangKey, page: number): string[] {
  const set = hymnPages[lang] ?? hymnPages.arabic
  return set[page % set.length]
}

export const dailyVerses = [
  { text: '«ليكن تسبيحك دائماً في فمي»', ref: 'مزمور ١:٣٤' },
  { text: '«رنمي للرب يا كل الأرض، خدموا الرب بفرح»', ref: 'مزمور ٢:١٠٠' },
  { text: '«طوبى للشعب الذي له الرب، الله الذي اختاره ميراثاً»', ref: 'مزمور ١٢:٣٣' },
  { text: '«هللويا. سبحي لله في قديسيه»', ref: 'مزمور ١:١٥٠' },
  { text: '«لأنه هو إلهنا، ونحن شعب مرعاه وقطيع يمينه»', ref: 'مزمور ٥:٩٥' },
  { text: '«يا جميع الأمم صفقوا بأيديكم، ارفعوا صوتكم لله وتهللوا»', ref: 'مزمور ١:٤٧' },
  { text: '«عجيبة هي أعمالك، ونفسك تعرف ذلك يقيناً»', ref: 'مزمور ١٣:١٣٩' },
]

export function todayVerse() {
  const day = new Date().getDate()
  return dailyVerses[day % dailyVerses.length]
}
