// File: lib/geoLanguage.js

const countryLanguageMap = {
    // English-speaking countries
    US: 'en', // United States ($70,248)
    IE: 'en', // Ireland ($97,109)
    AU: 'en', // Australia ($59,934)
    CA: 'en', // Canada ($52,051)
    GB: 'en', // United Kingdom ($47,334)
    NZ: 'en', // New Zealand ($48,781)
    SG: 'en', // Singapore ($64,581)
    HK: 'en', // Hong Kong ($50,212)
    ZA: 'en', // South Africa ($6,374)

    // Spanish-speaking countries
    ES: 'es', // Spain ($31,676)
    CL: 'es', // Chile ($15,344)
    UY: 'es', // Uruguay ($17,277)
    PA: 'es', // Panama ($15,489)
    AR: 'es', // Argentina ($10,729)
    MX: 'es', // Mexico ($10,046)
    CR: 'es', // Costa Rica ($12,160)
    CO: 'es', // Colombia ($6,208)
    PE: 'es', // Peru ($6,768)
    DO: 'es', // Dominican Republic ($9,207)

    // Arabic-speaking countries
    AE: 'ar', // United Arab Emirates ($43,103)
    QA: 'ar', // Qatar ($61,276)
    KW: 'ar', // Kuwait ($31,658)
    SA: 'ar', // Saudi Arabia ($23,176)
    BH: 'ar', // Bahrain ($26,214)
    OM: 'ar', // Oman ($16,494)
    LB: 'ar', // Lebanon ($3,709)
    JO: 'ar', // Jordan ($4,417)
    MA: 'ar', // Morocco ($3,217)
    DZ: 'ar', // Algeria ($3,796)
    EG: 'ar', // Egypt ($3,756)


    // French-speaking countries
    LU: 'fr', // Luxembourg ($127,673)
    CH: 'fr', // Switzerland ($96,087)
    MC: 'fr', // Monaco ($173,688)
    FR: 'fr', // France ($51,759)
    BE: 'fr', // Belgium ($51,096)
    NL: 'fr', // Netherlands ($57,334)
    SN: 'fr', // Senegal ($1,624)
    CI: 'fr', // Côte d'Ivoire ($2,528)
    CD: 'fr', // Democratic Republic of the Congo ($592)
    CM: 'fr', // Cameroon ($1,501)

    
    // ... existing code ...
};

    
  export async function detectUserLanguage() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      const countryCode = data.country_code;
      return countryLanguageMap[countryCode] || 'en'; // Default to English if country not found
    } catch (error) {
      console.error('Error detecting user language:', error);
      return 'en'; // Default to English on error
    }
  }