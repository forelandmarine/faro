import type { StudyDoc } from "./types";
import { forelandMarineStudy } from "./foreland-marine";
import { nimaraPilatesStudy } from "./nimara-pilates";
import { firstOwnersReferenceStudy } from "./first-owners-reference";
import { birdhamCarpentryStudy } from "./birdham-carpentry";

export const STUDIES: StudyDoc[] = [
  forelandMarineStudy,
  nimaraPilatesStudy,
  firstOwnersReferenceStudy,
  birdhamCarpentryStudy,
];

export function getStudy(slug: string): StudyDoc | undefined {
  return STUDIES.find((s) => s.slug === slug);
}

export * from "./types";
