import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const pageStyle = {
  marginLeft: '20px',
  marginRight: '20px',
};

const titleStyle = {
  fontWeight: 'bold',
  fontSize: '24px',
  marginBottom: '10px'
};

const subtitleStyle = {
  fontWeight: 'bold',
  fontSize: '20px',
  marginTop: '20px',
  marginBottom: '10px'
};

const paragraphStyle = {
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '10px'
};

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <div style={pageStyle}>
          <h2 style={titleStyle}>Terms of Service</h2>
          <p style={paragraphStyle}>Effective Date: May 2024</p>

          <h3 style={subtitleStyle}>Introduction</h3>
          <p style={paragraphStyle}>Welcome to MagicalResum, referred to as &quot;MagicalResum&quot;, &quot;we&quot;, or &quot;us&quot;. This document contains the comprehensive terms and conditions governing the use of magicalresume.com and its associated services, collectively referred to as &quot;the Service&quot;. By accessing or using the Service, you enter into a legally binding contract with MagicalResum. Your use of the Service signifies your agreement to these Terms of Service, and you are encouraged to read them thoroughly to understand your rights and responsibilities.</p>

          <h3 style={subtitleStyle}>Acceptance of Terms</h3>
          <p style={paragraphStyle}>By clicking &quot;I Accept&quot;, accessing, or using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms. This includes agreeing to our Privacy Policy, which outlines how we handle your personal data. If you do not agree with any part of these Terms, you should discontinue the use of our Service immediately.</p>

          <h3 style={subtitleStyle}>1. Service Overview</h3>
          <p style={paragraphStyle}>MagicalResum provides a comprehensive platform for professional resume writing and editing services, designed to enhance your job-seeking experience. Our Service allows for public posting, sharing of information, and interaction with other users. We are committed to maintaining a positive and respectful community and therefore reserve the right to monitor, review, and remove content at our discretion. You are responsible for ensuring that any content you post complies with all applicable laws and these Terms.</p>

          <h3 style={subtitleStyle}>3. Account Registration</h3>
          <p style={paragraphStyle}>To access and use certain features of the Service, you must create an account. When registering, you agree to provide accurate, current, and complete information about yourself as prompted by our registration form. You also agree to update this information to keep it accurate. You are solely responsible for safeguarding the confidentiality of your account information, including your password, and for all activity that occurs under your account. If you suspect any unauthorized use of your account, you must immediately notify us at info@magicalresume.com.</p>

          <h3 style={subtitleStyle}>4. Payment Terms</h3>
          <p style={paragraphStyle}>Our Service may include paid features, such as premium resume writing or editing services. All fees are quoted in U.S. Dollars and must be paid in advance. Fees are non-refundable, except as required by law or as explicitly stated in these Terms. We reserve the right to change our prices at any time. If we change our prices, we will provide advance notice of these changes by posting the new prices on our website or through other communications.</p>

          <h3 style={subtitleStyle}>5. Licenses</h3>
          <p style={paragraphStyle}>Upon your compliance with these Terms, MagicalResum grants you a non-exclusive, non-transferable, revocable license to access and use the Service for your personal, non-commercial purposes. This license does not include any rights to resell or make any commercial use of the Service or any content within the Service, to collect and use any product listings, descriptions, or prices, or to make any derivative use of the Service or its content.</p>

          <h3 style={subtitleStyle}>6. Ownership and Rights</h3>
          <p style={paragraphStyle}>The Service, including all content, features, and functionality, is owned by MagicalResum, its licensors, or other providers of such material and is protected by copyright and other intellectual property laws. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, or exploit for any commercial purposes any part of the Service or related materials, except as may be allowed by these Terms or with our written consent.</p>

          <h3 style={subtitleStyle}>7. Third-Party Terms</h3>
          <p style={paragraphStyle}>Our Service may contain links to third-party websites or services that are not owned or controlled by MagicalResum. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that MagicalResum shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.</p>

          <h3 style={subtitleStyle}>8. User Content</h3>
          <p style={paragraphStyle}>Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material (&quot;User Content&quot;). You are responsible for the User Content that you post on or through the Service, including its legality, reliability, and appropriateness. By posting User Content on the Service, you grant MagicalResum a non-exclusive, worldwide, royalty-free, perpetual, irrevocable license to use, modify, publicly perform, publicly display, reproduce, and distribute such User Content.</p>

          <h3 style={subtitleStyle}>9. Intellectual Property Rights Protection</h3>
          <p style={paragraphStyle}>We respect the intellectual property rights of others and expect our users to do the same. If you believe that your work has been copied in a way that constitutes copyright infringement, or your intellectual property rights have been otherwise violated, please inform us. Provide all necessary information including your contact details, a description of the copyrighted work or other intellectual property that you claim has been infringed, and the location on our Service where the alleged infringing material is located.</p>

          <h3 style={subtitleStyle}>10. Prohibited Conduct</h3>
          <p style={paragraphStyle}>In using our Service, you agree not to engage in conduct that is illegal, deceptive, misleading, or unethical. This includes, but is not limited to, harassment, spreading harmful or offensive content, attempting to exploit or harm minors, infringing on others&apos; intellectual property rights, spamming, transmitting viruses or malicious code, and engaging in any form of illegal or harmful behavior. Violation of these prohibitions may result in the immediate termination of your account and legal action where applicable.</p>

          <h3 style={subtitleStyle}>11. Modification of Terms</h3>
          <p style={paragraphStyle}>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.</p>

          <h3 style={subtitleStyle}>12. Termination and Modification of Service</h3>
          <p style={paragraphStyle}>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability. We also reserve the right to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice at any time.</p>

          <h3 style={subtitleStyle}>13. Indemnity</h3>
          <p style={paragraphStyle}>You agree to defend, indemnify, and hold harmless MagicalResum and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney&apos;s fees), resulting from or arising out of a) your use and access of the Service, by you or any person using your account and password; b) a breach of these Terms, or c) User Content posted on the Service.</p>

          <h3 style={subtitleStyle}>14. Disclaimers; No Warranties</h3>
          <p style={paragraphStyle}>The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. MagicalResum and its suppliers and licensors hereby disclaim all warranties of any kind, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose, and non-infringement. Neither MagicalResum, nor its suppliers and licensors, makes any warranty that the Service will be error-free or that access thereto will be continuous or uninterrupted.</p>

          <h3 style={subtitleStyle}>15. Limitation of Liability</h3>
          <p style={paragraphStyle}>In no event will MagicalResum, or its suppliers or licensors, be liable with respect to any subject matter of these terms under any contract, negligence, strict liability, or other legal or equitable theory for: (i) any special, incidental, or consequential damages; (ii) the cost of procurement for substitute products or services; (iii) for interruption of use or loss or corruption of data. MagicalResum shall have no liability for any failure or delay due to matters beyond their reasonable control.</p>

          <h3 style={subtitleStyle}>16. Dispute Resolution and Arbitration</h3>
          <p style={paragraphStyle}>Any disputes arising out of or relating to these Terms or the use of the Service will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. This arbitration will occur in the State of [Specify State], and the laws of the State of [Specify State] will apply. Both parties agree to submit to the jurisdiction of this venue and waive any objections to the convenience of this forum. Notwithstanding the above, MagicalResum may seek injunctive relief in any court of competent jurisdiction.</p>

          <h3 style={subtitleStyle}>17. Miscellaneous</h3>
          <p style={paragraphStyle}>These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have had between us regarding the Service. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>

          <h3 style={subtitleStyle}>Contact Us</h3>
          <p style={paragraphStyle}>For any questions about these Terms of Service, please contact us at info@magicalresume.com.</p>
        </div>
    
        <div style={pageStyle}>
  <h2 style={titleStyle}>شروط الخدمة</h2>
  <p style={paragraphStyle}>تاريخ السريان: مايو 2024</p>

  <h3 style={subtitleStyle}>مقدمة</h3>
  <p style={paragraphStyle}>مرحبًا بكم في MagicalResum، المشار إليها بـ &quot;MagicalResum&quot;، &quot;نحن&quot;، أو &quot;لنا&quot;. يحتوي هذا المستند على الشروط والأحكام الشاملة التي تحكم استخدام magicalresume.com والخدمات المرتبطة به، المشار إليها مجتمعة بـ &quot;الخدمة&quot;. من خلال الوصول إلى الخدمة أو استخدامها، تدخل في عقد ملزم قانونيًا مع MagicalResum. يشير استخدامك للخدمة إلى موافقتك على شروط الخدمة هذه، ونشجعك على قراءتها بعناية لفهم حقوقك ومسؤولياتك.</p>

  <h3 style={subtitleStyle}>قبول الشروط</h3>
  <p style={paragraphStyle}>من خلال النقر على &quot;أقبل&quot;، أو الوصول إلى، أو استخدام خدمتنا، فإنك تقر بأنك قد قرأت وفهمت وتوافق على الالتزام بهذه الشروط. يشمل ذلك الموافقة على سياسة الخصوصية الخاصة بنا، التي تحدد كيفية التعامل مع بياناتك الشخصية. إذا كنت لا توافق على أي جزء من هذه الشروط، يجب عليك التوقف عن استخدام خدمتنا فورًا.</p>

  <h3 style={subtitleStyle}>1. نظرة عامة على الخدمة</h3>
  <p style={paragraphStyle}>توفر MagicalResum منصة شاملة لكتابة وتحرير السيرة الذاتية المهنية، مصممة لتحسين تجربتك في البحث عن وظيفة. تتيح خدمتنا النشر العام، ومشاركة المعلومات، والتفاعل مع المستخدمين الآخرين. نحن ملتزمون بالحفاظ على مجتمع إيجابي ومحترم، ولذلك نحتفظ بالحق في مراقبة ومراجعة وإزالة المحتوى وفقًا لتقديرنا. أنت مسؤول عن ضمان أن أي محتوى تنشره يتوافق مع جميع القوانين المعمول بها وهذه الشروط.</p>

  <h3 style={subtitleStyle}>3. تسجيل الحساب</h3>
  <p style={paragraphStyle}>للوصول إلى واستخدام بعض ميزات الخدمة، يجب عليك إنشاء حساب. عند التسجيل، توافق على تقديم معلومات دقيقة وحالية وكاملة عن نفسك حسب ما يطلبه نموذج التسجيل الخاص بنا. كما توافق على تحديث هذه المعلومات للحفاظ على دقتها. أنت المسؤول الوحيد عن حماية سرية معلومات حسابك، بما في ذلك كلمة المرور، وعن جميع الأنشطة التي تحدث تحت حسابك. إذا كنت تشك في أي استخدام غير مصرح به لحسابك، يجب عليك إبلاغنا على الفور على info@magicalresume.com.</p>

  <h3 style={subtitleStyle}>4. شروط الدفع</h3>
  <p style={paragraphStyle}>قد تتضمن خدمتنا ميزات مدفوعة، مثل خدمات كتابة أو تحرير السيرة الذاتية المميزة. جميع الرسوم مقدرة بالدولار الأمريكي أو الريال السعودي ويجب دفعها مسبقًا. الرسوم غير قابلة للاسترداد، إلا إذا كان ذلك مطلوبًا بموجب القانون أو كما هو منصوص عليه صراحةً في هذه الشروط. نحتفظ بالحق في تغيير أسعارنا في أي وقت. إذا قمنا بتغيير أسعارنا، سنقدم إشعارًا مسبقًا بهذه التغييرات من خلال نشر الأسعار الجديدة على موقعنا أو من خلال وسائل الاتصال الأخرى.</p>

  <h3 style={subtitleStyle}>5. التراخيص</h3>
  <p style={paragraphStyle}>عند التزامك بهذه الشروط، تمنحك MagicalResum ترخيصًا غير حصري وغير قابل للتحويل وقابل للإلغاء للوصول إلى الخدمة واستخدامها لأغراضك الشخصية وغير التجارية. لا يشمل هذا الترخيص أي حقوق لإعادة بيع أو استخدام الخدمة أو أي محتوى داخل الخدمة لأغراض تجارية، أو جمع واستخدام أي قوائم منتجات أو أوصاف أو أسعار، أو إنشاء أعمال مشتقة من الخدمة أو محتواها.</p>

  <h3 style={subtitleStyle}>6. الملكية والحقوق</h3>
  <p style={paragraphStyle}>الخدمة، بما في ذلك جميع المحتويات والميزات والوظائف، مملوكة لـ MagicalResum، أو مرخصيها، أو مزودي المواد الآخرين وهي محمية بموجب قوانين حقوق النشر وغيرها من قوانين الملكية الفكرية. يجب ألا تقوم بإعادة إنتاج أو توزيع أو تعديل أو إنشاء أعمال مشتقة من، أو عرض علني أو أداء علني، أو استغلال لأي أغراض تجارية أي جزء من الخدمة أو المواد ذات الصلة، إلا كما هو مسموح به في هذه الشروط أو بموافقتنا الكتابية.</p>

  <h3 style={subtitleStyle}>7. شروط الأطراف الثالثة</h3>
  <p style={paragraphStyle}>قد تحتوي خدمتنا على روابط لمواقع أو خدمات تابعة لأطراف ثالثة لا تملكها أو تسيطر عليها MagicalResum. لا نتحكم في، ولا نتحمل أي مسؤولية عن المحتوى أو سياسات الخصوصية أو ممارسات أي مواقع أو خدمات تابعة لأطراف ثالثة. كما تقر وتوافق على أن MagicalResum لن تكون مسؤولة أو ملزمة، بشكل مباشر أو غير مباشر، عن أي ضرر أو خسارة ناتجة أو يُزعم أنها ناتجة عن أو فيما يتعلق باستخدام أو الاعتماد على أي محتوى أو سلع أو خدمات متاحة على أو من خلال أي مواقع أو خدمات من هذا القبيل.</p>

  <h3 style={subtitleStyle}>8. محتوى المستخدم</h3>
  <p style={paragraphStyle}>قد تتيح لك خدمتنا نشر أو ربط أو تخزين أو مشاركة أو إتاحة بعض المعلومات أو النصوص أو الرسومات أو الفيديوهات أو المواد الأخرى (&quot;محتوى المستخدم&quot;). أنت مسؤول عن محتوى المستخدم الذي تنشره على أو من خلال الخدمة، بما في ذلك قانونيته وموثوقيته وملاءمته. من خلال نشر محتوى المستخدم على الخدمة، تمنح MagicalResum ترخيصًا غير حصري وعالمي وخالي من حقوق الملكية ودائم وغير قابل للإلغاء لاستخدام وتعديل وأداء علني وعرض علني وإعادة إنتاج وتوزيع هذا المحتوى.</p>

  <h3 style={subtitleStyle}>9. حماية حقوق الملكية الفكرية</h3>
  <p style={paragraphStyle}>نحن نحترم حقوق الملكية الفكرية للآخرين ونتوقع من مستخدمينا أن يفعلوا الشيء نفسه. إذا كنت تعتقد أن عملك قد تم نسخه بطريقة تشكل انتهاكًا لحقوق الطبع والنشر، أو أن حقوق الملكية الفكرية الخاصة بك قد انتهكت بطريقة أخرى، يرجى إبلاغنا. قدم جميع المعلومات الضرورية بما في ذلك تفاصيل الاتصال الخاصة بك، ووصف العمل المحمي بحقوق الطبع والنشر أو الملكية الفكرية الأخرى التي تدعي أنها انتهكت، وموقع المواد المزعومة على خدمتنا.</p>

  <h3 style={subtitleStyle}>10. السلوك المحظور</h3>
  <p style={paragraphStyle}>باستخدام خدمتنا، توافق على عدم الانخراط في سلوك غير قانوني أو خادع أو مضلل أو غير أخلاقي. يشمل ذلك، على سبيل المثال لا الحصر، التحرش، نشر محتوى ضار أو مسيء، محاولة استغلال أو إيذاء القاصرين، انتهاك حقوق الملكية الفكرية للآخرين، إرسال الرسائل غير المرغوب فيها، نقل الفيروسات أو الشيفرات الضارة، والانخراط في أي شكل من أشكال السلوك غير القانوني أو الضار. قد يؤدي انتهاك هذه المحظورات إلى الإنهاء الفوري لحسابك واتخاذ الإجراءات القانونية حيثما كان ذلك مناسبًا.</p>

  <h3 style={subtitleStyle}>11. تعديل الشروط</h3>
  <p style={paragraphStyle}>نحتفظ بالحق، وفقًا لتقديرنا المطلق، في تعديل أو استبدال هذه الشروط في أي وقت. إذا كان التعديل جوهريًا، سنقدم إشعارًا لمدة لا تقل عن 30 يومًا قبل أن تصبح الشروط الجديدة سارية المفعول. سيتم تحديد ما يشكل تغييرًا جوهريًا وفقًا لتقديرنا المطلق. من خلال الاستمرار في الوصول إلى خدمتنا أو استخدامها بعد سريان هذه التعديلات، توافق على الالتزام بالشروط المعدلة. إذا كنت لا توافق على الشروط الجديدة، لم تعد مصرحًا لك باستخدام الخدمة.</p>

  <h3 style={subtitleStyle}>12. إنهاء وتعديل الخدمة</h3>
  <p style={paragraphStyle}>قد نقوم بإنهاء أو تعليق حسابك ومنع الوصول إلى الخدمة فورًا، دون إشعار مسبق أو مسؤولية، لأي سبب من الأسباب، بما في ذلك على سبيل المثال لا الحصر إذا قمت بخرق الشروط. تظل جميع أحكام الشروط التي يجب أن تستمر بطبيعتها بعد الإنهاء سارية بعد الإنهاء، بما في ذلك، على سبيل المثال لا الحصر، أحكام الملكية، وإخلاء المسؤولية عن الضمانات، والتعويض، وحدود المسؤولية. نحتفظ أيضًا بالحق في تعديل أو إيقاف، مؤقتًا أو دائمًا، الخدمة (أو أي جزء منها) بإشعار أو بدون إشعار في أي وقت.</p>

  <h3 style={subtitleStyle}>13. التعويض</h3>
  <p style

