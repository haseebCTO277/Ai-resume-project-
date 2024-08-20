import Image from "next/image";
import authorImg from "@/app/blog/_assets/images/authors/mohsin.png";
import aiResumeImg from "@/public/blog/Introducing-magicalresume/magicalresumelogo3.png";

// ==================================================================================================================================================================
// BLOG CATEGORIES 🏷️
// ==================================================================================================================================================================

// These slugs are used to generate pages in the /blog/category/[categoryI].js. It's a way to group articles by category.
const categorySlugs = {
  feature: "feature",
  tutorial: "tutorial",
};

// All the blog categories data display in the /blog/category/[categoryI].js pages.
export const categories = [
  {
    // The slug to use in the URL, from the categorySlugs object above.
    slug: categorySlugs.feature,
    // The title to display the category title (h1), the category badge, the category filter, and more. Less than 60 characters.
    title: "New Features",
    // A short version of the title above, display in small components like badges. 1 or 2 words
    titleShort: "Features",
    // The description of the category to display in the category page. Up to 160 characters.
    description:
      "Discover the latest features we've added to Magical Resume. We're constantly improving our product to help you create stunning resumes faster.",
    // A short version of the description above, only displayed in the <Header /> on mobile. Up to 60 characters.
    descriptionShort: "Latest features added to Magical Resume.",
  },
  {
    slug: categorySlugs.tutorial,
    title: "How Tos & Tutorials",
    titleShort: "Tutorials",
    description:
      "Learn how to use Magical Resume with these step-by-step tutorials. We'll show you how to create professional resumes in no time.",
    descriptionShort:
      "Learn how to use Magical Resume with these step-by-step tutorials.",
  },
];

// ==================================================================================================================================================================
// BLOG AUTHORS 📝
// ==================================================================================================================================================================

// Social icons used in the author's bio.
const socialIcons = {
  twitter: {
    name: "Twitter",
    svg: (
      <svg
        version="1.1"
        id="svg5"
        x="0px"
        y="0px"
        viewBox="0 0 1668.56 1221.19"
        className="w-9 h-9"
        // Using a dark theme? ->  className="w-9 h-9 fill-white"
      >
        <g id="layer1" transform="translate(52.390088,-25.058597)">
          <path
            id="path1009"
            d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99   h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
          />
        </g>
      </svg>
    ),
  },
  linkedin: {
    name: "LinkedIn",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        // Using a dark theme? ->  className="w-6 h-6 fill-white"
        viewBox="0 0 24 24"
      >
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
      </svg>
    ),
  },
  github: {
    name: "GitHub",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        // Using a dark theme? ->  className="w-6 h-6 fill-white"
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
};

// These slugs are used to generate pages in the /blog/author/[authorId].js. It's a way to show all articles from an author.
const authorSlugs = {
  author: "author",
};

// All the blog authors data display in the /blog/author/[authorId].js pages.
export const authors = [
  {
    // The slug to use in the URL, from the authorSlugs object above.
    slug: authorSlugs.author,
    // The name to display in the author's bio. Up to 60 characters.
    name: "Mohsin Alshammari",
    // The job to display in the author's bio. Up to 60 characters.
    job: "Creator of Magical Resume",
    // The description of the author to display in the author's bio. Up to 160 characters.
    description:
      "Mohsin is a developer and entrepreneur. He has built several successful startups and is currently focused on Magical Resume, the ultimate AI-powered resume builder.",
    // The avatar of the author to display in the author's bio and avatar badge. It's better to use a local image, but you can also use an external image (https://...)
    avatar: authorImg,
    // A list of social links to display in the author's bio.
    socials: [
      {
        name: socialIcons.twitter.name,
        icon: socialIcons.twitter.svg,
        url: "https://twitter.com/mohsinbazea",
      },
      {
        name: socialIcons.linkedin.name,
        icon: socialIcons.linkedin.svg,
        url: "https://www.linkedin.com/in/mohsinalshammari/",
      },
      {
        name: socialIcons.github.name,
        icon: socialIcons.github.svg,
        url: "https://github.com/mohsinss",
      },
    ],
  },
];

// ==================================================================================================================================================================
// BLOG ARTICLES 📚
// ==================================================================================================================================================================

// These styles are used in the content of the articles. When you update them, all articles will be updated.
const styles = {
  h2: "text-2xl lg:text-4xl font-bold tracking-tight mb-4 text-base-content",
  h3: "text-xl lg:text-2xl font-bold tracking-tight mb-2 text-base-content",
  p: "text-base-content/90 leading-relaxed",
  ul: "list-inside list-disc text-base-content/90 leading-relaxed",
  li: "list-item",
  // Alternatively, you can use the library react-syntax-highlighter to display code snippets.
  code: "text-sm font-mono bg-neutral text-neutral-content p-6 rounded-box my-4 overflow-x-scroll select-all",
  codeInline:
    "text-sm font-mono bg-base-300 px-1 py-0.5 rounded-box select-all",
};

// All the blog articles data display in the /blog/[articleId].js pages.
export const articles = [
  {
    // The unique slug to use in the URL. It's also used to generate the canonical URL.
    slug: "introducing-ai-resume-builder",
    // The title to display in the article page (h1). Less than 60 characters. It's also used to generate the meta title.
    title: "Introducing AI Resume Builder",
    // The description of the article to display in the article page. Up to 160 characters. It's also used to generate the meta description.
    description:
      "Magical Resume leverages AI to help you create stunning and professional resumes in minutes. Learn more about our latest features!",
    // An array of categories of the article. It's used to generate the category badges, the category filter, and more.
    categories: [
      categories.find((category) => category.slug === categorySlugs.feature),
    ],
    // The author of the article. It's used to generate a link to the author's bio page.
    author: authors.find((author) => author.slug === authorSlugs.author),
    // The date of the article. It's used to generate the meta date.
    publishedAt: "2023-11-20",
    image: {
      // The image to display in <CardArticle /> components.
      src: aiResumeImg,
      // The relative URL of the same image to use in the Open Graph meta tags & the Schema Markup JSON-LD.
      urlRelative: "/blog/introducing-ai-resume/header.jpg",
      alt: "AI Resume Builder and Magical Resume logo combined",
    },
    // The actual content of the article that will be shown under the <h1> title in the article page.
    content: (
      <>
        <Image
          src={aiResumeImg}
          alt="AI Resume Builder and Magical Resume logo combined"
          width={700}
          height={500}
          priority={true}
          className="rounded-box"
          placeholder="blur"
        />
        <section>
          <h2 className={styles.h2}>Introduction</h2>
          <p className={styles.p}>
            Magical Resume leverages AI to help you create stunning and
            professional resumes in minutes. Learn more about our latest
            features!
          </p>
        </section>

        <section>
          <h3 className={styles.h3}>1. Create an account</h3>
          <p className={styles.p}>
            First, go to{" "}
            <a href="https://magicalresume.com/" className="link link-primary">
              Magical Resume
            </a>{" "}
            and create an account. It&apos;s quick and easy.
            <br />
            Then create a new project and start building your resume with our
            AI-powered tools.
          </p>
        </section>

        <section>
          <h3 className={styles.h3}>2. Add your details</h3>
          <p className={styles.p}>
            Input your personal information, work experience, and educational
            background. Our AI will help you format and optimize your resume to
            stand out.
          </p>
        </section>

        <section>
          <h3 className={styles.h3}>3. Download your resume</h3>
          <p className={styles.p}>
            Once you&apos;re satisfied with your resume, you can download it in
            PDF format. It&apos;s that simple!
          </p>
        </section>
      </>
    ),
  },
];
