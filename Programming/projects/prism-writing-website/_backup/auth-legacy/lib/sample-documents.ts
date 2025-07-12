// Sample documents for translation demonstration
export interface SampleDocument {
  id: string;
  title: string;
  type: 'business' | 'legal' | 'technical' | 'marketing' | 'academic' | 'medical' | 'literary';
  originalLanguage: string;
  content: string;
  translations: Record<string, string>;
  complexity: 'basic' | 'intermediate' | 'advanced' | 'expert';
  wordCount: number;
}

export const sampleDocuments: SampleDocument[] = [
  {
    id: 'business-proposal',
    title: 'Business Partnership Proposal',
    type: 'business',
    originalLanguage: 'en',
    complexity: 'intermediate',
    wordCount: 156,
    content: `Dear Valued Partner,

We are pleased to present this partnership proposal for expanding our operations into international markets. Our company has established a strong presence in the domestic market over the past five years, achieving consistent growth and building a loyal customer base.

This strategic partnership would enable both organizations to leverage their respective strengths and create synergistic value. We propose a joint venture that combines our innovative technology solutions with your extensive distribution network.

Key Benefits:
• Access to new markets and customer segments
• Shared resources and reduced operational costs
• Enhanced product development capabilities
• Accelerated time-to-market for new solutions

We believe this collaboration represents a significant opportunity for mutual growth and long-term success. We look forward to discussing this proposal in detail and exploring how we can work together to achieve our shared objectives.

Sincerely,
Executive Team`,
    translations: {
      'es': `Estimado Socio Valioso,

Nos complace presentar esta propuesta de asociación para expandir nuestras operaciones a mercados internacionales. Nuestra empresa ha establecido una fuerte presencia en el mercado nacional durante los últimos cinco años, logrando un crecimiento constante y construyendo una base de clientes leales.

Esta asociación estratégica permitiría a ambas organizaciones aprovechar sus respectivas fortalezas y crear valor sinérgico. Proponemos una empresa conjunta que combine nuestras soluciones tecnológicas innovadoras con su extensa red de distribución.

Beneficios Clave:
• Acceso a nuevos mercados y segmentos de clientes
• Recursos compartidos y costos operativos reducidos
• Capacidades mejoradas de desarrollo de productos
• Tiempo acelerado de llegada al mercado para nuevas soluciones

Creemos que esta colaboración representa una oportunidad significativa para el crecimiento mutuo y el éxito a largo plazo. Esperamos discutir esta propuesta en detalle y explorar cómo podemos trabajar juntos para alcanzar nuestros objetivos compartidos.

Atentamente,
Equipo Ejecutivo`,
      'fr': `Cher Partenaire Estimé,

Nous avons le plaisir de présenter cette proposition de partenariat pour étendre nos opérations aux marchés internationaux. Notre entreprise a établi une forte présence sur le marché national au cours des cinq dernières années, réalisant une croissance constante et fidélisant sa clientèle.

Ce partenariat stratégique permettrait aux deux organisations de tirer parti de leurs forces respectives et de créer une valeur synergique. Nous proposons une coentreprise qui combine nos solutions technologiques innovantes avec votre vaste réseau de distribution.

Avantages Clés:
• Accès à de nouveaux marchés et segments de clientèle
• Ressources partagées et coûts opérationnels réduits
• Capacités améliorées de développement de produits
• Temps de mise sur le marché accéléré pour les nouvelles solutions

Nous croyons que cette collaboration représente une opportunité significative pour la croissance mutuelle et le succès à long terme. Nous avons hâte de discuter cette proposition en détail et d'explorer comment nous pouvons travailler ensemble pour atteindre nos objectifs communs.

Cordialement,
Équipe de Direction`,
      'zh': `尊敬的合作伙伴，

我们很高兴提交这份合作提案，以将我们的业务扩展到国际市场。我们公司在过去五年中在国内市场建立了强大的地位，实现了持续增长并建立了忠诚的客户群。

这一战略合作伙伴关系将使两个组织能够利用各自的优势并创造协同价值。我们提议建立合资企业，将我们的创新技术解决方案与您广泛的分销网络相结合。

主要优势：
• 进入新市场和客户群
• 共享资源和降低运营成本
• 增强产品开发能力
• 加快新解决方案的上市时间

我们相信这种合作代表了互利增长和长期成功的重要机会。我们期待详细讨论这一提案，并探索我们如何合作实现共同目标。

此致敬礼，
执行团队`,
      'ar': `شريكنا المحترم،

يسعدنا أن نقدم لكم هذا الاقتراح للشراكة من أجل توسيع عملياتنا في الأسواق الدولية. لقد أسست شركتنا حضوراً قوياً في السوق المحلي خلال السنوات الخمس الماضية، محققة نمواً مستمراً وبناء قاعدة عملاء مخلصين.

ستمكن هذه الشراكة الاستراتيجية كلا المنظمتين من الاستفادة من نقاط القوة الخاصة بكل منهما وخلق قيمة متضافرة. نقترح مشروعاً مشتركاً يجمع بين حلولنا التكنولوجية المبتكرة وشبكة التوزيع الواسعة لديكم.

الفوائد الرئيسية:
• الوصول إلى أسواق وقطاعات عملاء جديدة
• الموارد المشتركة وتقليل التكاليف التشغيلية
• تعزيز قدرات تطوير المنتجات
• تسريع وقت طرح الحلول الجديدة في السوق

نعتقد أن هذا التعاون يمثل فرصة مهمة للنمو المتبادل والنجاح على المدى الطويل. نتطلع إلى مناقشة هذا الاقتراح بالتفصيل واستكشاف كيف يمكننا العمل معاً لتحقيق أهدافنا المشتركة.

مع أطيب التحيات،
الفريق التنفيذي`
    }
  },
  {
    id: 'medical-report',
    title: 'Medical Research Abstract',
    type: 'medical',
    originalLanguage: 'en',
    complexity: 'expert',
    wordCount: 142,
    content: `Background: Cardiovascular disease remains the leading cause of mortality worldwide, with hypertension affecting approximately 1.13 billion people globally. Recent advances in pharmacogenomics have opened new avenues for personalized antihypertensive therapy.

Objective: To evaluate the efficacy of genotype-guided antihypertensive therapy compared to conventional treatment protocols in patients with essential hypertension.

Methods: A randomized controlled trial was conducted involving 500 participants with essential hypertension. Patients were stratified based on CYP2D6 and ACE genotype polymorphisms and randomized to receive either genotype-guided therapy or standard care.

Results: Patients receiving genotype-guided therapy demonstrated significantly improved blood pressure control (p<0.001) and reduced adverse drug reactions (ADRs) by 34% compared to the control group. Time to therapeutic target achievement was reduced by an average of 2.3 weeks.

Conclusion: Pharmacogenomic-guided antihypertensive therapy shows promise for improving clinical outcomes while reducing treatment-related complications.`,
    translations: {
      'es': `Antecedentes: La enfermedad cardiovascular sigue siendo la principal causa de mortalidad a nivel mundial, con hipertensión afectando aproximadamente a 1.13 mil millones de personas globalmente. Los avances recientes en farmacogenómica han abierto nuevas vías para la terapia antihipertensiva personalizada.

Objetivo: Evaluar la eficacia de la terapia antihipertensiva guiada por genotipo comparada con protocolos de tratamiento convencionales en pacientes con hipertensión esencial.

Métodos: Se realizó un ensayo controlado aleatorizado involucrando 500 participantes con hipertensión esencial. Los pacientes fueron estratificados basándose en polimorfismos de genotipo CYP2D6 y ACE y aleatorizados para recibir terapia guiada por genotipo o atención estándar.

Resultados: Los pacientes que recibieron terapia guiada por genotipo demostraron control de presión arterial significativamente mejorado (p<0.001) y reducción de reacciones adversas a medicamentos (RAM) en 34% comparado con el grupo control. El tiempo para lograr el objetivo terapéutico se redujo en promedio 2.3 semanas.

Conclusión: La terapia antihipertensiva guiada por farmacogenómica muestra promesa para mejorar los resultados clínicos mientras reduce las complicaciones relacionadas con el tratamiento.`,
      'de': `Hintergrund: Herz-Kreislauf-Erkrankungen bleiben weltweit die führende Todesursache, wobei Bluthochdruck etwa 1,13 Milliarden Menschen global betrifft. Jüngste Fortschritte in der Pharmakogenomik haben neue Wege für personalisierte antihypertensive Therapie eröffnet.

Zielsetzung: Die Wirksamkeit genotyp-geleiteter antihypertensiver Therapie im Vergleich zu konventionellen Behandlungsprotokollen bei Patienten mit essentieller Hypertonie zu bewerten.

Methoden: Eine randomisierte kontrollierte Studie wurde mit 500 Teilnehmern mit essentieller Hypertonie durchgeführt. Patienten wurden basierend auf CYP2D6- und ACE-Genotyp-Polymorphismen stratifiziert und randomisiert, um entweder genotyp-geleitete Therapie oder Standardversorgung zu erhalten.

Ergebnisse: Patienten, die genotyp-geleitete Therapie erhielten, zeigten signifikant verbesserte Blutdruckkontrolle (p<0,001) und reduzierte unerwünschte Arzneimittelreaktionen (UAW) um 34% im Vergleich zur Kontrollgruppe. Die Zeit bis zum Erreichen des therapeutischen Ziels wurde um durchschnittlich 2,3 Wochen reduziert.

Schlussfolgerung: Pharmakogenomik-geleitete antihypertensive Therapie zeigt Potenzial zur Verbesserung klinischer Ergebnisse bei gleichzeitiger Reduzierung behandlungsbedingter Komplikationen.`
    }
  },
  {
    id: 'legal-contract',
    title: 'Software License Agreement',
    type: 'legal',
    originalLanguage: 'en',
    complexity: 'advanced',
    wordCount: 134,
    content: `SOFTWARE LICENSE AGREEMENT

This Software License Agreement ("Agreement") is entered into between Prism Writing Solutions ("Licensor") and the end user ("Licensee") for the use of proprietary software.

1. GRANT OF LICENSE
Licensor hereby grants Licensee a non-exclusive, non-transferable license to use the Software solely for internal business purposes, subject to the terms and conditions herein.

2. RESTRICTIONS
Licensee shall not: (a) reverse engineer, decompile, or disassemble the Software; (b) distribute, sublicense, or transfer the Software; (c) modify or create derivative works based on the Software.

3. INTELLECTUAL PROPERTY
All intellectual property rights in the Software remain with Licensor. This Agreement does not convey ownership rights but grants only a limited license to use.

4. TERMINATION
This Agreement terminates automatically upon breach of any provision. Upon termination, Licensee must cease all use and destroy all copies of the Software.

5. LIMITATION OF LIABILITY
Licensor's liability shall not exceed the license fees paid by Licensee.`,
    translations: {
      'fr': `CONTRAT DE LICENCE LOGICIELLE

Ce Contrat de Licence Logicielle ("Contrat") est conclu entre Prism Writing Solutions ("Concédant") et l'utilisateur final ("Licencié") pour l'utilisation d'un logiciel propriétaire.

1. OCTROI DE LICENCE
Le Concédant accorde par les présentes au Licencié une licence non exclusive et non transférable pour utiliser le Logiciel uniquement à des fins commerciales internes, sous réserve des termes et conditions énoncés ici.

2. RESTRICTIONS
Le Licencié ne doit pas : (a) faire de l'ingénierie inverse, décompiler ou désassembler le Logiciel ; (b) distribuer, sous-licencier ou transférer le Logiciel ; (c) modifier ou créer des œuvres dérivées basées sur le Logiciel.

3. PROPRIÉTÉ INTELLECTUELLE
Tous les droits de propriété intellectuelle du Logiciel demeurent avec le Concédant. Ce Contrat ne confère pas de droits de propriété mais accorde seulement une licence limitée d'utilisation.

4. RÉSILIATION
Ce Contrat se termine automatiquement en cas de violation de toute disposition. À la résiliation, le Licencié doit cesser toute utilisation et détruire toutes les copies du Logiciel.

5. LIMITATION DE RESPONSABILITÉ
La responsabilité du Concédant ne dépassera pas les frais de licence payés par le Licencié.`,
      'ja': `ソフトウェアライセンス契約

本ソフトウェアライセンス契約（「本契約」）は、Prism Writing Solutions（「ライセンサー」）とエンドユーザー（「ライセンシー」）との間で、専有ソフトウェアの使用に関して締結されます。

1. ライセンスの許諾
ライセンサーは、本契約の条項に従い、内部業務目的のみでソフトウェアを使用する非独占的、譲渡不可能なライセンスをライセンシーに許諾します。

2. 制限事項
ライセンシーは以下を行ってはなりません：(a)ソフトウェアのリバースエンジニアリング、逆コンパイル、または逆アセンブル；(b)ソフトウェアの配布、サブライセンス、または譲渡；(c)ソフトウェアに基づく修正または派生物の作成。

3. 知的財産権
ソフトウェアにおけるすべての知的財産権はライセンサーに帰属します。本契約は所有権を譲渡するものではなく、限定的な使用ライセンスのみを許諾します。

4. 終了
本契約は、条項の違反により自動的に終了します。終了時、ライセンシーはすべての使用を停止し、ソフトウェアのすべての複製を破棄しなければなりません。

5. 責任の制限
ライセンサーの責任は、ライセンシーが支払ったライセンス料を超えません。`
    }
  },
  {
    id: 'marketing-content',
    title: 'Product Launch Campaign',
    type: 'marketing',
    originalLanguage: 'en',
    complexity: 'basic',
    wordCount: 89,
    content: `Introducing the Future of Smart Home Technology!

Transform your living space with our revolutionary new smart home system. Experience seamless automation that learns your preferences and adapts to your lifestyle.

✨ Key Features:
• Voice-activated controls in 50+ languages
• Energy-efficient smart sensors
• Advanced security monitoring
• Mobile app integration
• Easy 30-minute installation

Join over 100,000 satisfied customers worldwide who have already upgraded their homes. Limited time offer: Save 25% on your first purchase!

Ready to make your home smarter? Order now and get FREE installation included!

*Offer valid until supplies last. Terms and conditions apply.`,
    translations: {
      'es': `¡Presentamos el Futuro de la Tecnología del Hogar Inteligente!

Transforma tu espacio de vida con nuestro revolucionario nuevo sistema de hogar inteligente. Experimenta automatización perfecta que aprende tus preferencias y se adapta a tu estilo de vida.

✨ Características Clave:
• Controles activados por voz en más de 50 idiomas
• Sensores inteligentes de eficiencia energética
• Monitoreo avanzado de seguridad
• Integración con aplicación móvil
• Instalación fácil de 30 minutos

Únete a más de 100,000 clientes satisfechos en todo el mundo que ya han actualizado sus hogares. Oferta por tiempo limitado: ¡Ahorra 25% en tu primera compra!

¿Listo para hacer tu hogar más inteligente? ¡Ordena ahora y obtén instalación GRATIS incluida!

*Oferta válida hasta agotar existencias. Se aplican términos y condiciones.`,
      'pt': `Apresentando o Futuro da Tecnologia Casa Inteligente!

Transforme seu espaço de vida com nosso revolucionário novo sistema de casa inteligente. Experimente automação perfeita que aprende suas preferências e se adapta ao seu estilo de vida.

✨ Recursos Principais:
• Controles ativados por voz em mais de 50 idiomas
• Sensores inteligentes de eficiência energética
• Monitoramento avançado de segurança
• Integração com aplicativo móvel
• Instalação fácil de 30 minutos

Junte-se a mais de 100.000 clientes satisfeitos em todo o mundo que já atualizaram suas casas. Oferta por tempo limitado: Economize 25% na sua primeira compra!

Pronto para tornar sua casa mais inteligente? Peça agora e ganhe instalação GRÁTIS incluída!

*Oferta válida enquanto durarem os estoques. Termos e condições se aplicam.`,
      'it': `Presentando il Futuro della Tecnologia Casa Intelligente!

Trasforma il tuo spazio abitativo con il nostro rivoluzionario nuovo sistema casa intelligente. Sperimenta automazione perfetta che impara le tue preferenze e si adatta al tuo stile di vita.

✨ Caratteristiche Principali:
• Controlli attivati dalla voce in oltre 50 lingue
• Sensori intelligenti ad efficienza energetica
• Monitoraggio avanzato della sicurezza
• Integrazione app mobile
• Installazione facile di 30 minuti

Unisciti a oltre 100.000 clienti soddisfatti in tutto il mondo che hanno già aggiornato le loro case. Offerta a tempo limitato: Risparmia il 25% sul tuo primo acquisto!

Pronto a rendere la tua casa più intelligente? Ordina ora e ottieni installazione GRATUITA inclusa!

*Offerta valida fino ad esaurimento scorte. Si applicano termini e condizioni.`
    }
  }
];

export const getDocumentById = (id: string): SampleDocument | undefined => {
  return sampleDocuments.find(doc => doc.id === id);
};

export const getDocumentsByType = (type: SampleDocument['type']): SampleDocument[] => {
  return sampleDocuments.filter(doc => doc.type === type);
};

export const getDocumentsByComplexity = (complexity: SampleDocument['complexity']): SampleDocument[] => {
  return sampleDocuments.filter(doc => doc.complexity === complexity);
};