={paragraphStyle}>أنت توافق على الدفاع عن وتعويض وحماية MagicalResum ومرخصيها ومرخصيهم وموظفيهم ومقاوليهم ووكلائهم ومسؤوليهم ومديريهم من وضد أي وجميع المطالبات والأضرار والالتزامات والخسائر والتكاليف أو الديون والنفقات (بما في ذلك على سبيل المثال لا الحصر أتعاب المحاماة) الناجمة عن أو المتعلقة بـ (أ) استخدامك ووصولك إلى الخدمة، من قبلك أو أي شخص يستخدم حسابك وكلمة مرورك؛ (ب) خرقك لهذه الشروط، أو (ج) محتوى المستخدم المنشور على الخدمة.</p>

  <h3 style={subtitleStyle}>14. إخلاء المسؤولية؛ عدم وجود ضمانات</h3>
  <p style={paragraphStyle}>تُقدم الخدمة على أساس &quot;كما هي&quot; و&quot;كما هي متاحة&quot;. تتنصل MagicalResum وموردوها ومرخصوها بموجب هذا من جميع الضمانات من أي نوع، سواء كانت صريحة أو ضمنية، بما في ذلك، على سبيل المثال لا الحصر، ضمانات القابلية للتسويق، والملاءمة لغرض معين، وعدم الانتهاك. لا تضمن MagicalResum، ولا مورديها ومرخصوها، أن تكون الخدمة خالية من الأخطاء أو أن الوصول إليها سيكون مستمرًا أو غير منقطع.</p>

  <h3 style={subtitleStyle}>15. تحديد المسؤولية</h3>
  <p style={paragraphStyle}>لن تكون MagicalResum، أو مورديها أو مرخصوها، مسؤولة بأي حال من الأحوال عن أي موضوع من هذه الشروط بموجب أي عقد، إهمال، مسؤولية صارمة، أو نظرية قانونية أو إنصافية أخرى لـ: (i) أي أضرار خاصة أو عرضية أو تبعية؛ (ii) تكلفة الحصول على المنتجات أو الخدمات البديلة؛ (iii) انقطاع الاستخدام أو فقدان أو تلف البيانات. لن تكون MagicalResum مسؤولة عن أي فشل أو تأخير بسبب أمور خارجة عن سيطرتهم المعقولة.</p>

  <h3 style={subtitleStyle}>16. حل النزاعات والتحكيم</h3>
  <p style={paragraphStyle}>أي نزاعات تنشأ عن أو تتعلق بهذه الشروط أو استخدام الخدمة سيتم حلها من خلال التحكيم الملزم وفقًا لقواعد جمعية التحكيم الأمريكية. سيحدث هذا التحكيم في ولاية [حدد الولاية]، وستطبق قوانين ولاية [حدد الولاية]. يوافق كلا الطرفين على الخضوع لسلطة هذا المكان والتنازل عن أي اعتراضات على ملاءمة هذا المنتدى. على الرغم من ما سبق، قد تسعى MagicalResum إلى الحصول على تعويض قضائي في أي محكمة ذات اختصاص قضائي.</p>

  <h3 style={subtitleStyle}>17. متنوع</h3>
  <p style={paragraphStyle}>تشكل هذه الشروط الاتفاقية الكاملة بيننا بخصوص خدمتنا وتستبدل وتحل محل أي اتفاقيات سابقة قد تكون لدينا بخصوص الخدمة. إذا تم اعتبار أي حكم من هذه الشروط غير صالح أو غير قابل للتنفيذ من قبل محكمة، تظل الأحكام المتبقية من هذه الشروط سارية المفعول.</p>

  <h3 style={subtitleStyle}>اتصل بنا</h3>
  <p style={paragraphStyle}>لأي أسئلة حول شروط الخدمة هذه، يرجى الاتصال بنا على info@magicalresume.com.</p>
