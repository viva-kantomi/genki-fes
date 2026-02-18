export interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  canonicalURL?: URL;
}

export const defaultSEO: SEOProps = {
  title: '元気フェス',
  description: '元気フェス公式サイト - みんなで作る、みんなが楽しめるフェスティバル',
  ogImage: '/images/og-default.png',
};
