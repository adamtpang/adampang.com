/**
 * Referral wall. Tools + services adam uses, with his code.
 * Visitor gets a perk, adam gets a referral credit. Passive support.
 *
 * Add an entry = one object. Only entries with a non-empty `href`
 * render, so you can stub future ones without shipping dead links.
 */

export type Referral = {
  name: string;
  perk: string; // what the visitor gets
  href: string;
};

export const referrals: Referral[] = [
  {
    name: 'network school',
    perk: 'apply to live at balaji’s frontier',
    href: 'https://ns.com/adam/apply',
  },
  {
    name: 'hostinger',
    perk: 'cheap fast web hosting',
    href: 'https://www.hostinger.com?REFERRALCODE=NAYADAMTPNWO',
  },
];