</div>

        <div style={pageStyle}>
  <h2 style={titleStyle}>Conditions d&apos;utilisation</h2>
  <p style={paragraphStyle}>Date d&apos;effet : May 2024</p>

  <h3 style={subtitleStyle}>Introduction</h3>
  <p style={paragraphStyle}>Bienvenue chez MagicalResum, désigné sous le nom de &quot;MagicalResum&quot;, &quot;nous&quot;, ou &quot;notre&quot;. Ce document contient les termes et conditions complets régissant l&apos;utilisation de magicalresume.com et de ses services associés, collectivement appelés &quot;le Service&quot;. En accédant ou en utilisant le Service, vous concluez un contrat juridiquement contraignant avec MagicalResum. Votre utilisation du Service signifie votre accord avec ces Conditions d&apos;utilisation, et vous êtes encouragé à les lire attentivement pour comprendre vos droits et responsabilités.</p>

  <h3 style={subtitleStyle}>Acceptation des conditions</h3>
  <p style={paragraphStyle}>En cliquant sur &quot;J&apos;accepte&quot;, en accédant à ou en utilisant notre Service, vous reconnaissez avoir lu, compris et accepté d&apos;être lié par ces Conditions. Cela inclut l&apos;acceptation de notre Politique de confidentialité, qui décrit comment nous traitons vos données personnelles. Si vous n&apos;êtes pas d&apos;accord avec une partie de ces Conditions, vous devez cesser immédiatement d&apos;utiliser notre Service.</p>

  <h3 style={subtitleStyle}>1. Aperçu du service</h3>
  <p style={paragraphStyle}>MagicalResum fournit une plateforme complète pour la rédaction et l&apos;édition de CV professionnels, conçue pour améliorer votre expérience de recherche d&apos;emploi. Notre Service permet la publication publique, le partage d&apos;informations et l&apos;interaction avec d&apos;autres utilisateurs. Nous nous engageons à maintenir une communauté positive et respectueuse et nous nous réservons donc le droit de surveiller, revoir et supprimer du contenu à notre discrétion. Vous êtes responsable de vous assurer que tout contenu que vous publiez est conforme à toutes les lois applicables et à ces Conditions.</p>

  <h3 style={subtitleStyle}>3. Inscription de compte</h3>
  <p style={paragraphStyle}>Pour accéder à certaines fonctionnalités du Service et les utiliser, vous devez créer un compte. En vous inscrivant, vous acceptez de fournir des informations exactes, actuelles et complètes vous concernant, comme demandé par notre formulaire d&apos;inscription. Vous acceptez également de mettre à jour ces informations pour les garder exactes. Vous êtes seul responsable de la confidentialité de vos informations de compte, y compris votre mot de passe, et de toutes les activités qui se produisent sous votre compte. Si vous suspectez une utilisation non autorisée de votre compte, vous devez nous en informer immédiatement à info@magicalresume.com.</p>

  <h3 style={subtitleStyle}>4. Conditions de paiement</h3>
  <p style={paragraphStyle}>Notre Service peut inclure des fonctionnalités payantes, telles que des services premium de rédaction ou d&apos;édition de CV. Tous les frais sont indiqués en dollars américains et doivent être payés à l&apos;avance. Les frais ne sont pas remboursables, sauf si la loi l&apos;exige ou comme expressément indiqué dans ces Conditions. Nous nous réservons le droit de modifier nos prix à tout moment. Si nous modifions nos prix, nous fournirons un préavis de ces changements en publiant les nouveaux prix sur notre site web ou par d&apos;autres communications.</p>

  <h3 style={subtitleStyle}>5. Licences</h3>
  <p style={paragraphStyle}>Sous réserve de votre conformité à ces Conditions, MagicalResum vous accorde une licence non exclusive, non transférable et révocable pour accéder au Service et l&apos;utiliser à des fins personnelles et non commerciales. Cette licence n&apos;inclut aucun droit de revendre ou d&apos;utiliser le Service ou tout contenu au sein du Service à des fins commerciales, de collecter et d&apos;utiliser des listes de produits, des descriptions ou des prix, ou de faire un usage dérivé du Service ou de son contenu.</p>

  <h3 style={subtitleStyle}>6. Propriété et droits</h3>
  <p style={paragraphStyle}>Le Service, y compris tous les contenus, fonctionnalités et fonctionnalités, est la propriété de MagicalResum, de ses concédants de licence ou d&apos;autres fournisseurs de tels matériaux et est protégé par les lois sur les droits d&apos;auteur et autres lois sur la propriété intellectuelle. Vous ne devez pas reproduire, distribuer, modifier, créer des œuvres dérivées de, afficher publiquement, exécuter publiquement, ou exploiter à des fins commerciales toute partie du Service ou des matériaux connexes, sauf si cela est autorisé par ces Conditions ou avec notre consentement écrit.</p>

  <h3 style={subtitleStyle}>7. Conditions des tiers</h3>
  <p style={paragraphStyle}>Notre Service peut contenir des liens vers des sites web ou des services de tiers qui ne sont pas détenus ou contrôlés par MagicalResum. Nous n&apos;avons aucun contrôle sur, et n&apos;assumons aucune responsabilité pour, le contenu, les politiques de confidentialité ou les pratiques de tout site web ou service de tiers. Vous reconnaissez et acceptez également que MagicalResum ne sera pas responsable ou tenue, directement ou indirectement, de tout dommage ou perte causé ou prétendument causé par ou en relation avec l&apos;utilisation de ou la confiance en tout contenu, bien ou service disponible sur ou via de tels sites web ou services.</p>

  <h3 style={subtitleStyle}>8. Contenu utilisateur</h3>
  <p style={paragraphStyle}>Notre Service peut vous permettre de publier, lier, stocker, partager et rendre disponible certaines informations, textes, graphiques, vidéos ou autres matériaux (&quot;Contenu utilisateur&quot;). Vous êtes responsable du Contenu utilisateur que vous publiez sur ou via le Service, y compris sa légalité, sa fiabilité et son adéquation. En publiant du Contenu utilisateur sur le Service, vous accordez à MagicalResum une licence non exclusive, mondiale, sans redevance, perpétuelle et irrévocable pour utiliser, modifier, exécuter publiquement, afficher publiquement, reproduire et distribuer ce Contenu utilisateur.</p>

  <h3 style={subtitleStyle}>9. Protection des droits de propriété intellectuelle</h3>
  <p style={paragraphStyle}>Nous respectons les droits de propriété intellectuelle des autres et nous attendons de nos utilisateurs qu&apos;ils fassent de même. Si vous pensez que votre travail a été copié d&apos;une manière qui constitue une violation des droits d&apos;auteur, ou que vos droits de propriété intellectuelle ont été violés de toute autre manière, veuillez nous en informer. Fournissez toutes les informations nécessaires, y compris vos coordonnées, une description de l&apos;œuvre protégée par des droits d&apos;auteur ou de la propriété intellectuelle que vous prétendez avoir été violée, et l&apos;emplacement sur notre Service où se trouve le matériel présumé enfreignant.</p>

  <h3 style={subtitleStyle}>10. Conduite interdite</h3>
  <p style={paragraphStyle}>En utilisant notre Service, vous acceptez de ne pas vous engager dans une conduite illégale, trompeuse, mensongère ou contraire à l&apos;éthique. Cela inclut, mais sans s&apos;y limiter, le harcèlement, la diffusion de contenu nuisible ou offensant, la tentative d&apos;exploiter ou de nuire aux mineurs, la violation des droits de propriété intellectuelle des autres, le spamming, la transmission de virus ou de code malveillant, et l&apos;engagement dans toute forme de comportement illégal ou nuisible. La violation de ces interdictions peut entraîner la résiliation immédiate de votre compte et des poursuites judiciaires le cas échéant.</p>

  <h3 style={subtitleStyle}>11. Modification des conditions</h3>
  <p style={paragraphStyle}>Nous nous réservons le droit, à notre seule discrétion, de modifier ou de remplacer ces Conditions à tout moment. Si une révision est importante, nous fournirons un préavis d&apos;au moins 30 jours avant que les nouvelles conditions ne prennent effet. Ce qui constitue une modification importante sera déterminé à notre seule discrétion. En continuant à accéder à ou à utiliser notre Service après l&apos;entrée en vigueur de ces révisions, vous acceptez d&apos;être lié par les conditions révisées. Si vous n&apos;acceptez pas les nouvelles conditions, vous n&apos;êtes plus autorisé à utiliser le Service.</p>

  <h3 style={subtitleStyle}>12. Résiliation et modification du service</h3>
  <p style={paragraphStyle}>Nous pouvons résilier ou suspendre votre compte et empêcher l&apos;accès au Service immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris, mais sans s&apos;y limiter, si vous enfreignez les Conditions. Toutes les dispositions des Conditions qui, de par leur nature, devraient survivre à la résiliation resteront en vigueur après la résiliation, y compris, sans limitation, les dispositions de propriété, les clauses de non-responsabilité, l&apos;indemnisation et les limitations de responsabilité. Nous nous réservons également le droit de modifier ou d&apos;interrompre, temporairement ou définitivement, le Service (ou toute partie de celui-ci) avec ou sans préavis à tout moment.</p>

  <h3 style={subtitleStyle}>13. Indemnité</h3>
  <p style={paragraphStyle}>Vous acceptez de défendre, d&apos;indemniser et de dégager de toute responsabilité MagicalResum et ses licenciés et concédants de licence, ainsi que leurs employés, entrepreneurs, agents, officiers et directeurs, de et contre toute réclamation, tout dommage, toute obligation, toute perte, toute responsabilité, tout coût ou toute dette, et toute dépense (y compris, mais sans s&apos;y limiter, les honoraires d&apos;avocat) résultant de ou liée à (a) votre utilisation et accès au Service, par vous ou toute personne utilisant votre compte et votre mot de passe ; (b) une violation de ces Conditions, ou (c) le Contenu utilisateur publié sur le Service.</p>

  <h3 style={subtitleStyle}>14. Exonérations de responsabilité ; absence de garanties</h3>
  <p style={paragraphStyle}>Le Service est fourni sur une base &quot;EN L&apos;ÉTAT&quot; et &quot;SELON DISPONIBILITÉ&quot;. MagicalResum et ses fournisseurs et concédants de licence déclinent par la présente toute garantie de quelque nature que ce soit, expresse ou implicite, y compris, mais sans s&apos;y limiter, les garanties de qualité marchande, d&apos;adéquation à un usage particulier et de non-violation. Ni MagicalResum, ni ses fournisseurs et concédants de licence, ne garantissent que le Service sera exempt d&apos;erreurs ou que l&apos;accès y sera continu ou ininterrompu.</p>

  <h3 style={subtitleStyle}>15. Limitation de responsabilité</h3>
  <p style={paragraphStyle}>En aucun cas MagicalResum, ou ses fournisseurs ou concédants de licence, ne seront responsables de tout sujet de ces Conditions en vertu de tout contrat, négligence, responsabilité stricte ou autre théorie légale ou équitable pour : (i) tout dommage spécial, accidentel ou consécutif ; (ii) le coût de l&apos;acquisition de produits ou services de substitution ; (iii) pour l&apos;interruption de l&apos;utilisation ou la perte ou la corruption de données. MagicalResum ne sera pas responsable de tout échec ou retard dû à des causes indépendantes de leur volonté raisonnable.</p>

  <h3 style={subtitleStyle}>16. Résolution des litiges et arbitrage</h3>
  <p style={paragraphStyle}>Tout litige découlant de ou lié à ces Conditions ou à l&apos;utilisation du Service sera résolu par arbitrage contraignant conformément aux règles de l&apos;American Arbitration Association. Cet arbitrage aura lieu dans l&apos;État de [Spécifiez l&apos;État], et les lois de l&apos;État de [Spécifiez l&apos;État] s&apos;appliqueront. Les deux parties acceptent de se soumettre à la juridiction de ce lieu et renoncent à toute objection concernant la commodité de ce forum. Nonobstant ce qui précède, MagicalResum peut demander une injonction dans tout tribunal compétent.</p>

  <h3 style={subtitleStyle}>17. Divers</h3>
  <p style={paragraphStyle}>Ces Conditions constituent l&apos;intégralité de l&apos;accord entre nous concernant notre Service et remplacent et annulent tout accord antérieur que nous aurions pu avoir concernant le Service. Si une disposition de ces Conditions est jugée invalide ou inapplicable par un tribunal, les dispositions restantes de ces Conditions resteront en vigueur.</p>

  <h3 style={subtitleStyle}>Contactez-nous</h3>
  <p style={paragraphStyle}>Pour toute question concernant ces Conditions d&apos;utilisation, veuillez nous contacter à info@magicalresume.com.</p>
