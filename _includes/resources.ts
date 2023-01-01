import { SeeAlsos } from "./seealso/SeeAlso.11ty";

export type Video = {
  url: string;
  posterNumber: number;
  poster: {
    publicURL: string;
    childImageSharp: any;
  };
};

export interface Resource {
  author: AuthorReference;
  body: string;
  id: string;
  parent: Resource;
  slug: string;
  date: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  resourceType?: string;
  thumbnail: string;
  products: ProductReference[];
  technologies: TechnologyReference[];
  topics: TopicReference[];
}

export interface TipResource extends Resource {
  cardThumbnail: {
    publicURL: string;
  };
  date: string;
  hasBody?: boolean;
  animatedGif?: {
    file: {
      publicURL: string;
    };
    width: number;
    height: number;
  };
  screenshot?: {
    publicURL: string;
  };
  shortVideo?: Video;
  longVideo?: Video;
  leadin: string;
  seealso?: SeeAlsos;
  inPlaylists?: boolean;
}

export interface Reference extends Resource {
  label: string;
  subtitle?: string;
  resources: Resource[];
  referenceResources: Resource[];
}

export interface AuthorReference extends Reference {}

export interface ProductReference extends Reference {
  logo: {
    publicURL: string;
    childImageSharp: {
      resized: {
        src: string;
        width: number;
        height: number;
        originalName: string;
      };
      gatsbyImageData: any;
    };
  };
}

export interface TechnologyReference extends Reference {
  logo: string;
}

export interface ProductReference extends Reference {
  logo: {
    publicURL: string;
    childImageSharp: {
      resized: {
        src: string;
        width: number;
        height: number;
        originalName: string;
      };
      gatsbyImageData: any;
    };
  };
}

export interface TopicReference extends Reference {
  accent: string;
  icon: string;
}
