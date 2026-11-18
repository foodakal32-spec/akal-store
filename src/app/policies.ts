// Store policy pages (/politiques/<slug>), in French and Arabic.
// Source: the AKAL e-commerce store (src/i18n/messages, "pages"). The terms and privacy texts
// were marked there as DRAFTS to be reviewed before publishing — have them checked.

type PolicyText = {
  title: string;
  intro: string;
  sections: { title: string; body: string }[];
};

export type Policy = { slug: string; fr: PolicyText; ar: PolicyText };

export const policies: Policy[] = [
  {
    slug: "livraison",
    fr: {
      title: "Livraison",
      intro: "Nous livrons dans toutes les villes du Maroc avec paiement à la livraison.",
      sections: [
        { title: "Délais", body: "Entre 24 et 72 heures ouvrées après confirmation de la commande par téléphone ou WhatsApp." },
        { title: "Frais de livraison", body: "Un tarif fixe s'applique pour la plupart des villes et s'affiche avant la confirmation. La livraison est offerte à partir d'un certain montant." },
        { title: "Confirmation", body: "Après votre commande, nous vous contactons pour la confirmer. Merci d'indiquer un numéro de téléphone valide." },
      ],
    },
    ar: {
      title: "الشحن والتوصيل",
      intro: "نوصل إلى جميع مدن المغرب مع الدفع عند الاستلام.",
      sections: [
        { title: "مدة التوصيل", body: "بين 24 و72 ساعة عمل بعد تأكيد الطلب عبر الهاتف أو واتساب." },
        { title: "ثمن التوصيل", body: "ثمن التوصيل ثابت لأغلب المدن ويظهر قبل تأكيد الطلب. التوصيل مجاني ابتداءً من مبلغ معيّن." },
        { title: "تأكيد الطلب", body: "بعد تسجيل طلبك، نتواصل معك لتأكيده. المرجو إدخال رقم هاتف صحيح." },
      ],
    },
  },
  {
    slug: "retours",
    fr: {
      title: "Retours et échanges",
      intro: "Votre satisfaction compte pour nous.",
      sections: [
        { title: "Produit abîmé ou erroné", body: "Si vous recevez un produit abîmé ou non conforme, contactez-nous dans les 48 heures avec une photo : nous le remplacerons gratuitement." },
        { title: "Produits alimentaires", body: "Pour des raisons d'hygiène, les produits alimentaires ouverts ne peuvent pas être retournés." },
        { title: "Comment faire ?", body: "Écrivez-nous sur WhatsApp avec votre numéro de commande." },
      ],
    },
    ar: {
      title: "الإرجاع والاستبدال",
      intro: "رضاك يهمنا.",
      sections: [
        { title: "منتج تالف أو خاطئ", body: "إذا وصلك منتج تالف أو غير مطابق لطلبك، تواصل معنا خلال 48 ساعة من الاستلام مع صورة، وسنستبدله مجانًا." },
        { title: "المنتجات الغذائية", body: "لأسباب صحية، لا يمكن إرجاع المنتجات الغذائية بعد فتحها." },
        { title: "كيف تطلب الإرجاع؟", body: "راسلنا عبر واتساب مع رقم الطلب." },
      ],
    },
  },
  {
    slug: "conditions",
    fr: {
      title: "Conditions générales de vente",
      intro: "Les conditions qui s'appliquent à vos commandes sur AKAL.",
      sections: [
        { title: "Commandes", body: "Chaque commande est confirmée par téléphone ou WhatsApp. Nous pouvons annuler une commande en cas d'informations erronées ou de rupture de stock." },
        { title: "Prix", body: "Les prix sont en dirhams marocains TTC. Les frais de livraison s'affichent avant confirmation." },
        { title: "Paiement", body: "Paiement en espèces à la livraison uniquement." },
        { title: "Responsabilité", body: "Nos produits sont naturels ; en cas d'allergie, lisez attentivement la liste des ingrédients." },
      ],
    },
    ar: {
      title: "شروط البيع",
      intro: "الشروط التي تنطبق على طلباتك من أكال.",
      sections: [
        { title: "الطلبات", body: "كل طلب يخضع للتأكيد عبر الهاتف أو واتساب. نحتفظ بحق إلغاء أي طلب في حالة معلومات غير صحيحة أو نفاد المخزون." },
        { title: "الأسعار", body: "الأسعار بالدرهم المغربي وتشمل الضرائب. ثمن التوصيل يظهر قبل تأكيد الطلب." },
        { title: "الدفع", body: "الدفع نقدًا عند الاستلام فقط." },
        { title: "المسؤولية", body: "منتجاتنا طبيعية؛ إن كانت لديك حساسية من أي مكوّن، المرجو قراءة المكونات بعناية." },
      ],
    },
  },
  {
    slug: "confidentialite",
    fr: {
      title: "Politique de confidentialité",
      intro: "Comment nous utilisons et protégeons vos informations.",
      sections: [
        { title: "Données collectées", body: "Nom, téléphone, ville et adresse, uniquement pour traiter et livrer votre commande." },
        { title: "Utilisation", body: "Vos données servent à confirmer, livrer et suivre votre commande. Nous ne les vendons à aucun tiers." },
        { title: "Partage", body: "Votre adresse et votre téléphone sont transmis uniquement au transporteur pour la livraison." },
        { title: "Vos droits", body: "Conformément à la loi 09-08, vous pouvez demander l'accès, la rectification ou la suppression de vos données en nous contactant." },
      ],
    },
    ar: {
      title: "سياسة الخصوصية",
      intro: "كيف نستعمل معلوماتك ونحميها.",
      sections: [
        { title: "المعلومات التي نجمعها", body: "الاسم، رقم الهاتف، المدينة والعنوان، وذلك فقط لمعالجة طلبك وتوصيله." },
        { title: "استعمال المعلومات", body: "نستعمل معلوماتك لتأكيد الطلب وتوصيله والتواصل معك بشأنه. لا نبيع معلوماتك لأي طرف ثالث." },
        { title: "مشاركة المعلومات", body: "نشارك عنوانك ورقم هاتفك فقط مع شركة التوصيل لإيصال طلبك." },
        { title: "حقوقك", body: "وفقًا للقانون 09-08، يمكنك طلب الاطلاع على معلوماتك أو تصحيحها أو حذفها عبر التواصل معنا." },
      ],
    },
  },
];

export const getPolicy = (slug: string) => policies.find((p) => p.slug === slug);
