import blogContent from './blogContent.json';
import Image from "next/image";
import { nanoid } from "nanoid";

// Import images
import authorImg from "@/app/blog/_assets/images/authors/mohsin.png";
import aiResumeImg from "@/public/blog/Introducing-magicalresume/magicalresumelogo3.png";

export const categorySlugs = blogContent.categorySlugs;
export const categories = blogContent.categories;
export const authorSlugs = blogContent.authorSlugs;
export const styles = blogContent.styles;

// Process authors to add images and social icons
export const authors = blogContent.authors.map(author => ({
  ...author,
  avatar: author.slug === 'author' ? authorImg : author.avatar,
  socials: author.socials.map(social => ({
    ...social,
    icon: getSocialIcon(social.name)
  }))
}));

// Process articles to add images and convert content to JSX
export const articles = blogContent.articles.map(article => ({
  ...article,
  id: nanoid(),
  image: {
    ...article.image,
    src: article.slug === "introducing-ai-resume-builder" ? aiResumeImg : article.image.src
  },
  content: convertContentToJSX(article.content),
  categories: article.categories.map(categorySlug => 
    categories.find(category => category.slug === categorySlug)
  ),
  author: authors.find(author => author.slug === article.author)
}));

// Helper function to get social icons
function getSocialIcon(name) {
  switch (name.toLowerCase()) {
    case 'twitter':
      return (
        <svg
          version="1.1"
          id="svg5"
          x="0px"
          y="0px"
          viewBox="0 0 1668.56 1221.19"
          className="w-9 h-9"
        >
          <g id="layer1" transform="translate(52.390088,-25.058597)">
            <path
              id="path1009"
              d="M283.94,167.31l386.39,516.64L281.5,1104h87.51l340.42-367.76L984.48,1104h297.8L874.15,558.3l361.92-390.99   h-87.51l-313.51,338.7l-253.31-338.7H283.94z M412.63,231.77h136.81l604.13,807.76h-136.81L412.63,231.77z"
            />
          </g>
        </svg>
      );
    case 'linkedin':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
        >
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      );
    case 'github':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    default:
      return null;
  }
}

// Helper function to convert content array to JSX
function convertContentToJSX(content) {
  return (
    <>
      {content.map((section, index) => (
        <section key={index}>
          {section.content.map((item, itemIndex) => {
            switch (item.type) {
              case 'h2':
                return <h2 key={itemIndex} className={styles.h2}>{item.content}</h2>;
              case 'h3':
                return <h3 key={itemIndex} className={styles.h3}>{item.content}</h3>;
              case 'h4':
                return <h4 key={itemIndex} className={styles.h4}>{item.content}</h4>;
              case 'p':
                return <p key={itemIndex} className={styles.p} dangerouslySetInnerHTML={{ __html: item.content }} />;
              case 'ul':
                return (
                  <ul key={itemIndex} className={styles.ul}>
                    {item.content.map((li, liIndex) => (
                      <li key={liIndex} className={styles.li} dangerouslySetInnerHTML={{ __html: li.content }} />
                    ))}
                  </ul>
                );
              case 'code':
                return <pre key={itemIndex} className={styles.code}><code>{item.content}</code></pre>;
              default:
                return null;
            }
          })}
        </section>
      ))}
    </>
  );
}

// Helper function to get image source
function getImageSource(slug) {
  switch (slug) {
    case "introducing-ai-resume-builder":
      return aiResumeImg;
    // Add more cases for other articles if needed
    default:
      return `/blog/${slug}/header.png`;
  }
}

// Additional processing for articles if needed
articles.forEach(article => {
  article.image.src = getImageSource(article.slug);
  // Add any other article-specific processing here
});

export default articles;