</div>


<div style={pageStyle}>
  <h2 style={titleStyle}>Términos de Servicio</h2>
  <p style={paragraphStyle}>Fecha de Vigencia: May 2024</p>

  <h3 style={subtitleStyle}>Introducción</h3>
  <p style={paragraphStyle}>Bienvenido a MagicalResum, referido como &quot;MagicalResum&quot;, &quot;nosotros&quot; o &quot;nuestro&quot;. Este documento contiene los términos y condiciones completos que rigen el uso de magicalresume.com y sus servicios asociados, denominados colectivamente como &quot;el Servicio&quot;. Al acceder o usar el Servicio, usted entra en un contrato legalmente vinculante con MagicalResum. El uso del Servicio significa su aceptación de estos Términos de Servicio, y le recomendamos que los lea detenidamente para comprender sus derechos y responsabilidades.</p>

  <h3 style={subtitleStyle}>Aceptación de los Términos</h3>
  <p style={paragraphStyle}>Al hacer clic en &quot;Acepto&quot;, acceder o usar nuestro Servicio, usted reconoce que ha leído, entendido y acepta estar sujeto a estos Términos. Esto incluye aceptar nuestra Política de Privacidad, que describe cómo manejamos sus datos personales. Si no está de acuerdo con alguna parte de estos Términos, debe dejar de usar nuestro Servicio de inmediato.</p>

  <h3 style={subtitleStyle}>1. Descripción del Servicio</h3>
  <p style={paragraphStyle}>MagicalResum proporciona una plataforma integral para servicios profesionales de redacción y edición de currículums, diseñada para mejorar su experiencia en la búsqueda de empleo. Nuestro Servicio permite la publicación pública, el intercambio de información y la interacción con otros usuarios. Nos comprometemos a mantener una comunidad positiva y respetuosa, por lo que nos reservamos el derecho de monitorear, revisar y eliminar contenido a nuestra discreción. Usted es responsable de garantizar que cualquier contenido que publique cumpla con todas las leyes aplicables y estos Términos.</p>

  <h3 style={subtitleStyle}>3. Registro de Cuenta</h3>
  <p style={paragraphStyle}>Para acceder y usar ciertas funciones del Servicio, debe crear una cuenta. Al registrarse, usted acepta proporcionar información precisa, actual y completa sobre usted según lo solicitado por nuestro formulario de registro. También acepta actualizar esta información para mantenerla precisa. Usted es el único responsable de proteger la confidencialidad de su información de cuenta, incluida su contraseña, y de toda la actividad que ocurra bajo su cuenta. Si sospecha de cualquier uso no autorizado de su cuenta, debe notificarnos de inmediato a info@magicalresume.com.</p>

  <h3 style={subtitleStyle}>4. Términos de Pago</h3>
  <p style={paragraphStyle}>Nuestro Servicio puede incluir funciones de pago, como servicios premium de redacción o edición de currículums. Todas las tarifas se cotizan en dólares estadounidenses y deben pagarse por adelantado. Las tarifas no son reembolsables, excepto según lo exija la ley o según se indique expresamente en estos Términos. Nos reservamos el derecho de cambiar nuestros precios en cualquier momento. Si cambiamos nuestros precios, proporcionaremos un aviso previo de estos cambios publicando los nuevos precios en nuestro sitio web o a través de otras comunicaciones.</p>

  <h3 style={subtitleStyle}>5. Licencias</h3>
  <p style={paragraphStyle}>Al cumplir con estos Términos, MagicalResum le otorga una licencia no exclusiva, intransferible y revocable para acceder y usar el Servicio para sus fines personales y no comerciales. Esta licencia no incluye ningún derecho para revender o utilizar el Servicio o cualquier contenido dentro del Servicio para fines comerciales, recopilar y utilizar listados de productos, descripciones o precios, o hacer un uso derivado del Servicio o su contenido.</p>

  <h3 style={subtitleStyle}>6. Propiedad y Derechos</h3>
  <p style={paragraphStyle}>El Servicio, incluidos todos los contenidos, funciones y funcionalidades, es propiedad de MagicalResum, sus licenciantes u otros proveedores de dicho material y está protegido por derechos de autor y otras leyes de propiedad intelectual. No debe reproducir, distribuir, modificar, crear obras derivadas, exhibir públicamente, ejecutar públicamente ni explotar con fines comerciales ninguna parte del Servicio o materiales relacionados, excepto según lo permitido por estos Términos o con nuestro consentimiento por escrito.</p>

  <h3 style={subtitleStyle}>7. Términos de Terceros</h3>
  <p style={paragraphStyle}>Nuestro Servicio puede contener enlaces a sitios web o servicios de terceros que no son propiedad ni están controlados por MagicalResum. No tenemos control sobre, y no asumimos ninguna responsabilidad por, el contenido, las políticas de privacidad o las prácticas de sitios web o servicios de terceros. Usted reconoce y acepta que MagicalResum no será responsable, directa o indirectamente, de ningún daño o pérdida causada o supuestamente causada por o en conexión con el uso o la confianza en cualquier contenido, bienes o servicios disponibles en o a través de dichos sitios web o servicios.</p>

  <h3 style={subtitleStyle}>8. Contenido del Usuario</h3>
  <p style={paragraphStyle}>Nuestro Servicio puede permitirle publicar, vincular, almacenar, compartir y poner a disposición cierta información, texto, gráficos, videos u otros materiales (&quot;Contenido del Usuario&quot;). Usted es responsable del Contenido del Usuario que publique en o a través del Servicio, incluida su legalidad, fiabilidad y adecuación. Al publicar Contenido del Usuario en el Servicio, usted otorga a MagicalResum una licencia no exclusiva, mundial, libre de regalías, perpetua e irrevocable para usar, modificar, ejecutar públicamente, exhibir públicamente, reproducir y distribuir dicho Contenido del Usuario.</p>

  <h3 style={subtitleStyle}>9. Protección de los Derechos de Propiedad Intelectual</h3>
  <p style={paragraphStyle}>Respetamos los derechos de propiedad intelectual de otros y esperamos que nuestros usuarios hagan lo mismo. Si cree que su trabajo ha sido copiado de una manera que constituye una infracción de derechos de autor, o que sus derechos de propiedad intelectual han sido violados de alguna otra manera, infórmenos. Proporcione toda la información necesaria, incluida su información de contacto, una descripción del trabajo protegido por derechos de autor u otra propiedad intelectual que afirma que se ha infringido, y la ubicación en nuestro Servicio donde se encuentra el material presuntamente infractor.</p>

  <h3 style={subtitleStyle}>10. Conducta Prohibida</h3>
  <p style={paragraphStyle}>Al usar nuestro Servicio, usted acepta no participar en conductas que sean ilegales, engañosas, fraudulentas o poco éticas. Esto incluye, pero no se limita a, acoso, difusión de contenido dañino u ofensivo, intento de explotar o dañar a menores, infracción de los derechos de propiedad intelectual de otros, envío de spam, transmisión de virus o código malicioso, y participación en cualquier forma de comportamiento ilegal o dañino. La violación de estas prohibiciones puede resultar en la terminación inmediata de su cuenta y acciones legales donde sea aplicable.</p>

  <h3 style={subtitleStyle}>11. Modificación de los Términos</h3>
  <p style={paragraphStyle}>Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es material, proporcionaremos al menos 30 días de aviso antes de que los nuevos términos entren en vigencia. Lo que constituye un cambio material se determinará a nuestra sola discreción. Al continuar accediendo o utilizando nuestro Servicio después de que esas revisiones entren en vigor, usted acepta estar sujeto a los términos revisados. Si no está de acuerdo con los nuevos términos, ya no está autorizado a usar el Servicio.</p>

  <h3 style={subtitleStyle}>12. Terminación y Modificación del Servicio</h3>
  <p style={paragraphStyle}>Podemos terminar o suspender su cuenta y prohibir el acceso al Servicio de inmediato, sin previo aviso ni responsabilidad, por cualquier motivo, incluidos, entre otros, si usted incumple los Términos. Todas las disposiciones de los Términos que, por su naturaleza, deberían sobrevivir a la terminación seguirán en vigor después de la terminación, incluidas, entre otras, las disposiciones de propiedad, renuncias de garantías, indemnización y limitaciones de responsabilidad. También nos reservamos el derecho de modificar o descontinuar, temporal o permanentemente, el Servicio (o cualquier parte del mismo) con o sin previo aviso en cualquier momento.</p>

  <h3 style={subtitleStyle}>13. Indemnización</h3>
  <p style={paragraphStyle}>Usted acepta defender, indemnizar y eximir de responsabilidad a MagicalResum y sus licenciantes y licenciadores, y a sus empleados, contratistas, agentes, oficiales y directores, de y contra cualquier y todas las reclamaciones, daños, obligaciones, pérdidas, responsabilidades, costos o deudas, y gastos (incluidos, entre otros, los honorarios de abogados) que resulten de o surjan de (a) su uso y acceso al Servicio, por usted o cualquier persona que use su cuenta y contraseña; (b) una violación de estos Términos, o (c) Contenido del Usuario publicado en el Servicio.</p>

  <h3 style={subtitleStyle}>14. Renuncias de Responsabilidad; No Garantías</h3>
  <p style={paragraphStyle}>El Servicio se proporciona &quot;TAL CUAL&quot; y &quot;SEGÚN DISPONIBILIDAD&quot;. MagicalResum y sus proveedores y licenciadores renuncian por la presente a todas las garantías de cualquier tipo, expresas o implícitas, incluidas, entre otras, las garantías de comerciabilidad, idoneidad para un propósito particular y no infracción. Ni MagicalResum ni sus proveedores y licenciadores garantizan que el Servicio estará libre de errores o que el acceso al mismo será continuo o ininterrumpido.</p>

  <h3 style={subtitleStyle}>15. Limitación de Responsabilidad</h3>
  <p style={paragraphStyle}>En ningún caso MagicalResum, ni sus proveedores ni licenciadores, serán responsables con respecto a cualquier asunto de estos términos bajo cualquier contrato, negligencia, responsabilidad estricta u otra teoría legal o equitativa por: (i) cualquier daño especial, incidental o consecuente; (ii) el costo de adquisición de productos o servicios sustitutos; (iii) por la interrupción del uso o la pérdida o corrupción de datos. MagicalResum no tendrá ninguna responsabilidad por cualquier falla o demora debido a asuntos fuera de su control razonable.</p>

  <h3 style={subtitleStyle}>16. Resolución de Disputas y Arbitraje</h3>
  <p style={paragraphStyle}>Cualquier disputa que surja de o en relación con estos Términos o el uso del Servicio se resolverá mediante arbitraje vinculante de acuerdo con las reglas de la American Arbitration Association. Este arbitraje se llevará a cabo en el Estado de [Especificar Estado], y se aplicarán las leyes del Estado de [Especificar Estado]. Ambas partes aceptan someterse a la jurisdicción de este lugar y renuncian a cualquier objeción sobre la conveniencia de este foro. No obstante lo anterior, MagicalResum puede buscar una medida cautelar en cualquier tribunal de jurisdicción competente.</p>

  <h3 style={subtitleStyle}>17. Varios</h3>
  <p style={paragraphStyle}>Estos Términos constituyen el acuerdo completo entre nosotros con respecto a nuestro Servicio y reemplazan y reemplazan cualquier acuerdo anterior que pudiéramos tener entre nosotros con respecto al Servicio. Si alguna disposición de estos Términos se considera inválida o inaplicable por un tribunal, las disposiciones restantes de estos Términos seguirán en vigor.</p>

  <h3 style={subtitleStyle}>Contáctenos</h3>
  <p style={paragraphStyle}>Si tiene alguna pregunta sobre estos Términos de Servicio, contáctenos en info@magicalresume.com.</p>
</div>

      </div>
    </main>
  );
};

export default TOS;