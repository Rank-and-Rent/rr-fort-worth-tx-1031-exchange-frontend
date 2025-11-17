import { COMPANY_NAME, CONTACT_PHONE, CONTACT_PHONE_DIGITS, CONTACT_EMAIL, CONTACT_ADDRESS, PRIMARY_CITY, PRIMARY_STATE_ABBR, SITE_URL } from '@/lib/constants';

export function getBrand() {
  // Using 1031 Exchange Fort Worth colors
  const COLORS = {
    primary: '#1E40AF', // Blue accent
    secondary: '#1A1A1A', // Dark gray
    dark: '#0F0F0F', // Very dark background
  };

  return {
    // Email template fields
    subject: "We received your 1031 exchange inquiry",
    preheader: "Thanks for your inquiry, we have received your 1031 exchange request and will contact you within one business day.",
    company_name: COMPANY_NAME,
    logo_url: `${SITE_URL}/1031-exchange-fort-worth-logo.png`,
    city_state: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
    brand_accent: COLORS.primary,
    cta_dark_bg: COLORS.dark,
    bg_color: "#0F0F0F",
    text_dark: "#0F0F0F",
    text_muted: "#666666",
    text_body: "#333333",
    text_faint: "#999999",
    border_color: "#E5E5E5",
    card_header_bg: "#F5F5F5",

    // Hero content
    hero_title: "Thanks for your inquiry. We received your 1031 exchange request.",
    hero_subtitle: "Our team will review your details and reach out within one business day to discuss your exchange strategy.",
    details_title: "Your project details",

    // CTA buttons
    call_cta_label: "Call Now",
    call_phone: CONTACT_PHONE,
    call_phone_plain: CONTACT_PHONE_DIGITS,
    site_cta_label: "Go To Site",
    site_url: SITE_URL,

    // Address and footer
    address_line: CONTACT_ADDRESS,
    footer_note: "This confirmation is a transactional email related to your request.",

    // Legacy fields for backward compatibility
    brand_title: COMPANY_NAME,
    brand_tagline: '1031 Exchange Property Identification and Coordination Services',
    brand_dark_bg: COLORS.dark,
    brand_gold: COLORS.primary,
    supportPhone: CONTACT_PHONE,
    supportEmail: CONTACT_EMAIL,
    service_area: `Serving ${PRIMARY_CITY} and the surrounding area`,
    portfolio_url: SITE_URL,
    portfolio_blurb: `1031 exchange property identification and coordination services for ${PRIMARY_CITY} investors.`,
    intro_copy: `Delivering expert 1031 exchange property identification and coordination services to help investors defer capital gains taxes through like-kind property exchanges.`,
  };
}

