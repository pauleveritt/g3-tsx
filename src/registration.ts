/**
 * Content registration in a site
 */
import { EleventyCollectionItem, EleventyPage } from "./models";
import { UserConfig } from "@11ty/eleventy";
import {
  getResourceType,
  ReferenceCollection,
  References,
  Resource,
  ResourceCollection,
} from "./ResourceModels";
import { Reference } from "./ReferenceModels";

export type CollectionApi = {
  getAll(): EleventyCollectionItem[];
  getFilteredByTag(a: string): EleventyCollectionItem[];
};
export type RegisterIncludesProps = {
  eleventyConfig: UserConfig;
};

export type ResourceTypeConfig = {
  collectionName: string;
  factory(data: any, page: EleventyPage): Promise<Resource>;
};

export type ReferenceTypeConfig = {
  collectionName: string;
  factory(data: any, page: EleventyPage): Promise<Reference>;
};

export type GetAllCollectionsProps = {
  collectionApi: CollectionApi;
  resourceCollections: { [key: string]: ResourceTypeConfig };
  referenceCollections: { [key: string]: ReferenceTypeConfig };
};

export type AllCollections = {
  allResources: ResourceCollection;
  allReferences: ReferenceCollection;
};

export async function getAllCollections({
  collectionApi,
  resourceCollections,
  referenceCollections,
}: GetAllCollectionsProps) {
  // This what we'll return
  const allCollections: AllCollections = {
    allResources: new Map(),
    allReferences: new Map(),
  };

  const allCollectionItems: EleventyCollectionItem[] = collectionApi
    .getAll()
    .filter((ci) => ci.data.resourceType);

  const allResources: ResourceCollection = new Map();
  const allReferences: ReferenceCollection = new Map();

  for (const { data, page } of allCollectionItems) {
    const resourceType = getResourceType(data, page);
    try {
      if (resourceCollections[data.resourceType]) {
        const { factory } = resourceCollections[resourceType];
        const resource = await factory(data, page);
        allResources.set(page.url, resource);
      } else if (referenceCollections[data.resourceType]) {
        const { factory } = referenceCollections[resourceType];
        const reference = await factory(data, page);
        allReferences.set(reference.label, reference);
      } else {
        // TODO shouldn't get here
        console.warn(`Unregistered resource type: ${resourceType}`);
      }
    } catch (err) {
      console.error(`Failed to create resource/reference at ${page.url}`);
      throw err;
    }
  }

  allCollections.allResources = allResources;
  allCollections.allReferences = allReferences;

  // With this in place, we can de-reference resources.
  // @ts-ignore
  for (const [url, resource] of allCollections.allResources) {
    const author = allCollections.allReferences.get(resource.author);
    if (!author) {
      throw new Error(
        `Resource "${url}" has unresolved author ${resource.author}`
      );
    }
    resource.references = resolveReferences({
      fieldNames: ["author", "products", "technologies", "topics"],
      resource,
      allReferences,
    });
  }

  return allCollections;
}

export type ResolveReferencesProps = {
  fieldName: string;
  resource: Resource;
  allReferences: ReferenceCollection;
};

export function resolveReference({
  fieldName,
  resource,
  allReferences,
}: ResolveReferencesProps): Reference | Reference[] {
  /* Return the matching reference or references  */

  // @ts-ignore
  const thisFieldValue = resource[fieldName];
  if (!thisFieldValue) {
    // Never ask for a reference field that doesn't exist on resource.
    throw new Error(
      `No reference field "${fieldName}" on resource ${resource.url}`
    );
  }

  if (Array.isArray(thisFieldValue)) {
    // resource.author is a single value, but resource.topics etc. array
    return thisFieldValue.map((label) => {
      const reference = allReferences.get(label);
      if (!reference) {
        throw new Error(
          `Resource "${resource.url}" has unresolved reference "${label}"`
        );
      }
      return reference;
    });
  } else {
    const reference = allReferences.get(thisFieldValue);
    if (!reference) {
      throw new Error(
        `Resource "${resource.url}" has unresolved reference "${thisFieldValue}"`
      );
    }
    return reference;
  }
}

export type ResolveReferences = {
  fieldNames: string[];
  resource: Resource;
  allReferences: ReferenceCollection;
};

export function resolveReferences({
  fieldNames,
  resource,
  allReferences,
}: ResolveReferences): References {
  // @ts-ignore
  const references: References = {};
  for (const fieldName of fieldNames) {
    // @ts-ignore
    if (resource[fieldName]) {
      // @ts-ignore
      references[fieldName] = resolveReference({
        fieldName,
        resource,
        allReferences,
      });
    } else {
      // Only array references things should be empty;
      // @ts-ignore
      references[fieldName] = [];
    }
  }
  return references;
}

export type ImageOptions = {
  widths: any[];
  formats: string[];
  outputDir: string;
  urlPath: string;
};
export const imageOptions: ImageOptions = {
  widths: ["auto"],
  formats: ["webp"],
  outputDir: "./public/assets/img/",
  urlPath: "/assets/img/",
};
