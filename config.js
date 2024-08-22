import themes from "daisyui/src/theming/themes";

const config = {
  // REQUIRED
  appName: "Magical Resume",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten))
  appDescription: "AI-Powered Resume Writer",
  // REQUIRED (no https://, not trailing slash at the end, just the naked domain)
  domainName: "magicalresume.ai",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
    id: "1b7d2fcd-dd69-43bd-b29e-b448496211b0",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every route, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Set this to true for subscription, false for one-time payment
    offerSubscription: true,
    plans: [
      {
        priceId: process.env.NODE_ENV === "development"
        ? "price_1Piz14IEQZQ1iQDEpZm5v32i"
        // ? "price_1Pifr6IEQZQ1iQDEUdG9oXVm"
        : "price_1M6jNrIEQZQ1iQDEc8TNkHRp", // Replace with your production subscription priceId
        name: "Subscription Plan",
        description: "Monthly access to all features",
        price: 9.99,
        interval: "month",
        isSubscription: true,
        features: [
          "Unlimited resume creations",
          "Access to all premium templates",
          "Monthly updates and new features",
          "Priority customer support",
          "Cloud storage for your resumes"
        ]
      },
      {
        priceId: process.env.NODE_ENV === "development"
                  ? "price_1M2jDkIEQZQ1iQDEIQQ6MwkJ"
                  : "price_1N5DBdIEQZQ1iQDENgXIMhaN", // yup Replace with your production one-time payment priceId
        name: "One-Time Plan",
        description: "Lifetime access to all features",
        price: 99.99,
        isSubscription: false,
        features: [
          "One-time payment for lifetime access",
          "All premium templates included",
          "Unlimited resume creations",
          "Free updates for life",
          "Priority customer support"
        ]
      },
      // {
      //   priceId: process.env.NODE_ENV === "development"
      //             ? "price_1M2jDkIEQZQ1iQDEIQQ6MwkJ" // Repeated for example; adjust as needed
      //             : "price_456",
      //   name: "Advanced",
      //   description: "Ideal for job seekers needing comprehensive support",
      //   price: 99,
      //   priceAnchor: 149,
      //   features: [
      //     "AI-Powered Resume Writing",
      //     "Multiple Templates",
      //     "Customization Options",
      //     "Download in PDF",
      //     "1 Year of Updates",
      //     "24/7 Support"
      //   ],
      //   isSubscription: false,
      //   isFeatured: true
      // }
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  mailgun: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "mg",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `Magical Resume <noreply@mg.magicalresume.ai>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Support at Magical Resume <support@mg.magicalresume.ai>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "support@mg.magicalresume.ai",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "admin@magicalresume.ai",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "light",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes["light"]["primary"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's used to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/api/auth/signin",
    // REQUIRED — the path you want to redirect users after successful login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/dashboard",
  },
};

export default config;
